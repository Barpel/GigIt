<template>
  <section class="gig-toolbar-container">
    <div class="gig-toolbar">
      <button @click="showCategory">Moving</button>
      <button @click="showCategory">House Work</button>
      <button @click="showCategory">Technical</button>
      <button @click="showCategory">Line-Queue</button>
      <button @click="showCategory">Pets Care</button>
      <button @click="showCategory">Other</button>
    </div>
  </section>
</template>

<script>
export default {
    created(){
    },
    methods:{
        showCategory(ev){
            var category = ev.target.innerHTML.toLowerCase()
            this.$emit('showCategory',category)
        }
    }

}
</script>

<style>

</style>
