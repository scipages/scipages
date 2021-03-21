<template>
  <div class="loading">
    <div class="vertical-center">
      <q-spinner-bars
        color="white"
        size="2em"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 9999;
  .vertical-center {
    display: flex;
    margin: 0 auto;
  }
}
</style>
