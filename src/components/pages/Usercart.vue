<template>
  <div>
    <Loading :active="isLoading" />
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary mt-4" type="button"   data-bs-target="#offcanvasRight"
      data-bs-toggle="offcanvas" 
      aria-controls="offcanvasRight" @click="openModal">
        購物車<span></span>
      </button>
    </div>
    <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 gy-5 mt-1">
      <div class="col" v-for="(item, key) in products" :key="key">
        <div class="card text-secondary border-0 rounded-4 shadow-custom-lg">
          <div
            class="card-img-custom card-img rounded-top-4"
            :style="{ backgroundImage: `url('${item.imageUrl}')` }"
          ></div>
          <div class="card-body">
            <h5 class="card-title fw-bold fs-2 mb-4 text-center text-dark">
              {{ item.title }}
            </h5>
            <p class="card-text">
              <span class="fs-6 text-decoration-line-through d-block"
                >原價 NT${{ item.origin_price }} 元</span
              >
              <span class="fs-4 d-block"
                >現在只要
                <span class="text-primary fw-bold">
                  <span class="fs-5">NT$</span> {{ item.price }}
                  <span class="fs-5">元</span></span
                >
              </span>
            </p>
            <div
              class="d-flex justify-content-center flex-column border-top pt-3"
            >
              <a
                href="#"
                class="btn btn-info link-custom-secondary fw-bold mb-2 py-2"
                @click.prevent="getProduct(item.id)"
                >查看更多</a
              >
              <a
                href="#"
                class="btn btn-danger fw-bold py-2"
                :disabled="this.status.loadingItem === item.id"
                @click.prevent="addCart(item.id)"
              >
                <div
                  class="spinner-grow spinner-grow-sm"
                  v-if="this.status.loadingItem === item.id"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                加入購物車
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CartModal  :cart="carts"/>
  </div>
</template>

<script>
import CartModal from "@/components/CartModal.vue";


export default {
  components:{CartModal,},
  data() {
    return {
      products: [],
      carts: {},
      cartqty: {},
      isLoading: false,
      status: {
        loadingItem: "",
      },
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.isLoading = true;
      const vm = this;
      this.$http.get(api).then(response => {
        this.isLoading = false;
        vm.products = response.data.products;
      });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    addCart(id) {
      this.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty: 1,
      };
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.post(url, { data: cart }).then(res => {
        if (res.data.success) {
          this.status.loadingItem = "";
        }
      });
    },
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(url).then(res => {
        console.log(res.data.data)
        vm.carts = res.data.data;
      });
    }

  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style lang="scss">
@import "@/assets/stylesheet/all.scss";

.card-img-custom {
  background-position: center center;
  height: 200px; //424px
  background-size: cover;
  background-repeat: no-repeat;
}
.shadow-custom-lg {
  box-shadow: $box-shadow;
  &:hover {
    box-shadow: $box-shadow-lg;
  }
}
.link-custom-secondary {
  color: $secondary;
  &:hover {
    color: white;
  }
  &.active {
    color: $primary;
  }
}
a {
  text-decoration: none;
}
</style>
