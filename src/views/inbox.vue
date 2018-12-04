<template>
  <section id="inbox-container" v-if="user">
    <h1>{{user.name.first}}'s Inbox</h1>
    <div class="chats-container">
      <div class="top-bar">
        <img :src="user.img">
        <h3>{{user.name.first}}</h3>
      </div>
      <div class="chats">
        <div
          class="chat"
          v-for="chat in chats"
          :key="chat._id"
          @click="renderChat(chat)"
          :class="(selectedChat === chat)? 'selected': ''"
        >
          <img :src="chat.members[0].img">
          <h3>
            {{chat.members[0].name}}
            <h5>{{chat.msgs[chat.msgs.length-1].txt}}</h5>
          </h3>
        </div>
      </div>
    </div>
    <div class="chat-window">
      <div class="chat-conversation" v-if="selectedChat">
        <div
          :class="(msg.sender === user._id)? 'member2': 'member1'"
          v-for="msg in selectedChat.msgs"
          :key="msg._id"
        >
          <h3>{{msg.txt}}</h3>
        </div>
        <form @submit.prevent="sendMsg(selectedChat._id)">
          <el-input placeholder="Type a message" v-model="newMsgTxt"></el-input>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "inbox",
  data() {
    return {
      newMsgTxt: "",
      selectedChat: null,
      chats: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  sockets: {
    sentMsg: function(payload) {
      console.log(payload.chatId)
      var currNewMsgChat = this.chats.find(chat => chat._id === payload.chatId)
        currNewMsgChat.msgs.push(payload.msg)
    }
  },
  methods: {
    renderChat(chat) {
      this.selectedChat = chat;
    },
    sendMsg(chatId) {
      var newMsg = {
        sender: this.user._id,
        txt: this.newMsgTxt,
        createdAt: Date.now(),
        isRead: false
      };
      this.$store.dispatch({ type: "sendNewMsg", msg: newMsg, chatId });
      this.newMsgTxt = "";
    }
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      console.log(user)
      this.user.chats.forEach(chat => {
        this.$store
          .dispatch({ type: "getChatById", chatId: chat.chatId })
          .then(chat => {
            if(!chat) return
            var ownMemberIndex = chat.members.findIndex(
              member => member._id === this.user._id
            );
            var chat = JSON.parse(JSON.stringify(chat));
            chat.members.splice(ownMemberIndex, 1);
            this.chats.unshift(chat);
          });
      });
      this.user = user;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
