<template lang='jade'>
.wordsList
  ul
    li(v-for='words in wordsList')
      span(@click='go(words)') {{ words.name }}
      button(@click='remove(words)') x
</template>

<script>
export default {
  data() {
    return {
      wordsList: [],
    };
  },

  methods: {
    go(words) {
      this.$router.go(words.name);
    },

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
@import '~flexstyl/flex'
.wordsList
  ul
    list-style-type none
    padding 0

    li
      flex styl
      align stretch
      margin .5em 0

      span, button
        font-weight bold
        cursor pointer
        padding .5em
        color #fff

      span
        flex grow
        background #2da
        text-align center

      button
        border 0
        outline none
        background indianred
</style>
