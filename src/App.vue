<template>
    <div id="app">{{name}}</div>
</template>

<script>
export default {
    data () {
        return {
            name: "ivan"
        }
    }
}
</script>

<style lang="scss">
@import '@/common/scss/index.scss';
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
