<template lang='jade'>
.wordsCreator
  input(v-model='name' placeholder='Nazwa')
  ul
    li(v-for='word in words' track-by="$index")
      span {{ $index + 1 }}
      input(v-for='wordForm in word' track-by="$index" v-model='wordForm')
      button(@click="word.push('')") +
      button(class='remove' @click="words.splice($index, 1)") x
  div
    button(@click="words.push(['', ''])") dodaj słówko
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
      this.$dispatch('emit', 'newWords', {
        name: this.name,
        words: this.words.concat(),
      });

      this.$router.go('/');
    },
  },
};

</script>

<style lang='stylus'>
@import '~flexstyl/flex'

.wordsCreator
  margin .5em

  ul
    padding 0
    list-style-type none

    li
      flex styl
      margin .5em 0

  input
    border 0
    margin 0 .5em
    outline none
    padding .5em .25em
    box-shadow 0 .1em .2em #ddd
    color #444
    background #fff

  & > input
    box-sizing border-box
    color #fff
    font-weight bold
    width 100%
    margin 0
    padding 1em .5em
    background #2da

  span
    min-width 1.5em
    text-align center

  span, button
    background #2da
    box-shadow 0 .1em .2em rgba(#000, .4)
    border-radius .1em
    padding .5em
    color #fff

  .remove
    background indianred

  button
    border 0
    cursor pointer
    margin 0 .5em
    font-weight bold
</style>
