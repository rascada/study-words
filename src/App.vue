<template lang='jade'>

.billboard {{ correctAnsw }}/{{ round }}
.right.billboard {{ percent }}

#screen
  #question
    ul
      li(v-for='word in words' v-bind:style="{ 'color': word.color }")
        .answer(v-show='word.color')
          span(v-for='answer in word.answers') {{ answer }}
        span(v-else) {{ word.answers[0] }}
  input(v-model='answer' @keydown.enter='try')

</template>

<script>

import words from './words/second';

export default {
  data() {
    return {
      round: 0,
      words: [],
      percent: 0,
      answer: '',
      active: null,
      correctAnsw: 0,
    };
  },

  ready() {
    this.active = this.randomWord();
    [this.round, this.correctAnsw] = [0, 0];

    this.next();
  },

  methods: {
    try() {
      console.log(this.answer);
      this.show(this.answer.trim().toLowerCase() == this.escape(words[this.active][1]));
    },

    randomWord() {
      return Math.floor(Math.random() * words.length);
    },

    escape(word) {
      return word
        .replace('ü', 'u')
        .replace('ß', 's')
        .replace('ä', 'a')
        .replace('ö', 'o');
    },

    next() {
      let old = this.active;

      while (this.active == old)
        this.active = this.randomWord();

      this.words.unshift({
        answers: words[this.active],
        color: null,
      });
    },

    show(correct) {
      this.answer = '';
      this.round++;

      let color;
      if (correct) {
        this.correctAnsw++;
        color = '#2da';
      } else
        color = '#c22';

      this.words[0].color = color;

      this.percent = `${ Math.round(this.correctAnsw * 100 / this.round) }%`;
      this.next();
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
		width 30em
		height 20em
		display flex
		flex-flow column
		box-shadow 0 .2em 0.1em rgba(0,0,0,.25)
		#question
			padding .75em 2em
			height 85%
			ul
				list-style-type none
				padding 0
				height 95%
				overflow-y scroll
				padding .5em 0
				& li
					padding .5em .25em
					&:first-child
						text-align center
						font-size 1.2em
		input
			border 0
			height 15%
			background #2da
			padding .2em .1em
			text-align center
			color #efefef
			font-size 1.2em
			&:focus
				outline none
.billboard
	position absolute
	top 0
	padding 1em
	font-size 2em
	color #444
.right
	right 0

</style>
