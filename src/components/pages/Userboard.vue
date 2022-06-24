<template>
  <div>
    <nav class="navbar navbar-light bg-dark">
      <div class="container-fluid">
        <router-link class="fs-4 fw-bold link-light" to="/user/cart">模擬產品列表</router-link>
      </div>
    </nav>
     <div class="container">
         <router-view></router-view>
     </div>
  </div>
</template>


<style lang="scss">
a{
    text-decoration: none;
}
</style>