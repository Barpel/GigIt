<template>
  <section id="inbox-container" v-if="user">
    <h1>{{user.name.first}}'s Chats</h1>
    <div class="chats-container">
      <div class="top-bar">
        <img :src="user.img">
        <h3>{{user.name.first}}'s Chats</h3>
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
            <h5 v-if="chat.msgs[chat.msgs.length-1]">{{chat.msgs[chat.msgs.length-1].txt}}</h5>
          </h3>
          <div v-if="chat.msgs.length && !chat.msgs[chat.msgs.length-1].isRead" class="new-event-point"></div>
        </div>
      </div>
    </div>
    <div class="chat-window">
      <div class="chat-conversation" v-if="selectedChat" ref="conversation">
        <div
          :class="(msg.sender === user._id)? 'member2': 'member1'"
          v-for="(msg, idx) in selectedChat.msgs"
          :key="msg._id"
        >
          <div v-if="msg" class="chat-msg-text" :ref="'msg' + idx">{{msg.txt}}</div>
        </div>
        <form @submit.prevent="sendMsg(selectedChat._id)">
          <el-input placeholder="Type a message" v-model="newMsgTxt"></el-input>
          <button type="submit">Send</button>
        </form>
      </div>
      <div class="no-selected-chat-container" v-else>
        <img src="https://res.cloudinary.com/barpel/image/upload/v1544951982/GigIt/shrugging.png">
        <h2>{{(this.user.chats.length)? 'No Selected Chats': 'You haven\'t started any chats yet'}}</h2>
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
      var currNewMsgChat = this.chats.find(chat => chat._id === payload.chatId);
      if(currNewMsgChat){
        currNewMsgChat.msgs.push(payload.msg) 
        if (this.selectedChat && payload.chatId === this.selectedChat._id) {
          var msgs = this.selectedChat.msgs;
          msgs[msgs.length - 1].isRead = true;
        }
        this.scrollDown();
        this.$store.dispatch({ type: "updateChat", chat: currNewMsgChat });
      }
    }
  },
  methods: {
    scrollDown() {
      setTimeout(() => {
        var conversation = this.$refs.conversation;
        conversation.scrollTo(0, conversation.scrollHeight);
      }, 0);
    },
    renderChat(chat) {
      if(chat.msgs.length) chat.msgs[chat.msgs.length - 1].isRead = true;
      if (chat.members.length <= 1)
        chat.members.push({
          name: this.user.name.first,
          img: this.user.img,
          _id: this.user._id
        });
      this.$store.dispatch({ type: "updateChat", chat });
      this.selectedChat = chat;
      this.scrollDown();
    },
    sendMsg(chatId) {
      var newMsg = {
        sender: this.user._id,
        txt: this.newMsgTxt,
        createdAt: Date.now(),
        isRead: false
      };
      let otherUser = this.selectedChat.members[0]._id;
      this.$store.dispatch({ type: "sendNewMsg", msg: newMsg, chatId });
      this.$store.dispatch({ type: "emitNewChatMsg", userId: otherUser });
      this.newMsgTxt = "";
    }
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      user.inboxCount = 0;
      this.$store.dispatch({ type: 'updateUserState', user });
      return user.chats.forEach(chat => {
        this.$store.dispatch({ type: "connectToChat", chatId: chat.chatId });
        return this.$store.dispatch({ type: "getChatById", chatId: chat.chatId })
          .then(chat => {
            if (!chat) return;
            var ownMemberIndex = chat.members.findIndex(
              member => member._id === this.user._id
            );
            var chat = JSON.parse(JSON.stringify(chat));
            chat.members.splice(ownMemberIndex, 1);
            var lastMsg = chat.msgs[chat.msgs.length - 1];
            if (lastMsg && lastMsg.sender === user._id) lastMsg.isRead = true; //if sender is logged user the msg is read
            this.chats.push(chat);      
          });
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
