<template>
  <form class="registration-container" @submit.prevent="register">
    <h1>
      Register to
      <span>
        Gig<span>It</span>
      </span>
    </h1>
    <div class="container1">
      <el-input placeholder="First Name" v-model="user.name.first" clearable></el-input>
      <el-input placeholder="Last Name" v-model="user.name.last" clearable></el-input>
    </div>
    <div class="container2">
      <label>
        <span>Age:</span>
        <el-input-number v-model="user.age"></el-input-number>
      </label>
      <el-input placeholder="Email" type="email" v-model="user.email" clearable></el-input>
    </div>
    <el-input
      type="textarea"
      placeholder="Tell us a little about yourself"
      v-model="user.aboutMe"
      resize="none"
      :autosize="{ minRows: 3, maxRows: 3}"
    ></el-input>
    <div class="container3">
      <el-input placeholder="Username" v-model="user.username" clearable></el-input>
      <el-input placeholder="Password" type="password" v-model="user.password" clearable></el-input>
    </div>
    <div class="container4">
      <el-select
        v-model="user.skills"
        multiple
        filterable
        default-first-option
        placeholder="What are your skills?"
      >
        <el-option
          v-for="item in skillopts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div>
      <el-input placeholder="Image URL" v-model="user.img">
        <template slot="prepend">Http://</template>
      </el-input>
    </div>
    <button type="submit">Register</button>
  </form>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      user: {
        name: {
          first: "",
          last: ""
        },
        age: 0,
        aboutMe: "",
        username: "",
        password: "",
        email: "",
        img: "",
        skills: [],
        mainArea: {
          lat: 32.023914,
          lng: 34.76021
        },
        gigsIds: {
          published: [],
          pending: [],
          completed: []
        },
        reviews: [],
        chatIds:[]
      },
      skillopts: [
        {
          value: "gardening",
          label: "Gardening"
        },
        {
          value: "pets",
          label: "Pets"
        },
        {
          value: "patience",
          label: "Patience"
        },
        {
          value: "house-work",
          label: "House-Work"
        },
        {
          value: "mobility",
          label: "Mobility"
        },
        {
          value: "physical strength",
          label: "Physical Strength"
        },
        {
          value: "computers",
          label: "Computers"
        }
      ]
    };
  },
  methods: {
      register() {
        this.$store.dispatch({type:'register', user:this.user})
      }
  }
};
</script>

<style lang="scss" scoped>

</style>

