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
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-info text-dark p-3">
            <h5 class="modal-title text-center" id="exampleModalLabel">
              <span>建立訂單-聯繫窗口填寫</span>
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
            <div class="mt-3 mb-0 row justify-content-center">
              <Form class="col" @submit="creatOrder" v-slot="{ errors }">
                <table class="table">
                  <tbody>
                    <tr class="align-middle">
                      <th width="100">
                        <label for="Email" class="form-label border-0 mb-0"
                          >Email</label
                        >
                      </th>
                      <td>
                        <Field
                          id="Email"
                          name="email"
                          type="email"
                          class="form-control form-control-sm"
                          :class="{ 'is-invalid': errors['email'] }"
                          rules="required|email"
                          v-model="form.user.email"
                        ></Field>
                        <error-message name="email" class="invalid-feedback">
                          <div class="text-danger text-end">請輸入正確信箱</div>
                        </error-message>
                      </td>
                    </tr>
                    <tr class="align-middle">
                      <th width="100">
                        <label for="name" class="form-label border-0 mb-0"
                          >姓名</label
                        >
                      </th>
                      <td>
                        <Field
                          id="name"
                          type="text"
                          name="name"
                          class="form-control form-control-sm"
                          :class="{ 'is-invalid': errors['name'] }"
                          rules="required"
                          v-model="form.user.name"
                        ></Field>
                        <error-message name="name" class="invalid-feedback">
                          <div class="text-danger text-end">此欄位必填</div>
                        </error-message>
                      </td>
                    </tr>
                    <tr class="align-middle">
                      <th>
                        <label for="tel" class="form-label border-0 mb-0"
                          >收件人電話</label
                        >
                      </th>
                      <td>
                        <Field
                          id="tel"
                          type="tel"
                          name="tel"
                          class="form-control form-control-sm"
                          :class="{ 'is-invalid': errors['tel'] }"
                          :rules="isPhone"
                          v-model="form.user.tel"
                        ></Field>
                        <error-message name="tel" class="invalid-feedback">
                          <div class="text-danger text-end">
                            {{ errors.tel }}
                          </div>
                        </error-message>
                      </td>
                    </tr>
                    <tr class="align-middle">
                      <th>
                        <label for="address" class="form-label border-0 mb-0"
                          >收件人地址</label
                        >
                      </th>
                      <td>
                        <Field
                          id="address"
                          name="address"
                          type="text"
                          class="form-control form-control-sm"
                          :class="{ 'is-invalid': errors['address'] }"
                          rules="required"
                          v-model="form.user.address"
                        ></Field>
                        <error-message name="address" class="invalid-feedback">
                          <div class="text-danger text-end">此欄位必填</div>
                        </error-message>
                      </td>
                    </tr>
                    <tr class="align-middle">
                      <th>
                        <label for="note" class="form-label border-0 mb-0"
                          >備註</label
                        >
                      </th>
                      <td>
                        <textarea
                          id="note"
                          class="form-control form-control-sm"
                          v-model="form.message"
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="modal-footer border-0 py-0">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    data-dismiss="modal"
                    @click="hideModal"
                  >
                    取消
                  </button>
                  <button class="btn btn-danger" type="submit">
                    <div
                      class="spinner-grow spinner-grow-sm"
                      v-if="this.status.loadingItem === true"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    送出訂單
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>x
  </div>
</template>

<script>
import modalMixin from "@/mixins/modalMixin";
import { isTemplateNode } from "@vue/compiler-core";
import { ITERATE_KEY } from "@vue/reactivity";
export default {
  props: {
    order: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      status: {
        loadingItem: "",
      },
    };
  },
  methods: {
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : " 請填入正確手機號碼";
    },
    creatOrder() {
      this.status.loadingItem = true;
      const order = this.form;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      this.$http
        .post(url, { data: order })
        .then(res => {
           this.status.loadingItem = false;
           this.hideModal()
          this.$router.push(`/user/checkout/${res.data.orderId}`);
          
        })
        .catch(err => {
          console.dir(err);
        });
      
    },
  },
  mixins: [modalMixin],
};
</script>
