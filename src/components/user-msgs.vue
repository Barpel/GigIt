<template>
     <section @click="goToLink" class="user-msg" :class="msg.type" v-if="msg">
            <h6>{{msg.txt}}</h6>
        </section>
</template>

<script>
export default {
 props: ['msg'],
 data() {
     return {
     }
 },
 methods: {
     goToLink() {
         var link = this.msg.link
         if(link)this.$router.push(link)
     },
     playSound() {
     }
 }
}
</script>

<style>

</style>
