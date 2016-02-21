<template lang='jade'>
.wordsList
  ul
    li(v-for='words in wordsList' @click='active = $index') {{ words.name }}
</template>

<script>
export default {
  data() {
    return {
      wordsList: [],
      active: null,
    };
  },

  watch: {
    active() {
      this.$dispatch('changeWords', this.wordsList[this.active]);
    },
  },

  ready() {
    this.$parent.socket.emit('wordsList');
    this.$parent.socket.on('wordsList', wordsList => this.wordsList = wordsList);
  },
};

</script>

<style lang='stylus'>
.wordsList
  ul
    list-style-type none
    padding 0

    li
      cursor pointer
      margin .25em
      padding .5em
      background teal
      color #fff
</style>
