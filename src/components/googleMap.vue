<template>
  <div class="map-container">
    <div v-if="this.editPage" class="add-pin-container">
      <h2>Search and add a pin</h2>
      <div>
        <gmap-autocomplete @place_changed="setPlace" class="add-pin-input" placeholder="Enter a location"></gmap-autocomplete>
        <button class="add-pin-btn" @click.prevent="addMarker">Add</button>
      </div>
    </div>
    <gmap-map ref="map" :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker
        class="imBoss"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  props: ["gig", "editPage"],
  name: "GoogleMap",
  data() {
    return {
      center: {},
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    if (this.gig._id) {
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
      navigator.geolocation.getCurrentPosition(position => {
        this.markers.push({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
      setTimeout(() => {
        this.getRoute();
      }, 500);
    } else this.geolocate();
  },

  methods: {
    setPlace(place) {
      this.currentPlace = place;
      this.$emit("setPlace", place);
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
      if (navigator.geolocation.getCurrentPosition) {
        this.center = {
          lat: 32.0853,
          lng: 34.781769
        };
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          console.log()
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      }
    },

    getRoute: function() {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.$refs.map.$mapObject);
      var vm = this;
      vm.directionsService.route(
        {
          origin: this.markers[0].position,
          destination: this.markers[1].position,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            vm.directionsDisplay.setDirections(response);
          } else {
            console.log("Directions request failed due to " + status);
          }
        }
      );
    }
  },
  destroyed() {},
  components: {}
};
</script>
<style lang="scss" scoped>
</style>
