
<template>

    <section class="giger-review-container">
        <div class="giger-review-work">
            <span>Works Professionality: </span>
            <el-input-number v-model="review.workRate" controls-position="right" :min="1" :max="5">
            </el-input-number>
        </div>
        <div class="giger-review-reliable">
           <span >Reliable: </span>
           <el-input-number v-model="review.reliableRate" controls-position="right"  :min="1" :max="5">
           </el-input-number>
       </div>
       <div class="giger-review-text">
           <span>Few Words</span>
           <el-input  placeholder="Please give us few words about him" v-model="review.text" clearable></el-input>
       </div>
    <button @click="sumbitReview">Send Review</button>
    </section>
</template>

<script>

export default {
    props:[],
    data(){
        return{
            review:{
                workRate:1,
                reliableRate:1,
                text:null,
            }
        }
    },
    methods:{
        sumbitReview(){
            console.log('sdsd')
            this.$emit('reviewSumbitted' ,this.review)
        }
    }

}
</script>

<style>

</style>
