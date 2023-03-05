<template>
  <div class="index">
    <div id="logo">LOGO</div>
    <div id="carousel">CAROUSEL</div>
    <div id="nav">
      <div class="nav-button">
        <div class="nav-button-content">
          <!-- IMAGE HERE -->
          TO BE DELIVERED
        </div>
      </div>
      <div class="nav-button">
        <div class="nav-button-content">
          <!-- IMAGE HERE -->
          CONTACTS
        </div>
      </div>
      <div class="nav-button">
        <div class="nav-button-content">
          <!-- IMAGE HERE -->
          INVENTORY TRACKER
        </div>
      </div>
      <div class="nav-button">
        <div class="nav-button-content">
          <!-- IMAGE HERE -->
          TRANSACTION HISTORY
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
  .index{
    width: 100vw;
    height: 100vh;

    background-color: #d9d9d9;
  }

  #nav{
    display: flex;
    justify-content: center;
  }

  .nav-button{
    display: inline-block;
    margin-inline: 18px;

    width: 258px;
    height: 175px;

    background-color: white;

    box-shadow: 0px 4px 4px;
  }
</style>