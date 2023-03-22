<template>
  <CommonContainer>
    <CommonHeadingDetails />

    <LandingCarousel />

    <b-container class="mt-4 nav__container d-flex justify-content-center">
      <b-row align-v="center">
        <nuxt-link to="/deliveries">
          <b-col class="landing-nav shadow mb-3 d-flex justify-content-center align-items-center">
              <div class="d-flex align-items-center">
                <img src="../assets/images/to_be_delivered.png" alt="tbd">
                <span>to be <br /> delivered</span>
              </div>
          </b-col>
        </nuxt-link>
        <b-col class="landing-nav shadow mb-3 d-flex justify-content-center align-items-center">
          <div class="d-flex align-items-center">
            <img src="../assets/images/Contacts.png" alt="contacts">
            <span>contacts</span>
          </div>
        </b-col>
        <nuxt-link to="/products">
          <b-col class="landing-nav shadow mb-3 d-flex justify-content-center align-items-center">
            <div class="d-flex align-items-center">
              <img src="../assets/images/inv_tracker.png" alt="inv_trckr">
              <span>inventory <br /> tracker</span>
            </div>
          </b-col>
        </nuxt-link>
        <nuxt-link to="/transactionHistory">
          <b-col class="landing-nav shadow mb-3 d-flex justify-content-center align-items-center">
            <div class="d-flex align-items-center">
              <img src="../assets/images/transaction_history.png" alt="transhis">
              <span>transaction <br /> history</span>
            </div>
          </b-col>
        </nuxt-link>
      </b-row>
    </b-container>
  </CommonContainer>
</template>

<script>
export default {}
</script>
