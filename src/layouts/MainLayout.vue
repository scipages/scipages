<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <TitleBar></TitleBar>
      <!--<MenuBar></MenuBar>-->
      <!--<MainToolBar v-if="showMainToolBar"></MainToolBar>-->
    </q-header>

    <q-footer class="bg-grey-2" bordered>
      <Footer></Footer>
    </q-footer>

    <LeftDrawer></LeftDrawer>

    <RightDrawer v-bind:show="showRightDrawer"></RightDrawer>

    <q-page-container class="absolute-full">
      <div class="row fit">
        <!--<q-scroll-area class="fit" style="border: 1px solid red">-->
        <q-scroll-area class="fit">
          <q-page class="row justify-evenly">
            <!--<q-btn v-on:click="showRightDrawer=showRightDrawer ? false : true">Toggle Right Drawer</q-btn>-->
            <router-view />
          </q-page>
        </q-scroll-area>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TitleBar from 'components/main-layout/TitleBar.vue'
// import MenuBar from 'components/main-layout/MenuBar.vue'
// import MainToolBar from 'components/main-layout/MainToolBar.vue'
import Footer from 'components/main-layout/Footer.vue'
import LeftDrawer from 'components/main-layout/LeftDrawer.vue'
import RightDrawer from 'components/main-layout/RightDrawer.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    TitleBar,
    // MenuBar,
    // MainToolBar,
    Footer,
    LeftDrawer,
    RightDrawer
  },

  setup () {
    // const showMainToolBar = ref(false)
    const showRightDrawer = ref(true)
    return {
      // showMainToolBar,
      showRightDrawer
    }
  }
})
</script>

<style lang="scss">
</style>
