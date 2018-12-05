
<template>
    <section class="giger-review-container">

        <div class="giger-review-screen"></div>
        <div class="giger-review-form">
            <h2>How Was Your Gig With {{nameForReview}} ? </h2>
            <div class="giger-review-field">
                <h3> {{proffesionalOrPayment}}: </h3>
                <el-rate v-model="workOrPayment"></el-rate>
            </div>
            <div class="giger-review-field">
                <h3 >Reliability: </h3>
                <el-rate v-model="review.reliable"></el-rate>
            </div>
            <div class="giger-review-field">
                <h3 >Overall:</h3>
                <el-rate v-model="review.overall"></el-rate>
            </div>
            
            <div class="giger-review-field">
                <el-input  placeholder="Please give us few words" v-model="review.text" type="textarea" clearable></el-input>
            </div>
            <button @click="sumbitReview">Send Review</button>
        </div>
    </section>
</template>

<script>

export default {
    props:['isForGigster', 'gigTitle', 'nameForReview'],
    data(){
        return{
            workOrPayment: 1,
            review:{
                reliable:1,
                overall:1,
                text:null,
            }
        }
    },
    computed: {
        proffesionalOrPayment() {
            return (this.isForGigster)? 'Proffesional' : 'Payment'
        }
    },
    methods:{
        sumbitReview(){
            var review = this.review
            review.work = this.workOrPayment
            review.payment = this.workOrPayment
            review.average = ((review.reliable + review.overall +review.changingField) / 3).toFixed(1)
            console.log(review)
            this.$emit('reviewSumbitted' ,this.review)
        }
    },
}
</script>

<style>

</style>
