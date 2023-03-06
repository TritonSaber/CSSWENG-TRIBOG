<template>
  <div class="index">
    <div id="logo">
      <img src="../assets/images/SRIXON.png" alt="SRIXON">
    </div>
    <NoSsr placeholder="Loading...">
    <div class="carousel">
      <div class="carousel-item-active">
        <img src="../assets/images/item1.png" alt="item1">
      </div>
      <div class="carousel-item">
        <img src="../assets/images/item2.png" alt="item2">
      </div>
      <div class="carousel-item">
        <img src="../assets/images/item3.png" alt="item3">
      </div>
      <div class="carousel-item">
        <img src="../assets/images/item4.png" alt="item4">
      </div>
      <div class="carousel-item">
        <img src="../assets/images/item5.png" alt="item5">
      </div>
    </div>
    </NoSsr>
    <div id="nav">
      <div class="nav-button">
        <div class="nav-button-content">
          <img src="../assets/images/to_be_delivered.png" alt="tbd">
          TO BE DELIVERED
        </div>
      </div>
      <div class="nav-button">
        <div class="nav-button-content">
          <img src="../assets/images/Contacts.png" alt="contacts">
          CONTACTS
        </div>
      </div>
      <div class="nav-button">
        <div class="nav-button-content">
          <img src="../assets/images/inv_tracker.png" alt="inv_trckr">
          INVENTORY TRACKER
        </div>
      </div>
      <div class="nav-button">
        <div class="nav-button-content">
          <img src="../assets/images/transaction_history.png" alt="transhis">
          TRANSACTION HISTORY
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// let carouselPosition = 0;
// // const carousels=document.getQuerySelectorAll('.carousel-item');
// const carousels=ref(null);
// const totalCarousel=carousels.length;

// onMounted(()=>{
//   ob
// })

// function updatePosition(){
//   carousels.forEach(carousel=>{
//     carousel.classList.remove('active');
//     carousel.classList.add('hidden');
//   });

//   carousels[carouselPosition].classList.add('active');
// }

// setInterval(()=>{
//   if(carouselPosition==totalCarousel-1){
//     carouselPosition=0;
//   }else{
//     carouselPosition++;
//   }
//   updatePosition();
// },1000);
</script>

<style lang="scss">
  .index{
    width: 100vw;
    height: 100vh;

    background-color: #d9d9d9;
  }

  #logo{
    display: flex;
    justify-content: center;
  }

  .carousel{
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 58px;

    width: 298px;
    height: 298px;

    background-color: #FDFEFE;

    box-shadow: 0px 4px 4px;
  }
  
  .carousel img{
    width: 100%;
    height: auto;
  }

  .slider-item,
  .hidden
  {
    display: none;
  }

  .active{
    display: block;
    animation: fadeAnimation 0.5s;
  }

  @keyframes fadeAnimation{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
      transition: opacity linear;
    }
  }

  #nav{
    display: flex;
    justify-content: center;
  }

  .nav-button{
    display: inline-block;
    margin-inline: 18px;
    padding-top: 64px;

    width: 258px;
    height: 175px;

    background-color: white;

    box-shadow: 0px 4px 4px;
  }

  .nav-button-content{
    display: flex;
    margin-inline: 5px;
    align-items: center;
    justify-content: center;
    
    font-weight: bold;
    color: #a82c30;
  }
</style>