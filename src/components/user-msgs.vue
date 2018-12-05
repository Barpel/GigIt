<template>
  <section @click="goToLink" class="user-msg-container" :class="msg.type" v-if="msg">
    <div @click="goToLink" class="user-msg" v-if="true">
      <h5>{{msg.txt}}</h5>
    </div>
  </section>
</template>

<script>
export default {
  props: ["msg"],
  data() {
    return {};
  },
  methods: {
    goToLink() {
      if (this.msg) {
        var link = this.msg.link;
        if (link) this.$router.push(link);
      }
    }
  },
};
</script>

<style>
</style>
