<template>
  <div class="registration-wr">
    <form class="registration-container" @submit.prevent="register" v-if="!isDone">
      <h1>
        <span>
          Gig
          <span>It</span>
        </span>
        <br>
        {{(!user._id)? 'Register': 'Edit your profile'}}
      </h1>
      <div class="container1">
        <el-input placeholder="First Name" v-model="user.name.first" clearable></el-input>
        <el-input placeholder="Last Name" v-model="user.name.last" clearable></el-input>
      </div>
      <div class="container2">
        <label>
          <span>Age:</span>
          <el-input-number v-model="user.age" :min="18"></el-input-number>
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
      <label class="upload-container">
        <!-- <el-input placeholder="Image URL" v-model="user.img">
        <template slot="prepend">Http://</template>
        </el-input>-->
        <i class="fas fa-file-upload"></i>
        {{fileNameToShow}}
        <input
          type="file"
          name="imgUpload"
          @change="onFileInputChange"
          ref="elImgInput"
        >
      </label>
      <button type="submit">{{(!user._id)? 'Register': 'Save'}}</button>
    </form>
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
        <p class="success">Your Profile was updated!
          <!-- <br>Check it out -->
          <br>
          <router-link :to="'/user/' + user._id">Back to profile</router-link>
        </p>
      </div>
  </div>
</template>

<script>
import uploadService from "../service/uploadService.js";
export default {
  name: "register",
  data() {
    return {
      isDone: false,
      user: {
        name: {
          first: "",
          last: ""
        },
        age: 18,
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
        reviews: {
          totalAverage: 5,
          publishedAverage: 5,
          published: [
            {
              gigId: "0",
              title: "New User",
              givenBy: {
                name: "GigIt Team",
                img:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
              },
              createdAt: 1543412028131,
              ratings: {
                text: "A newly added Gigster, be the first to review him!",
                payment: 5,
                reliable: 5,
                overall: 5,
                average: 5
              }
            }
          ],
          completedAverage: 5,
          completed: [
            {
              gigId: "0",
              title: "New User",
              givenBy: {
                name: "GigIt Team",
                img:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
              },
              createdAt: 1543412028131,
              ratings: {
                text: "A newly added Gigster, be the first to review him!",
                work: 5,
                reliable: 5,
                overall: 5,
                average: 5
              }
            }
          ]
        },
        chats: [],
        notficCount: 0,
        inboxCount: 0,
      },
      selectedFile: null,
      selectedFileName: null,
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
      var user = this.user;
      if (
        !user.name.first ||
        !user.username ||
        !user.password ||
        !user.age ||
        !user.email ||
        !user.name.last ||
        !user.aboutMe
      ) {
        this.$message({
          message: "Please fill out all fields!",
          type: "warning"
        });
        return;
      }
      if (!this.user.img)
        this.user.img =
          "https://res.cloudinary.com/barpel/image/upload/v1544540737/gigitUploads/i3eob2vi4keh5pxlpkre.jpg";
      const userId = this.$route.params.userId;
      if (!userId) {
        this.$store
          .dispatch({ type: "register", user: this.user })
          .then(() => this.$router.push("/"))
          .catch(err => {
            if (err.response.status === 401)
              this.$message.error("Username taken!");
          });
      } else {
        this.$store
          .dispatch({ type: "updateUser", user: this.user })
          .then(res => {
            this.isDone = true;
            setTimeout(()=> {
              this.$router.push(`/user/${this.user._id}`)
            }, 3000)
          });
      }
    },
    onFileInputChange(ev) {
      if (ev.target.files[0]) {
        this.selectedFileName = ev.target.files[0].name;
        this.selectedFile = ev.target.files[0];
        var elImgInput = this.$refs.elImgInput;
        uploadService
          .uploadToCloudinary(this.selectedFile)
          .then(imgUrl => (this.user.img = imgUrl));
      } else return;
    }
  },
  computed: {
    fileNameToShow() {
      return !this.selectedFileName ? "Upload an image" : this.selectedFileName;
    }
  },
  created() {
    const userId = this.$route.params.userId;
    if (userId) {
      this.$store.dispatch({ type: "getUserById", userId }).then(user => {
        this.user = user;
        this.selectedFileName = user.name.first + ".jpg";
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

