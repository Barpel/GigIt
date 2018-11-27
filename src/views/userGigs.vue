<template>
  <section v-if="user">
      {{user.gigsIds}}
  </section>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    created() {
        console.log('user gigs')
        var userId = this.$route.params.userId
        this.$store.dispatch({type: 'getUserById', userId})
}
}
</script>

<style>

</style>
