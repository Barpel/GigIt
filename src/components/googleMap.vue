<template>
  <div>
    <div v-if="this.editPage">
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
        <button @click.prevent="addMarker">Add</button>
      </label>
      <br>
    </div>
    <br>
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker class="imBoss"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
// import DirectionsRenderer from '@/component/DirectionsRenderer'
export default {
  props: ["gig","editPage"],
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 32.0853, lng: 34.781769 },
      markers: [],
      places: [],
      currentPlace: null,
    };
  },

  mounted() {
    if (this.gig._id) {
      console.log("here");
      this.currentPlace = this.gig.details.location;
      this.center = {
        lat: this.gig.details.location.lat,
        lng: this.gig.details.location.lng
      };
      this.markers.push({
        position: {
          lat: this.gig.details.location.lat,
          lng: this.gig.details.location.lng
        }
      });
    } else this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    elTest(){
        var el = document.querySelectorAll('img')
      console.log(el)
    },
    addMarker() {
      if (this.currentPlace) {
        var marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.$emit("addMarker", marker);
        this.markers.splice(0, 1);
        this.places.splice(0, 1);
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: 32.0853,
          lng:  34.781769 
        };
      });
    }
  },
  destroyed() {},
  components:{
    //   DirectionsRenderer
  }
};

// if (this.currentPlace) {
//         const marker = {
//           lat: this.currentPlace.geometry.location.lat(),
//           lng: this.currentPlace.geometry.location.lng()
//         };
//         this.markers.splice(0, 1);
//         this.markers.push({ position: marker });
//         this.center = marker;
//         this.$emit("addMarker", this.center);
//         this.currentPlace = null;
//       }
</script>
<style lang="scss" scoped>
 .imBoss >img {
        border: 2px solid blue !important;
        width: 200px !important;
        height: 200px !important;
        border-radius: 5px;
      }
</style>
