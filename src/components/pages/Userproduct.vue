<template>
  <Loading :active="isLoading" />
  <div>
    <nav
      aria-label="breadcrumb"
     style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"
    >
      <ol class="breadcrumb mt-4">
        <li class="breadcrumb-item">
          <router-link class="link-success" to="/user/cart"
            >產品目錄</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div>
      <h2 class="mt-3 mb-4">商品細項</h2>
      <div class="container">
        <div class="row gx-3">
          <div class="col-8">
            <h3 class="ms-3">名稱：{{ product.title }}</h3>
            <p class="ms-3 h4 mb-2 text-secondary">
              介紹：{{ product.content }}
            </p>
            <p class="ms-3 h4 text-secondary">
              內容物：{{ product.description }}
            </p>
          </div>
          <div class="col-4">
            <h4 class="text-secondary text-decoration-line-through">
              售價：NT${{ product.origin_price }}
            </h4>
            <h4 class="text-primary mb-2">優惠價：NT${{ product.price }}</h4>
            <select name="" class="form-control" v-model="num" @click="getCart">
              <option disabled value="">數量選擇</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
            <p class="pt-2 mb-2 text-end">小計 NT$ {{ num * product.price }}</p>
            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-danger w-50"
                @click="addCart(product.id, num)"
              >
                <div
                  class="spinner-grow spinner-grow-sm"
                  v-if="this.status.loadingItem === product.id"
                  role="status"
                ></div>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <!-- <img class="img-fluid" :src="product.imageUrl" alt="" /> -->
      <div
        class="card-img-custom card-img rounded-top-4 mt-4"
        :style="{ backgroundImage: `url('${product.imageUrl}')` }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        imageUrl: "",
      },
      num: "",
      isLoading: false,
      id: "",
      status: {
        loadingItem: "",
      },
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.id}`;
      this.isLoading = true;
      const vm = this;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.isLoading = false;
          vm.product = response.data.product;
        }
      });
    },
    addCart(id, qty = 1) {
      const cart = {
        product_id: id,
        qty,
      };
      if (qty < 1) {
        alert("購買數不可低於0");
      } else {
        this.status.loadingItem = id;
        const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        this.$http.post(url, { data: cart }).then(res => {
          if (res.data.success) {
            this.status.loadingItem = "";
            this.getCart();
          }
        });
      }
    },
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(url).then(res => {
        vm.total = res.data.data.total;
      });
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
    this.getCart();
  },
};
</script>

<style lang="scss">
.card-img-custom {
  background-position: center center;
  height: 300px; //424px
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
