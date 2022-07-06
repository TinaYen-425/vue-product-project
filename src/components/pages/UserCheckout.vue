<template>
  <div>
    <div class="my-5 row justify-content-center">
      <form class="col-8" @submit.prevent="payOrder">
        <table class="table align-middle">
          <thead>
            <th>#ID</th>
            <th>購買明細</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody v-for="(item, key) in order.user.products" :key="item.id">
            <tr>
              <td>{{ key }}</td>
              <td>{{ item.product.title }}</td>
              <td>{{ item.qty }} / {{ item.product.unit }}</td>
              <td class="text-end">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td colspan="2" class="text-end">總計NT$</td>
              <td class="text-end">{{ $filters.currency(total) }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody v-if="order.user.id">
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="order.user.is_paid == false">尚未付款</span>
                <span class="text-success" v-else> {{ date(order.user.paid_date) }} 付款已完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-end" v-if="order.user.is_paid !== true">
          <button class="btn btn-danger" type="submit">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { date } from "@/methods/filters"; //套用日期轉換

export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {},
        // products: {},
      },
      total: "",
    };
  },
  methods: {
    date,
    getOrder() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.orderId}`;
      this.$http
        .get(url)
        .then(res => {
          if (res.data.success) {
            this.order.user = res.data.order;
            this.total = res.data.order.total;
          }
        })
        .catch(err => {
          console.dir(err);
        });
    },
    payOrder() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.orderId}`;
      this.$http.post(url).then(res => {
        if (res.data.success){
          this.getOrder()
        }
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
