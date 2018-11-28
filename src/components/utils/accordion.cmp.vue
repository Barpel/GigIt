<template>
  <collapse :selected="false">
    <div slot="collapse-header" class="collapse-head">{{header}}</div>
    <div slot="collapse-body">
      <div v-for="gigster in gigsters" :key="gigster.id" class="gigster-container">
        <img :src="gigster.img">
        <h2>{{gigster.name}} wants to be your Gigster!</h2>
        <div>
          <button class="gigit">Gig<span>It</span>
          </button>
          <button class="later">Later</button>
        </div>
      </div>
    </div>
  </collapse>
</template>
 
<script>
 
import Collapse from 'vue-collapse'
export default {
    props:['header', 'gigsters'],
    name: "accordion",
    components: {
        Collapse
    }
}
</script>
<style lang="scss" scoped>
.gigster-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 10px;
    margin: 10px 0;
    h2 {
        font-size: 1.1rem;
    }
    img {
        width: 100%;
        grid-row: 1 / span 2;
        align-self: center;
        border-radius: 50%;
    }
    div {
        grid-column: 2;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0 10px;
        button {
            height: 42px;
            width: 80%;
            justify-self: center;
            font-size: 1.3rem;     
            cursor: pointer;
            border: none;
            border-radius: 5px;
            padding: 5px;
            letter-spacing: 1.5px;
        }
        .later {
            background-color: red;
        }
        .gigit {
            background-color: #2ca2af;
            font-family: condiment;
            span {
                color: #97a5a7;
            }
        }
    }
}
</style>
