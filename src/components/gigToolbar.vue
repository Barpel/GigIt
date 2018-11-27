<template>
  <section class="gig-toolbar-container">
    <div class="gig-toolbar">
      <button @click="showCategory">Moving</button>
      <button @click="showCategory">House Work</button>
      <button @click="showCategory">Technical</button>
      <button @click="showCategory">Line-Queue</button>
      <button @click="showCategory">Pets Help</button>
      <button @click="showCategory">Others</button>
    </div>
  </section>
</template>

<script>
export default {
    created(){
        console.log('ToolBar')
    },
    methods:{
        showCategory(ev){
            this.$emit('showCategory')
            console.log(ev.target.innerHTML)

        }
    }

}
</script>

<style>

</style>
