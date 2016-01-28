<template lang='jade'>

#score.billboard {{ correctAnsw }}/{{ round }}
#percent.billboard {{ percent }}

#screen
  #question
    ul
      li(v-for='word in words') {{ word}}
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

    words.map((elem) => elem[4] = 0);
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
      return word.replace('ü', 'u').replace('ß', 's').replace('ä', 'a').replace('ö', 'o');
    },

    next() {
      let li = document.createElement('li');
      let old = this.active;

      while (words[this.active][4] > 5 || this.active == old)
        this.active = this.randomWord();

      this.words.push(words[this.active][0]);
    },

    show(correct) {
      this.answer = '';
      let li = document.createElement('li');
      let color;

      this.round++;
      if (correct) {
        this.correctAnsw++;
        words[this.active][4]++;
        color = '#2da';
      } else {
        words[this.active][4] = 0;
        color = '#c22';
      }

      let str = '';
      for (let i = 0; i++ < words[this.active].length - 1;)
      str += `${words[this.active][i - 1]} - `;
      word.firstChild.style.background = color;
      word.firstChild.innerHTML = str;
      document.getElementById('score').innerHTML = `${this.correctAnsw}/${this.round}`;
      document.getElementById('percent').innerHTML = `${Math.round(this.correctAnsw * 100 / this.round)}%`;
      this.next();
    },
  },
};

</script>

<style lang='stylus'>

@import url('http://fonts.googleapis.com/css?family=Kelly+Slab&subset=latin,latin-ext');
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
#percent
	right 0

</style>
