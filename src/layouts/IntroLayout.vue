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
          <div class="q-pa-xl text-center vertical-center">
            <div class="welcome-text-title">Welcome to SciPages</div>
            <div class="welcome-text-subtitle">CMS and Static Site Generator for academic websites</div>
            <div class="welcome-text-icons">
              <q-btn flat round size="17px" padding="13px" icon="fas fa-book" title="Documentation" v-on:click="openURL('https://scipages.github.io/')" />
              <q-btn flat round size="20px" padding="10px" icon="fab fa-github" title="GitHub" v-on:click="openURL('https://github.com/scipages/scipages')" />
              <q-btn flat round size="20px" padding="10px" icon="bug_report" title="Report Issue" v-on:click="openURL('https://github.com/scipages/scipages/issues')" />
              <q-btn flat round size="20px" padding="10px" icon="update" title="Check for Updates" />
              <q-btn flat round size="20px" padding="10px" icon="info" title="About" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <!--<q-scroll-area class="fit" style="border: 1px solid red">-->
          <q-page class="row justify-evenly">
            <div class="websites-wrapper">
              <router-view />
            </div>
          </q-page>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TitleBar from 'components/TitleBar.vue'
import Footer from 'components/main-layout/Footer.vue'
import useMainWindow from 'src/use/useMainWindow'

export default defineComponent({
  name: 'IntroLayout',

  components: {
    TitleBar,
    Footer
  },

  setup () {
    const { openURL } = useMainWindow()

    return {
      openURL
    }
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
  //left: 50%;
  //-ms-transform: translate(-50%, -50%);
  //transform: translate(-50%, -50%);
  left: 0;
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 100%;
  .welcome-text-title {
    font-size: 32px;
  }
  .welcome-text-subtitle {
    padding-top: 15px;
  }
  .welcome-text-icons {
    padding-top: 15px;
  }
}
.websites-wrapper {
  width: 100%;
}
</style>
