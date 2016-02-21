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
      this.$dispatch('emit', 'deleteWordsList', words._id);
    },

    socket(socket) {
      socket.on('newWords', words => this.wordsList.push(words));
      socket.on('wordsList', wordsList => this.wordsList = wordsList);
      socket.on('removedWordsList', id =>
        this.wordsList = this.wordsList.filter(words => words._id !== id)
      );
    },
  },

  ready() {
    this.socket(this.$root.socket);
    this.$dispatch('emit', 'wordsList');
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
