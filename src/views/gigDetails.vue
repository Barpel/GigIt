

<template>
  <section>
    <div class="top-detail-container">
      <div class="top-detail-title">
        <h6>
          <i class="fas fa-arrow-left"></i>
          Back
        </h6>
        <br>
        <h5 class="gig-">{{this.gig.details.title}}</h5>
      </div>
      <div class="avatar-img-container">
        <img src="../img/racheli.png" alt>
        <h5>Rachel Bahabua</h5>
      </div>
    </div>
    <div class="mid-details-container">
      <div class="gig-desc">
        <p>{{this.gig.details.desc}}</p>
      </div>
      <div class="category-img-container">
        <h5>{{this.gig.category}}</h5>
        <img src="../img/moving.png" alt>
      </div>
    </div>
    <div>
      <div class="details-container-nav">
        <div class="map-img-container">
          <img src="../img/mapDemo.png" alt>
        </div>
        <div class="gigit-detail-container">
          <div class="payment-price-container">
            <p>Earn {{this.gig.details.price}} for this Gig</p>
          </div>
          <button class="gigit-btn">
            <h1>
              <span>
                Gig
                <span>It</span>
              </span>
            </h1>
          </button>
        </div>
      </div>
      <div class="review-details-container">
        <ul>User Score
          <li>
            Payment
            <span>⭐⭐⭐⭐✰</span>
          </li>
          <li>
            Reliable
            <span>⭐⭐⭐⭐✰</span>
          </li>
          <li>
            Overall
            <span>⭐⭐⭐⭐✰</span>
          </li>
        </ul>
        <div>
          <h4>More Reviews...</h4>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// make it smart(page)V 
//use dispatch to get By id 
export default {
    name:'gigDetails',
    data(){
        return  {
       gig:{ id: 8,
        publisherId: 'bce',
        category: 'moving',
        createdAt: 1543242149936,
        isActive: true,
        details: {
            title: 'Get my old couch out of my house',
            desc: 'I want to throw away my old couch, living on first floor no stairs',
            price: '50 NIS',
            pos: {
                lat: 32.087098,
                lng: 34.802301
            },
            gigTime: {
                from: 1543238948388,
                to: 1543239948388
            },
            imgs: []
        }
       },
        created(){
            console.log('got here!!!')
           let id = this.$route.params.gigId
           console.log(id)
            this.$store.dispatch({type:getGigById, gigId})
        }
    }
    }

}
</script>

<style  lang="scss">

*{
    color:azure;
}

section{
    display: grid;

}
.top-detail-container{
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 10px;
    .h6 {
        padding: 10px;
    }
    .top-detail-title{
        text-align: left;
        // width: 75px;
        font-size: 0.7rem;
    }
    .avatar-img-container{
    width: 60px;
    grid-row: 1 / 2;
    grid-column: 2;
    h5 {
        margin: 0 auto;
        width: 100%;
    }
    img{
        width: 75px;
    }
}
}
.mid-details-container{
    padding: 5px;
    display: flex;
    justify-content: space-around;
}
.gig-desc{
    border:1px solid white;
    border-radius: 10px;
    padding: 5px;
    width: 130px;
}

.details-container-nav{
    display: flex;
    justify-content: space-around;
}
.map-img-container{
    img{
    margin: 10px;    
    width: 160px;
    height: 120px;
    }
} 
.gigit-detail-container{
    display: flex;
    flex-direction: column;

    .payment-price-container{
        width: 70px;
        margin: 5px
    }
    
}
.review-details-container{
    display: flex;
    justify-content: space-around;
}
.category-img-container > img {
    width: 130px;
    height: 130px;
}
.category-img-container>h6{
    margin: 0
}
.gigit-btn{
    height: 50px;
	box-shadow:inset 0px 1px 0px 0px #2ca2af;
	background-color:#2ca2af;
	border:1px solid #2ca2af;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:13px;
	font-weight:bold;
	padding:6px 12px;
}
 h1 {
      margin: 0;
      height: 100%;
      font-size: 1.5rem;
      }

.gigit-btn:hover{
	background-color:#2a8691;
}
.gigit-btn:active{
    position:relative;
	top:1px;
}
 h1 {
      margin: 0;
      height: 100%;
      display: grid;
      grid-template-rows: 1fr 1fr;
      font-size: 1.5rem;
      span {
        font-family: condiment;
        span {
          color: #97a5a7;
        }
      }
    }

</style>
