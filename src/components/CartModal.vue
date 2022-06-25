<template>
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
      <div class="offcanvas-body">
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between px-4 fw-bold bg-warning border-0 rounded-0 align-items-center">
          <div class="invisible">刪除</div>
          <div class="">品名</div>
          <div class="">數量</div>
          <div class="">價格</div>
          </li>
        </ul>
        <ul class="list-group" v-for="(cart, key) in cartItems.carts" :key="cart.product_id">
          <li class="list-group-item d-flex justify-content-between align-items-center px-4 border-0 rounded-0 ">
            <button class="btn btn-outline-danger btn-sm">刪除</button>
            <div>{{ cart.product.title }}</div>
            <div class="input-group input-group-sm" style="width: 90px;"> 
              <input class="form-control " type="number">
              <span class="d-inline-block input-group-text">/{{ cart.product.unit}}</span></div>
            <div class="text-end">{{ $filters.currency(cart.product.price) }}</div>
          </li>
        </ul>
        <div class="text-end py-3 bg-white fw-bold fs-4 pe-3">總計 NT$ <span class="text-primary border-bottom  border-2 d-inline-block text-info border-primary px-1">{{ $filters.currency(cart.final_total) }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import offcanvas from "bootstrap/js/dist/offcanvas";

export default {
  props: {
    cart: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    cart() {
      this.cartItems = this.cart;
    },
  },
  data() {
    return {
      cartItems: {},
    };
  },
  // methods: {
  //     showModal() {
  //       this.offcanvas.show();
  //     },
  //     hideModal() {
  //       this.offcanvas.hide();
  //     },
  //   },
  // mounted() {
  //   this.offcanvas = new offcanvas(this.$refs.offCanvas);
  // }
};
</script>
