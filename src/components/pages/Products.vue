<template>
  <div>
    <div class="text-end mt-4">
        <button class="btn btn-primary"  @click="openModal">建立新的產品</button>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="80">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, key) in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-end">{{item.origin_price}}</td>
            <td class="text-end">{{item.price}}</td>
            <td class="text-center">
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
            </td>
            <td>
                <button class="btn btn-outline-primary btn-sm">編輯</button>
            </td>
            </tr>
        </tbody>
    </table>

<!-- Modal -->
<div class="modal fade" id="productsModal" tabindex="-1" aria-hidden="true"  aria-labelledby="exampleModalLabel" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/products`;
      const vm = this;
      this.$http.get(api).then(response => {
          vm.products = response.data.products;
      });
    },
    openModal(){
        var myModal = document.querySelector('#productsModal')
        myModal.show()
       
    }
  },
  created(){
      this.getProducts()
  }
};
</script>
