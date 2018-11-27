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
    computed: {
        user() {
            return {name: 'tester'}
            // return this.$store.getters.user
        }
    },
    methods: {
        updateGig() {
            console.log(this.newGig)
        }
    },
    created() {
        var gigId = this.$route.params.gigId
        console.log(gigId);
    }
}
</script>

<style>

</style>
