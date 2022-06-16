<template>
  <div class="hello">
    <a href="#" class="btn btn-secondary" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  // methods: {
  //   signout(){
  //     const api = `${process.env.VUE_APP_APIPATH}logout`;
  //     const vm = this;
  //     this.$http.post(api).then((response) => {
  //     if (response.data.success){
  //       vm.$router.push('/login')// 登出則回到登入頁面
  //     }
  //   }
  //   )} 
  // },
  // created (){
  //   var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tinaToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  //   this.$http.defaults.headers.common.Authorization = myCookie;
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
