<template lang='jade'>

#score.billboard 0/0
#percent.billboard 0%
#screen
  #question
    ul#word
  input#answer

</template>

<script>

import words from './words/second';

export default {
  ready() {
    this.answer =  document.getElementById('answer');
    this.word = document.getElementById('word');
    this.active = Math.floor(Math.random() * words.length);
    [this.round, this.correctAnsw] = [0, 0];

    words.map((elem) => elem[4] = 0);
    this.next();
    answer.onkeydown = (key) => {
      if (key.which == 13) {
        console.log(answer.value);
        this.show(answer.value.trim().toLowerCase() == words[this.active][1].replace('ü', 'u').replace('ß', 's').replace('ä', 'a').replace('ö', 'o'));
      }
    };
  },

  methods: {
    show(correct) {
      answer.value = '';
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

    next() {
      let li = document.createElement('li');
      let old = this.active;

      while (words[this.active][4] > 5 || this.active == old) {
        console.log(words[this.active][4]);
        this.active = Math.floor(Math.random() * words.length);
      }

      li.innerHTML = words[this.active][0];
      word.insertBefore(li, word.firstChild);
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
			#word
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
