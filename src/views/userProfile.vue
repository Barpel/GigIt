

<template>
  <section class="user-profile-container grid">
    <div v-if="user" class="user-avatar-card">
      <img :src="user.img" alt>
      <h5>{{user.username}}</h5>
      <span>⭐⭐⭐⭐✰</span>
      <ul>
          <li><span>Gigs Completed: </span>{{user.reviews.completed.length}}</li>
          <li><span>Gigs Created: </span>{{user.reviews.published.length}}</li>
      </ul>
      <div class="user-profile-contact-btn">Contact Me</div>
    </div>
    <div class="user-profile-lastest-gigs">
        <div><span>latest Gigs</span></div>
        <img src="@/assets/moving.png" alt="">
        <img src="@/assets/delivery.png" alt="">
        <img src="@/assets/pet-care.png" alt="">
    </div>
    <div v-if="user" class="user-profile-details">
        <p>{{user.aboutMe}}</p>
        <div class="user-profile-skills">
              <h6 v-for="skill in user.skills" :key="skill">{{skill}}</h6> 
        </div>
    </div>
    <div>
        <ul>
            {{user.reviews.completed}}
            <li v-for="review in user.reviews.completed" :key="review.gigId" class="user-profile-user-review">
                <img :src="review.givenBy" alt="">
                <span>Rate: {{review.review.average}}⭐</span>
                <p><br>{{review.review.text}}</p> </li>
        </ul>   
    </div>
  </section>
</template>
<script>

export default {
    data(){
        return{
            currUser: {
                reviews:[]
            },
        }
    },
    created(){
        var userId =  this.$route.params.userId
        this.$store.dispatch({type:'getUserById', userId})
    },
    computed:{
        user(){
            return this.$store.getters.user;
        },
    }

}
</script>

<style>

</style>
