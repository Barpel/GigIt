<template>
    <section class="gig-edit">
        <h1> {{isAdd}} Gig</h1>
        <div class="gig-edit-container">
            <form @submit.prevent="updateGig" class="gig-edit-form flex">
                <input v-model="gig.details.title" type="text" placeholder="What do you need help with?">
                <textarea v-model="gig.details.title" placeholder="Describe your gig..."></textarea>
                <select aria-placeholder="category"></select>
                <button class="gig-edit-submit" type="submit">Add Gig</button>
            </form>
        </div>
    </section>
</template>

<script>
// import gigSesrvice
export default {
    data() {
        return {
            gig: {
                details: {
                    title:'',
                    desc: '',
                }
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        isAdd() {
            if(this.gig.id) return 'Edit Your'
            else return 'Add New'
        }
    },
    methods: {
        updateGig() {
            console.log(this.newGig)
        }
    },
    created() {
        var gigId = this.$route.params.gigId
        if(gigId) {
            this.$store.dispatch({type:'getGigById', gigId})
                .then(gig=> {
                    if(gig) this.gig = gig
                })
        }
        console.log(gigId)
        
    }
}
</script>

<style>

</style>
