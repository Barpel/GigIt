<template>
  <div class="about">
    <h1>Gig<span>It</span>
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
    console.log('about is up')
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
  .about {
    background-color: black;
    padding: 10px;
    h1 {
      font-size: 10rem;
      color: white;
      font-family: condiment;
      span {
        font-family: condiment;
        color: #97a5a7;
      }
    }
  }
</style>

