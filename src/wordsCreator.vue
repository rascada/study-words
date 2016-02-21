<template lang='jade'>
.wordsCreator
  input(v-model='name')
  ul
    li(v-for='word in words' track-by="$index")
      span {{ $index + 1 }}
      input(v-for='wordForm in word' track-by="$index" v-model='wordForm')
      button(@click="word.push('')") +

  button(@click="words.push(['', ''])") dodaj
  button(@click='send') zapisz
</template>

<script>
export default {
  data() {
    return {
      name: '',
      words: [['', '']],
    };
  },

  methods: {
    send() {
      this.$parent.socket.emit('newWords', {
        name: this.name,
        words: this.words.concat(),
      });
    },
  },
};

</script>

<style lang='stylus'>
.wordsCreator
  margin .5em
  ul
    padding 0
    list-style-type none

  input
    box-shadow 0 .1em .2em #ddd
    color #444
    background #fff
</style>
