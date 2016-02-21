<template lang='jade'>
.wordsList
  ul
    li(v-for='words in wordsList')
      span(@click='active = $index') {{ words.name }}
      button(@click='remove(words)') x
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

  methods: {
    remove(words) {
      this.$parent.socket.emit('deleteWordsList', words._id);
    },
  },

  ready() {
    this.$parent.socket.emit('wordsList');
    this.$parent.socket.on('wordsList', wordsList => this.wordsList = wordsList);
    this.$parent.socket.on('removedWordsList', id =>
      this.wordsList = this.wordsList.filter(words => words._id !== id)
    );
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
