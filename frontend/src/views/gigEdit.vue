<template>
  <section class="gig-edit">
    <h1>{{isAdd}} Gig</h1>
    <div class="gig-edit-container">
      <form @submit.prevent="save" class="gig-edit-form">
        <el-input placeholder="Gig Title" v-model="gig.details.title" clearable></el-input>
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 3}"
          placeholder="Describe your gig..."
          v-model="gig.details.desc"
        ></el-input>
        <label>
          <h2>Price:</h2>
          <el-input-number v-model="gig.details.price" :step="10" size="small"></el-input-number>
        </label>
        <div class="block">
          <span class="demonstration">Start date time 12:00:00, end date time 08:00:00</span>
          <el-date-picker
            v-model="gig.details.gigTime"
            type="datetimerange"
            align="right"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </div>
        <el-select v-model="gig.category.value" placeholder="Category">
          <el-option
            v-for="category in gig.category.options"
            :key="category.value"
            :label="category.label"
            :value="category.value"
          ></el-option>
        </el-select>
        <button class="gig-edit-submit" type="submit">Add Gig</button>
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
                category: {
                    options: [{
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
        },
        ],
        value: '',
                },
                createdAt: 0,
                pendingUsers: [],
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
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        isAdd() {
            if(this.gig.id) return 'Edit Your'
            else return 'Add New'
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
        save() {
            console.log(this.gig)
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
        // console.log(gigId)
        
    }
}
</script>

<style>

</style>
