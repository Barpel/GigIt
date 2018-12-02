<template>
  <section class="inbox-container" v-if="user">
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
          <img :src="chat.img">
          <h3>
            {{chat.name}}
            <h5>{{chat.msgs[chat.msgs.length-1].txt}}</h5>
          </h3>
        </div>
      </div>
    </div>
    <div class="chat-window">
      <div class="chat-conversation" v-if="selectedChat">
        <div
          :class="(msg.sender === user.name.first)? 'member2': 'member1'"
          v-for="msg in selectedChat.msgs"
          :key="msg._id"
        >
          <h3>{{msg.txt}}</h3>
        </div>
        <form @submit.prevent="sendMsg">
          <el-input placeholder="Type a message" v-model="newMsg.txt" v-if="user"></el-input>
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
      user: null,
      newMsg: {
          sender: '',
          txt: ''
      },
      chats: [
        {
          _id: "jksaj21",
          name: "Judit",
          img:
            "https://www.boehringer-ingelheim.com/sites/default/files/prescription_medicine/Immunology/Judit%20Makara.jpg",
          msgs: [
            { sender: "Judit", txt: "Hey Mike, I chose you to be my Gigster!" },
            { sender: "Judit", txt: "Nice to meet you" },
            { sender: "Mike", txt: "Hey Judit, nice to meet you" },
            { sender: "Judit", txt: "When do you think you can come?" }
          ]
        },
        {
          _id: "jksaj31",
          name: "Jonas",
          img:
            "https://thoughtcatalog.files.wordpress.com/2014/05/shutterstock_101032591.jpg?w=584&h=389",
          msgs: [
            { sender: "Jonas", txt: "Hey Mike, I chose you to be my Gigster!" },
            { sender: "Mike", txt: "Hey" },
            { sender: "Jonas", txt: "What's up?" },
            { sender: "Jonas", txt: "Where are you from?" }
          ]
        }
      ],
      selectedChat: null
    };
  },
  methods: {
    renderChat(chat) {
      this.selectedChat = chat;
    },
    sendMsg() {
        console.log(this.newMsg)
        // this.newMsg.txt = '';
    }
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      console.log(user);
      this.user = user;
      this.newMsg.sender= user.name.first
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
