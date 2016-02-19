<template lang='jade'>

#screen
  h1.appName
    span Study words
    select(v-model='selectedWord' v-on:change='next')
      option(v-for='option in availableWords') {{ $key }}
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

import irregular from './words/irregular';
import regular from './words/third';
import round from 'vue-round-filter';

let words = {
  irregular,
  regular,
};

export default {
  data() {
    return {
      round: 0,
      words: [],
      percent: 0,
      answer: '',
      active: null,
      state: 0,
      availableWords: words,
      selectedWord: 'irregular',
      correctAnsw: 0,
      strike: {},
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

  computed: {
    selectedWords() {
      return words[this.selectedWord];
    },
  },

  methods: {
    randomWord() {
      return Math.floor(Math.random() * this.selectedWords.length);
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
      let word = this.selectedWords[this.active].slice();

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

    checkStrike(word) {
      let strike = word.user.every((answer, i) => answer === this.escape(word.answers[i]));

      if (strike && typeof this.strike[word.name] !== 'number')
        this.strike[word.name] = 0;

      if (strike)
        this.strike[word.name]++;
      else
        this.strike[word.name] = 0;

      if (this.strike[word.name] > 5)
        this.selectedWords.forEach(($word, i) => {
          if ($word[0] === word.name)
            this.selectedWords.splice(i, 1);
        });
    },

    almostCorrect(answer, correct) {
      let i = 0;
      let undefinedLetters = 0;
      let wrongLetters = 0;

      for (let letter of answer) {
        let correctLetter = correct[i++];

        letter !== correctLetter && wrongLetters++;
        typeof correctLetter === 'undefined' && undefinedLetters++;
      }

      return undefinedLetters === 1 || wrongLetters === 1;
    },

    show() {
      let correct = this.answer.trim().toLowerCase();
      let correctWord = this.words[0].answers[this.state];

      correctWord = this.escape(correctWord);

      if (this.almostCorrect(correct, correctWord))
        if (!confirm(`Jesteś pewny że odpowiedź to ${correct}?`)) return false;

      correct = correct == correctWord;

      this.words[0].user.push(this.answer.trim().toLowerCase());

      correct && this.correctAnsw++;
      console.log(this.answer);
      this.answer = '';
      this.round++;
      this.state++;
      if (this.state >= this.words[0].answers.length) {
        this.checkStrike(this.words[0]);
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
