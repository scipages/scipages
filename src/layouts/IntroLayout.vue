<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <TitleBar></TitleBar>
    </q-header>

    <q-footer class="bg-grey-2" bordered>
      <Footer></Footer>
    </q-footer>

    <q-page-container class="absolute-full">
      <div class="row fit">
        <!--<q-scroll-area class="fit" style="border: 1px solid red">-->
        <q-scroll-area class="fit">
          <q-page class="row justify-evenly">
            <router-view />
          </q-page>
        </q-scroll-area>
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

<style lang="scss">
</style>
