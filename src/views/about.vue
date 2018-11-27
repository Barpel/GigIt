<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <accordion :header="header" :body="body"></accordion>
    <accordion :header="header" :body="body"></accordion>
    <accordion :header="header" :body="body"></accordion>
  </div>
</template>

<script>
import accordion from '../components/utils/accordion.cmp'
export default {
  data() {
    return {
      header: 'What is this thing',
      body:'fuck you fucker'
    }
  },
  created() {
    console.log('about is up')
  },
  components: {
    accordion
  }
}
</script>

<style>

</style>
