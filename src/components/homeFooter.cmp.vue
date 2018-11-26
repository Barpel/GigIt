<template>
  <footer>
    <h1>
      Gig
      <span>It</span>
    </h1>
    <div class="social-links-container">
      <a href="#">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="#">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="#">
        <i class="fab fa-linkedin"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
name: 'homeFooter',

}
</script>
<style lang="scss" scoped>
footer {
    min-height: 35vh;
    background-color: #424242d0;
    h1 {
        font-family: condiment;
            color: white;
            text-align: left;
            padding: 10px;
            letter-spacing: 1px;
            font-size: 2.5rem;
            margin: 0;
        span {
            color: #97a5a7;
        }
    }
    .social-links-container{
        display: grid;
        grid-gap: 25px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        max-width: fit-content;
        margin: 0 auto;
        a {
            color: white;
            i{
                font-size: 4rem;
            }
        }
    }
}

</style>

