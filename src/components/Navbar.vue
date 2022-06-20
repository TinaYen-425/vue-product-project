<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 me-0 ps-4 " href="#">Casual Shop</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="搜尋"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signout(){
      const api = `${process.env.VUE_APP_APIPATH}logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
      if (response.data.success){
        vm.$router.push('/login')// 登出則回到登入頁面
      }
    }
    )} 
  },
  created (){
    var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tinaToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    this.$http.defaults.headers.common.Authorization = myCookie;
  }
}

</script>