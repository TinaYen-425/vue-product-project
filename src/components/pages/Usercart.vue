<template>
  <div>
    <Loading :active="isLoading" />
    <div class="d-flex justify-content-end">
      <a
        class="link-primary mt-4 fs-2"
        data-bs-target="#offcanvasRight"
        data-bs-toggle="offcanvas"
        aria-controls="offcanvasRight"
      >
        <div class="d-flex align-items-content">
          <i class="bi bi-bag-heart-fill position-relative">
            <span
              class="fs-6 position-absolute top-0 start-100 translate-middle px-2 rounded-circle bg-info text-white"
              >{{ cartLen }}</span
            >
          </i>
          <span class="fs-6 d-inline-block py-3 ms-2">購物車</span>
        </div>
      </a>
    </div>
    <!-- 產品列表 -->
    <div class="main row row-cols-lg-3 row-cols-md-2 row-cols-1 gy-5 mt-1">
      <div class="col" v-for="(item, key) in products" :key="key">
        <div class="card text-secondary border-0 rounded-4 shadow-custom-lg">
          <div
            class="card-img-custom card-img rounded-top-4"
            :style="{ backgroundImage: `url('${item.imageUrl}')` }"
          ></div>
          <div class="card-body">
            <h5
              class="card-title fw-bold fs-4 mb-2 text-center text-dark text-nowrap"
            >
              {{ item.title }}
            </h5>
            <p class="card-text text-end">
              <span class="fs-6 text-decoration-line-through d-block"
                >原價 NT${{ item.origin_price }} 元</span
              >
              <span class="fs-6 d-block"
                >現在只要
                <span class="text-primary fw-bold fs-5">
                  <span class="fs-6">NT$</span> {{ item.price }}
                  <span class="fs-6">元</span></span
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
  </div>
  <!-- 購物車列表 -->
  <template v-if="cart.carts">
    <div>
      <div
        class="offcanvas offcanvas-end border-0"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        data-bs-keyboard="true"
        style="width: 350px"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">購物車列表</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body d-flex flex-column">
          <div>
                      <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-between px-4 fw-bold bg-warning border-0 rounded-0 align-items-center"
            >
              <div class="invisible"></div>
              <div class="text-center" style="width: 135px">品名項目</div>
              <div style="width: 30px">數量</div>
              <div>價格</div>
            </li>
          </ul>
          <ul
            class="list-group bg-white"
            v-for="item in cart.carts"
            :key="item.id"
            v-if="cartLen !== 0"
          >
            <li
              class="list-group-item d-flex justify-content-between align-items-center ps-2 pe-4 border-0 rounded-0 py-2"
            >
              <a
                class="link-secondary"
                href="#"
                @click.prevent="delCart(item.id)"
                ><i class="bi bi-trash3"></i
              ></a>
              <div class="" style="width: 135px">
                <div v-if="item.total == item.final_total">
                  {{ item.product.title }}
                </div>
                <div
                  class="d-flex flex-column"
                  v-else="item.total !== item.final_total"
                >
                  <div>{{ item.product.title }}</div>
                  <div class="text-success"><em>已套用優惠卷</em></div>
                </div>
              </div>
              <div>{{ item.qty }}/{{ item.product.unit }}</div>
              <div class="text-end" v-if="item.total == item.final_total">
                {{ $filters.currency(item.qty * item.product.price) }}
              </div>
              <div
                class="text-end text-success"
                v-else="item.total !== item.final_total"
              >
                {{ $filters.currency(item.final_total) }}
              </div>
            </li>
          </ul>
          <p
            class="text-center fs-3 px-2 py-3 text-secondary"
            v-else="cartLen == 0"
          >
            購物車沒有東西喔!
          </p>
          <div
            class="list-group pt-3 px-4 bg-white"
            v-if="total !== final_total"
          >
          </div>
          <div class="d-flex pt-2 bg-white align-items-center">
            <label class="text-nowrap p-2 text-success fw-bold" for="coupon"
              >優惠碼</label
            >
            <input
              class="form-control form-control-sm w-75 disabled"
              type="text"
              id="coupon"
              placeholder="輸入折扣碼"
              v-model="coupon_code"
              @keyup.enter="addCoupon(true)" 
              :readonly="status.loadingItem == true"
            />
          </div>
          <div
            class="text-end pt-3 pb-1 bg-white pe-3"
            v-if="total !== final_total"
          >
            原始總計 NT$
            <span class="border-bottom d-inline-block px-1">
              {{ $filters.currency(total) }}</span
            >
          </div>
          <div
            class="text-end py-3 bg-white fw-bold fs-4 pe-3"
          >
            <template v-if="total === final_total">
              總計 NT$
              <span
                class="text-primary border-bottom border-2 d-inline-block text-info border-primary px-1"
              >
                {{ $filters.currency(total) }}</span
              >
            </template>
            <template v-else>
              折扣後金額 NT$
              <span
                class="text-primary border-bottom border-2 d-inline-block text-info border-primary px-1"
              >
                {{ $filters.currency(final_total) }}</span
              >
            </template>
          </div>
          </div>
          <div class="mt-auto text-center" v-if="cartLen !== 0 ">
            <button type="button" class="btn btn-outline-dark w-75 rounded shadow-sm border-2" @click="$refs.orderModal.showModal()">建立訂單</button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <OrderModal  ref="orderModal"/>
</template>

<script>
import OrderModal from '../OrderModal.vue';

export default {
  components: {OrderModal},
  data() {
    return {
      products: [],
      cart: {},
      cartLen: "",
      total: "",
      final_total: "",
      isLoading: false,
      status: {
        loadingItem: "",
      },
      coupon_code: "",
      tempCoupon_code: "",
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
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(url).then(res => {
        vm.cart = res.data.data;
        vm.total = res.data.data.total;
        vm.final_total = res.data.data.final_total; //final_total 為優惠卷打折後的價格
        vm.cartLen = res.data.data.carts.length;
      });
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
          this.getCart();
        }
      });
    },
    delCart(id) {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(url).then(res => {
        this.isLoading = false;
        this.getCart();
      });
    },
    addCoupon() {
      this.status.loadingItem = true;
      const coupon = {
        code: this.coupon_code,
      };
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      this.$http.post(url, { data: coupon }).then(res => {
        this.status.loadingItem = false;
        this.getCart();
      }).catch(err => {
        console.dir(err);
      })
    },
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
