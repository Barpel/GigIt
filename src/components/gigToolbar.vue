<template>
  <section class="gig-toolbar-container">
    <div class="gig-toolbar">
      <button @click="showCategory">Moving</button>
      <button @click="showCategory">House-Work</button>
      <button @click="showCategory">Technical</button>
      <button @click="showCategory">Line-Queue</button>
      <button @click="showCategory">Pet-Care</button>
      <button @click="showCategory">Other</button>
    </div>
    <div>
      <!-- <input type="text" @input="searchGig" > -->
    </div>
  </section>
</template>

<script>
export default {
    created(){
    },
    methods:{
        showCategory(ev){
           console.log('go bring my catagory')
            var category = ev.target.innerHTML.toLowerCase()
            this.$emit('showCategory',category)
        },
        // searchGig(ev){
        //   var keyForFilter = ev.target.value
        //   this.$emit('searchGig', keyForFilter)
        // }
    }

}
</script>

<style>

</style>
