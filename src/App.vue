<template lang='jade'>

#screen
  h1.appName
    span Study words
    span {{ correctAnsw }}/{{ round }}
    span {{ (correctAnsw * 100) / round || 0 | round 2 }}%
  #question
    ul
      li(v-for='word in words')
        .answer(v-show='word.user.length')
          span {{ word.name }}
          span(
            v-for='answer in word.answers'
            v-show='word.user.length > $index'
            v-bind:style="{ color: escape(answer) == word.user[$index] ? '#2da' : '#c22' }"
            )
            {{ answer }}
        span(v-else) {{ word.name }}
  input(v-model='answer' @keydown.enter='handleAnswer')

</template>

<script>

import words from './words/second';
import round from 'vue-round-filter';

export default {
  data() {
    return {
      round: 0,
      words: [],
      percent: 0,
      answer: '',
      active: null,
      state: 0,
      correctAnsw: 0,
    };
  },

  filters: {
    round,
  },

  ready() {
    Object.assign(this, localStorage);
    this.active = this.randomWord();
    this.next();
  },

  methods: {
    randomWord() {
      return Math.floor(Math.random() * words.length);
    },

    escape(word) {
      if (!word)
        return 'bład';

      return word
        .replace('ü', 'u')
        .replace('ß', 's')
        .replace('ä', 'a')
        .replace('ö', 'o');
    },

    next() {
      let old = this.active;
      let word = words[this.active].slice();

      while (this.active == old)
        this.active = this.randomWord();

      this.words.unshift({
        name: word.shift(),
        answers: word,
        user: [],
      });

      this.state = 0;
    },

    handleAnswer() {
      this.show();
    },

    show() {
      let correct = this.answer.trim().toLowerCase();
      let correctWord = this.words[0].answers[this.state];

      correct = correct == this.escape(correctWord);

      this.words[0].user.push(this.answer.trim().toLowerCase());

      correct && this.correctAnsw++;
      this.answer = '';
      this.round++;
      this.state++;

      if (this.state > 2) {
        Object.assign(localStorage, {
          correctAnsw: this.correctAnsw,
          round: this.round,
        });
        this.next();
        return false;
      }
    },
  },
};

</script>

<style lang='stylus'>

@import url('http://fonts.googleapis.com/css?family=Kelly+Slab&subset=latin,latin-ext')
@import "~flexstyl/index"

.answer
  @extend .flex, .around

*
  box-sizing border-box

.appName
  display flex
  justify-content space-between
  background #2da
  padding .25em
  color #fff
  margin 0

body
  font-family Kelly Slab
  background #fafafa
  margin 0
  height 100vh
  display flex
  flex-flow column
  align-items center
  justify-content center

#screen
  background #fff
  width 50em
  display flex
  flex-flow column
  box-shadow 0 .25em .3em rgba(0,0,0,.25)

#question
  padding .75em 2em
  ul
    list-style-type none
    padding 0
    overflow-y scroll
    max-height 55vh
    padding .5em 0

    & li
      padding .5em .25em
      &:first-child
        text-align center
        font-weight 600
        font-size 2em

input
  border 0
  height 2.25em
  background #2da
  padding .2em .1em
  text-align center
  color #efefef
  font-size 1.2em
  &:focus
    outline none

</style>
