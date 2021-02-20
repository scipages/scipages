<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered>
      <TitleBar></TitleBar>
      <!--<MenuBar></MenuBar>-->
      <MainToolBar v-model:show="showMainToolBar"></MainToolBar>
    </q-header>

    <q-footer class="bg-grey-2" bordered>
      <Footer></Footer>
    </q-footer>

    <LeftDrawer v-model:show="showLeftDrawer"></LeftDrawer>

    <RightDrawer v-model:show="showRightDrawer"></RightDrawer>

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
import { defineComponent, ref } from 'vue'
import TitleBar from 'components/TitleBar.vue'
// import MenuBar from 'components/main-layout/MenuBar.vue'
import MainToolBar from 'components/main-layout/MainToolBar.vue'
import Footer from 'components/main-layout/Footer.vue'
import RightDrawer from 'components/main-layout/RightDrawer.vue'
import LeftDrawer from 'components/main-layout/LeftDrawer.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    TitleBar,
    // MenuBar,
    MainToolBar,
    Footer,
    RightDrawer,
    LeftDrawer
  },

  setup () {
    const showMainToolBar = ref(true)
    const showLeftDrawer = ref(true)
    const showRightDrawer = ref(true)
    return {
      showMainToolBar,
      showLeftDrawer,
      showRightDrawer
    }
  }
})
</script>

<style scoped lang="scss">
.q-header--bordered {
  border-bottom-color: #cbcbcb !important;
}
</style>
