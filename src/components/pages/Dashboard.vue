<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
          <Sidebar />
           <main role="main" class="col-md-9 ms-sm-auto col-lg-10 px-4">
              <ToastMessages  class="mt-1"/>
              <router-view></router-view>
           </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import ToastMessages from "@/components/ToastMessages.vue";

import emitter from "@/methods/emitter";
import pushMsgState from "@/methods/pushMsgState";

export default {
  components: {
    Sidebar,
    Navbar,
    ToastMessages
  },
  provide() {
    return {
      emitter,
      pushMsgState
    }
  }
};
</script>
