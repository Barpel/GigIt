<template>
  <section class="gig-edit">
    <h1>
      {{isAdd}}
      <span>Gig</span>
    </h1>
    <div class="gig-edit-container" v-if="!editComplete">
      <form @submit.prevent="save" class="gig-edit-form">
        <div class="form-wrapper-1">
          <div class="gig-title-container">
            <input placeholder="Gig Title" v-model="gig.details.title" class="gig-title-input">
          </div>
          <div class="gig-category-container">
            <el-select v-model="gig.category" placeholder="Category" class="gig-category-input">
              <el-option
                v-for="category in categoryOpts"
                :key="category.value"
                :label="category.label"
                :value="category.value"
                size="medium"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- working here!!!!! -->
        <!-- working here!!!!! -->
        <div v-if="gig.category" class="photo-gallery grid">
          <vue-gallery :images="this.imgsCategory" :index="index" @close="index = null"></vue-gallery>
          <!-- @click="index = imageIndex" -->
          <div
            class="image"
            v-for="(image, imageIndex) in imgsCategory"
            :key="imageIndex"
            @click="pickImg(image)"
            :style="{ backgroundImage: 'url(' + image + ')' ,objectFit:'cover'}"
            :class="selectedImgClass(image)"
          ></div>
        </div>
        <!-- working here!!!!! -->
        <!-- working here!!!!! -->
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 3}"
          placeholder="Describe your gig..."
          v-model="gig.details.desc"
        ></el-input>

        <div class="form-wrapper-2">
          <el-date-picker
            v-model="gig.details.gigTime.from"
            type="datetime"
            placeholder="Select Gig start time"
            default-time="12:00:00"
          ></el-date-picker>
          <el-date-picker
            v-model="gig.details.gigTime.to"
            type="datetime"
            placeholder="Select Gig end time"
            default-time="12:00:00"
          ></el-date-picker>
        </div>
        <google-map
          v-if="editPage"
          :editPage="editPage"
          :gig="gig"
          @addMarker="getLocation"
          @setPlace="setPlaceEdit"
        />
        <label class="gig-price-container">
          <h4
            class="pro-tip"
            v-if="isShowingTip"
          >PRO-TIP: Set a fair price to get the Gig done quickly!</h4>
          <h2>Price:</h2>
          <el-input-number
            v-model="gig.details.price"
            :step="10"
            :min="0"
            size="small"
            @focus="toggleTip"
            @blur="toggleTip"
          ></el-input-number>
        </label>
        <button class="gig-submit-btn" type="submit">
          Save
          <span>Gig</span>
        </button>
      </form>
    </div>
    <div v-else class="after-edit-container">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <circle
          class="path circle"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-miterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        ></circle>
        <polyline
          class="path check"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        ></polyline>
      </svg>
      <p class="success">Your Gig was added!
        <br>Check it out<br>
        <router-link :to="'/gig/' + newGigId">here</router-link>
      </p>
    </div>
  </section>
</template>

<script>
import GoogleMap from "@/components/googleMap";
import VueGallery from "vue-gallery";

export default {
  data() {
    return {
      "pet-care": [
        "https://res.cloudinary.com/barpel/image/upload/v1544299638/GigIt/shutterstock_148172258.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544299638/GigIt/shutterstock_556414654.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544299713/GigIt/shutterstock_443728036.jpg"
      ],
      "house-work": [
        "https://res.cloudinary.com/barpel/image/upload/v1543848353/GigIt/plumber.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544301300/GigIt/shutterstock_381636988.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544301308/GigIt/shutterstock_1007119828.jpg"
      ],
      other: [
        "https://res.cloudinary.com/barpel/image/upload/v1544303327/GigIt/shutterstock_214814605.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544303327/GigIt/shutterstock_788923183.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544303524/GigIt/shutterstock_1164331375.jpg"
      ],
      delivery: [
        "https://res.cloudinary.com/barpel/image/upload/v1544303774/GigIt/shutterstock_1165732177_1.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544303774/GigIt/shutterstock_794998891.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544303773/GigIt/shutterstock_171790418.jpg"
      ],
      moving: [
        "https://res.cloudinary.com/barpel/image/upload/v1544304572/GigIt/shutterstock_369919934.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544304573/GigIt/shutterstock_366444461.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544304617/GigIt/shutterstock_516642439.jpg"
      ],
      "line-queue": [
        "https://res.cloudinary.com/barpel/image/upload/v1544304965/GigIt/shutterstock_239818981.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544304965/GigIt/shutterstock_733196824.jpg",
        "https://res.cloudinary.com/barpel/image/upload/v1544304965/GigIt/shutterstock_467126900.jpg"
      ],
      index: null,

      editPage: true,
      gig: {
        publisherId: "",
        category: "",
        createdAt: 0,
        pendingUsers: [],
        isRead: true,
        isActive: true,
        details: {
          title: "",
          desc: "",
          price: 0,
          img: "",
          pos: {
            // dist: this.getRandomDist(),
            lat: null,
            lng: null
          },
          location: {},
          place: "",
          gigTime: {
            from: "",
            to: ""
          },
          imgs: []
        },
        holdingUsers: [],
        isPickedGigster: false
      },
      editComplete: false,
      newGigId: "",
      isShowingTip: false,
      categoryOpts: [
        {
          value: "delivery",
          label: "Delivery"
        },
        {
          value: "house-work",
          label: "House-Work"
        },
        {
          value: "pet-care",
          label: "Pet-Care"
        },
        {
          value: "other",
          label: "Other"
        },
        {
          value: "line-queue",
          label: "Line-Queue"
        },
        {
          value: "moving",
          label: "Moving"
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isAdd() {
      if (this.gig._id) return "Edit";
      else return "Add";
    },
    currTime() {
      var time = new Date();
      return `${time.getHours()}:${time.getMinutes()}`;
    },
    imgsCategory() {
      var x = this.gig.category;
      var imgs = this[x];
      return imgs;
    }
  },
  methods: {
    selectedImgClass(image) {
      if (this.gig.details.img === image) {
        return "selected";
      } else return "";
    },
    pickImg(image) {
      this.gig.details.img = image;
    },
    // getRandomDist() {
    //     var randomNum = Math.random() * 3
    //     if (randomNum < 0.1) randomNum = randomNum + 0.3;
    //     return randomNum.toFixed(1) + 'KM Away'
    // },
    toggleTip() {
      this.isShowingTip = !this.isShowingTip;
    },
    save() {
      console.log(this.gig.details.location);
      var gig = this.gig;
      var details = gig.details;
      if (!gig.category || !details.title || !details.price || !details.desc) {
        this.$message({
          message: "Please fill out all fields!",
          type: "warning"
        });
        return;
      }
      gig.createdAt = Date.now();
      gig.publisherId = this.user._id;
      var userGigsListToUpdate = gig._id ? null : this.user.gigsIds.published;
      console.log("gig", gig.details.location);
      this.$store
        .dispatch({ type: "updateGig", gig, userGigsListToUpdate })
        .then(gig => {
          console.log("gig saved!", gig);
          this.editComplete = true;
          this.newGigId = gig._id;
        });
      // this.$router.push("/");
    },
    setPlaceEdit(place) {
      console.log(place.vicinity);
      this.gig.details.place = place.vicinity;
      console.log(this.gig.details.place);
    },
    getLocation(location) {
      console.log("this is the location from edit", location);
      this.gig.details.location = location;
      // this.gig.details.pos.lat = pos.lat
      // this.gig.details.pos.lng = pos.lng
      //  console.log(this.gig.details.pos)
    }
  },
  created() {
    console.log("editing gig");
    var gigId = this.$route.params.gigId;
    if (gigId) {
      this.$store.dispatch({ type: "getGigById", gigId }).then(gig => {
        if (gig) this.gig = gig;
      });
    }
  },
  components: {
    GoogleMap,
    VueGallery
  }
};
</script>

<style>
.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 5px;
}
</style>
