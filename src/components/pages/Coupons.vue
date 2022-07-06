<template>
<Loading :active="isLoading"/>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的優惠卷
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="150">名稱</th>
          <th width="150">折扣碼</th>
          <th width="180">折扣百分比</th>
          <th width="180">到期日</th>
          <th width="120">是否啟用</th>
          <th width="70">編輯</th>
          <th width="70">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ date(item.due_date) }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                :id="item.id"
                :true-value="1"
                :false-value="0"
                v-model="item.is_enabled"
              />
              <label
                class="form-check-label text-primary"
                :for="item.id"
                v-if="item.is_enabled == 1"
                >啟用</label
              >
              <label class="form-check-label" :for="item.id" v-else
                >不啟用</label
              >
            </div>
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
    <Pagination class="mt-5" :pages="pagination" @emit-page="getData"/>
  </div>
  <CouponModal
    ref="couponModal"
    :coupon="tempCoupon"
    @update-coupon="updateCoupon"
  ></CouponModal>
  <DelModal ref="delModal" @del-item="delCoupon" :item="tempCoupon">
  <span>優惠卷</span>
  </DelModal>
</template>

<script>
import { date } from "@/methods/filters"; //套用日期轉換
import CouponModal from "@/components/CouponModal.vue";
import DelModal from "@/components/DelModal.vue";
import Pagination from "@/components/Pagination.vue"

export default {
  data() {
    return {
      pagination: 1,
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      pagination: ''
    };
  },
  components: {
    CouponModal,
    DelModal,
    Pagination
  },
  inject: ['pushMsgState'],
  methods: {
    date,
    getData(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      this.isLoading = true
      const vm = this;
      this.$http.get(api).then(response => {
        this.isLoading = false
        console.log(response)
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    updateCoupon(item) {
      this.tempCoupon = item;
      //新增
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post";

      //編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`;
        httpMethod = "put";
      }
      const vm = this;
      const couponComponent = this.$refs.couponModal;
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        if (response.data.success) {
          couponComponent.hideModal();
          this.getData();
          this.pushMsgState.MsgNotice(response)
        }
      });
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (isNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = { 
          ...item,
          due_date: this.$filters.date(item.due_date).replace('/', '-').replace('/', '-')
         };
      }
      const couponComponent = this.$refs.couponModal;
      couponComponent.showModal();
    },
    //刪除
    openDelModal(item) {
      this.tempCoupon = item;
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          this.getData();
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.pushMsgState.MsgNotice(response)
        }
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
