<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
        style="margin-top: 195px"
      >
        <div class="modal-content border-0 w-50 start-50 translate-middle">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠卷</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hideModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <div class="form-group col-md-6 mb-2">
                  <label for="title">名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入優惠名稱"
                    v-model="tempCoupon.title"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6 mb-2">
                    <label for="discount">折扣百分比</label>
                    <input
                      type="number"
                      class="form-control"
                      id="discount"
                      placeholder="折扣"
                      v-model="tempCoupon.percent"
                    />
                  </div>
                  <div class="form-group col-md-6 mb-2">
                    <label for="due">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="due"
                      placeholder="期限"
                      v-model="due_date"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempCoupon.is_enabled"
                    />
                    <label
                      class="form-check-label pointer"
                      for="tempCoupon.is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              @click="hideModal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="$emit('update-coupon', tempCoupon)"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "@/mixins/modalMixin";

export default {
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: {},
      tempCoupon: {}, //主要編輯傳資料的地方在此
      due_date: "",
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
    }, //因為每次傳送的資料不太一樣，所以我們要去監聽coupon的內容有沒有更動。因此必須要設立watch將傳進來的資料this.product傳進tempProduct裡。
    //時間格式調整
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  methods: {},
  emits: ["update-coupon"],
  mixins: [modalMixin],
};
</script>

<style>
.pointer{
  cursor: pointer;
}
</style>
