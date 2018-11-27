<template>
    <section>
        <form @submit.prevent="updateGig"></form>
    </section>
</template>

<script>
// import gigSesrvice
export default {
    data() {
        return {
            
        }
    },
    methods: {
        updateGig() {
            console.log(this.newGig)
        }
    },
    created() {
        console.log('created');
        var gigId = this.$route.params.gigId
        console.log(gigId)
        this.$store.dispatch({type:'getCurrUser'})
            // .then(user => this.user = user)
    }
}
</script>

<style>

</style>
