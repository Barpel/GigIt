<template>
  <section v-if="user">{{user.gigsIds}}</section>
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
        .then(() => {
            this.getUserGigs()
        })
    },
    methods: {
        getUserGigs() {
            var userGigIds = this.user.gigsIds;
            console.log('userGigIds', userGigIds)
        }
    }

}
</script>

<style>

</style>
