

<template>
  <section>
    <h2 class="gig-">{{this.gig.details.title}}</h2>
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
        <h5>Gig Owner: Racheli Bahabua</h5>
        <p>Earn {{this.gig.details.price}} for this Gig</p>
       <button class="gigit-btn">GigIt</button>
    </div>
    
    <div class="map-img-container">
      <img src="../img/map.png" alt>
    </div>
  </section>
</template>

<script>
// make it smart(page) 
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
            
        }
    }
    }

}
</script>

<style>
*{
    color:azure;
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
.map-img-container > img{
    width: 150px;
    height: 150px;
}
.category-img-container > img {
    width: 130px;
    height: 130px;
}
.category-img-container>h6{
    margin: 0
}
.gigit-btn{
	box-shadow:inset 0px 1px 0px 0px #9acc85;
	background-color:#74ad5a;
	border:1px solid #3b6e22;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:13px;
	font-weight:bold;
	padding:6px 12px;
}
.gigit-btn:hover{
	background-color:#68a54b;
}
.gigit-btn:active{
    position:relative;
	top:1px;
}

</style>
