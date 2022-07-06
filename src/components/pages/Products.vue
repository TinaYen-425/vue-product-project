<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="70">編輯</th>
          <th width="70">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-end">{{ $filters.currency(item.price) }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="openDelModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination @emit-page="getProducts" :pages="pagination"/>

    <ProductModal
      :product="tempProduct"
      @updata-product="updateProduct"
      ref="productModal"
    ></ProductModal>
    <DelModal
      ref="delModal"
      :item="tempProduct"
      @del-item="delProduct"
    ></DelModal>
  </div>
</template>

<script>
import ProductModal from "@/components/ProductModal.vue";
import DelModal from "@/components/DelModal.vue";
import Pagination from "@/components/Pagination.vue"

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      pagination: ''
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  inject: ['pushMsgState'],
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      this.isLoading = true;
      const vm = this;
      this.$http.get(api).then(response => {
        this.isLoading = false;
        this.pagination = response.data.pagination
        vm.products = response.data.products;
      });
    },
    updateProduct(item) {
      this.tempProduct = item;
      //新增
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = "post";

      //編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`;
        httpMethod = "put";
      }
      const vm = this;
      const productComponent = this.$refs.productModal;
      console.log(vm.tempProduct)
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        productComponent.hideModal();
          this.getProducts()
          this.pushMsgState.MsgNotice(response)

      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    //刪除
    openDelModal(item) {
      this.tempProduct = item;
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(response => {
        // console.log(response.data, vm.tempProduct);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
         this.getProducts();
         this.pushMsgState.MsgNotice(response)
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
