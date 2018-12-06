<template>
  <div class="about">
    <h1>
      Gig
      <span>It</span>
    </h1>
    <button @click="toggleInterval">{{(intervalOn)?'Stop':'Start'}}</button>

    <div class="about-info">
      <div class="info info1" v-if="counter === 1">
        <h2>
          <span>
            Gig
            <span>It</span>
          </span>
          is an online platform that helps people all around the globe to connect.
          <br>
          <i class="fas fa-globe-asia"></i>
        </h2>
      </div>
      <div class="info info2" v-if="counter === 2">
        <h2>It enables you to get more out of your day, and helps you with your daily errands</h2>
      </div>
      <div class="info info3" v-if="counter === 3">
        <h2>How? Well, it's pretty simple...It uses the power of the 20th century.</h2>
        <h1>THE INTERNET</h1>
      </div>
      <div class="info info4" v-if="counter === 4">
        <h2>Let's say you have an important errand to complete today but can't find the time.
          <br>No worries, a fellow Gigster will help you!
        </h2>
        <img
          src="https://res.cloudinary.com/barpel/image/upload/v1544049743/GigIt/gabi.jpg"
          class="gigster"
        >
      </div>

      <div class="info info5" v-if="counter === 5">
        <h2>Gabi has a great way to mobilize himself with his motorcycle. For 50 NIS you can post your gig, and all the relevent Gigsters will apply to it</h2>
        <img src="https://res.cloudinary.com/barpel/image/upload/v1544052528/GigIt/gig_details.jpg">
      </div>

      <div class="info info6" v-if="counter === 6">
        <h2>It works both ways. Gigsters can make some extra money during their spare time, and you get your errands done.</h2>
        <!-- (img with some change ) -->
        <!-- <img src="an img that has some money involved"> -->
      </div>
      <div class="info info7" v-if="counter === 7">
        <h2>Simple, no?
          <br>Register Today!
        </h2>
        <h1>
          <i class="fas fa-arrow-right"></i>&nbsp;
          <router-link to="/user/register">http://www.gigit.com/user/register</router-link>&nbsp;
          <i class="fas fa-arrow-left"></i>
        </h1>
      </div>

      <div class="info info8" v-if="counter === 8">
        <h2>Learn more about us:</h2>
        <br>
        <div class="gabi">
          <h3>Gabi Chami</h3>
          <a>
            <i class="fab fa-facebook"></i>
          </a>
          <a>
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
        <div class="jonas">
          <h3>Yehonatan Barr</h3>
          <a>
            <i class="fab fa-facebook"></i>
          </a>
          <a>
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
        <div class="bar">
          <h3>Bar Peled</h3>
          <a>
            <i class="fab fa-facebook"></i>
          </a>
          <a>
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var interval;
export default {
  data() {
    return {
      counter: 0,
      intervalOn: false
    };
  },
  methods: {
    toggleInterval() {
      this.intervalOn = !this.intervalOn;
      if (this.intervalOn) {
        this.counter++;
        interval = setInterval(() => {
          this.counter++;
        }, 6000);
      } else {
        clearInterval(interval);
      }
    }
  },
  watch: {
    counter() {
      if (this.counter === 8) clearInterval(interval);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

