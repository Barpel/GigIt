<template>
  <section class="gig-edit">
    <h1>
      {{isAdd}}
      <span>Gig</span>
    </h1>
    <div class="gig-edit-container">
      <form @submit.prevent="save" class="gig-edit-form">
        <div class="form-wrapper-1">
          <div class="gig-title-container">
            <el-input
              placeholder="Gig Title"
              v-model="gig.details.title"
              clearable
              class="gig-title-input"
            ></el-input>
          </div>
          <div class="gig-category-container">
            <el-select v-model="gig.category" placeholder="Category" class="gig-category-input">
              <el-option
                v-for="category in categoryOpts"
                :key="category.value"
                :label="category.label"
                :value="category.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 3}"
          placeholder="Describe your gig..."
          v-model="gig.details.desc"
        ></el-input>

        <div class="block">
          <el-date-picker
            v-model="gig.details.gigTime"
            type="datetimerange"
            align="right"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </div>
        <label class="gig-price-container">
          <h4
            class="pro-tip"
            v-if="isShowingTip"
          >PRO-TIP: Set a fair price to get the Gig done quickly!</h4>
          <h2>Price:</h2>
          <el-input-number
            v-model="gig.details.price"
            :step="10"
            size="small"
            @focus="toggleTip"
            @blur="toggleTip"
          ></el-input-number>
        </label>
        <button class="gig-submit-btn" type="submit">
          {{isAdd}}
          <span>Gig</span>
        </button>
      </form>
    </div>
  </section>
</template>

<script>
// import gigSesrvice
export default {
    data() {
        return {
            gig: {
                publisherId: '',
                category: '',
                createdAt: 0,
                pendingUsers: [],
                isRead: true,
                isActive: true,
                details: {
                    title:'',
                    desc: '',
                    price: 0,
                    pos: {
                        dist: this.getRandomDist(),
                        lat: 32.068424,
                        lng: 34.824783,
                    },
                    gigTime: '',
                    imgs: []

                }
            },
            isShowingTip: false,
            categoryOpts: [{
          value: 'delivery',
          label: 'Delivery'
        }, {
          value: 'house-work',
          label: 'House-Work'
        }, {
          value: 'pet-care',
          label: 'Pet-Care'
        }, {
          value: 'other',
          label: 'Other'
        }, {
          value: 'line-queue',
          label: 'Line-Queue'
        },
        {
          value: 'moving',
          label: 'Moving'
        }],
        
        }
        
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        isAdd() {
            if(this.gig._id) return 'Edit'
            else return 'Add'
        },
        currTime() {
            var time = new Date()
            return `${time.getHours()}:${time.getMinutes()}`
        }
    },
    methods: {
        getRandomDist() {
            var randomNum = Math.random() * 3
            if (randomNum < 0.1) randomNum = randomNum + 0.3;
            return randomNum.toFixed(1) + 'KM Away'
        },
        toggleTip() {
            this.isShowingTip = !this.isShowingTip
        },
        save() {
          var gig = this.gig
          gig.createdAt = Date.now()
          gig.publisherId = this.user._id
          var userGigsListToUpdate = (gig._id)? null : this.user.gigsIds.published 
          this.$store.dispatch({type:'updateGig', gig, userGigsListToUpdate})
          this.$router.push('/')
        }
    },
    created() {
        var gigId = this.$route.params.gigId
        if(gigId) {
            this.$store.dispatch({type:'getGigById', gigId})
                .then(gig=> {
                    if(gig) this.gig = gig
                })
        }
    }
}
</script>

<style>

</style>
