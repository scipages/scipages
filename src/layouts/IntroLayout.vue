<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered>
      <TitleBar></TitleBar>
    </q-header>

    <q-footer class="bg-grey-2" bordered>
      <Footer></Footer>
    </q-footer>

    <q-page-container class="absolute-full">
      <div class="row fit">
        <div class="col-6 q-pa-xl" style="position: relative">
          <div class="text-center vertical-center">
            SciPages
          </div>
        </div>
        <div class="col-6">
          <!--<q-scroll-area class="fit" style="border: 1px solid red">-->
          <q-scroll-area class="fit">
            <q-page class="row justify-evenly">
              <router-view />
            </q-page>
          </q-scroll-area>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TitleBar from 'components/TitleBar.vue'
import Footer from 'components/main-layout/Footer.vue'

export default defineComponent({
  name: 'IntroLayout',

  components: {
    TitleBar,
    Footer
  }
})
</script>

<style scoped lang="scss">
.q-header--bordered {
  border-bottom-color: #cbcbcb !important;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
