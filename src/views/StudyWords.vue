<style src='./index.styl' lang='stylus'></style>
<template src='./index.jade' lang='jade'></template>
<script>

import round from 'vue-round-filter';
import words from './words-loader';

export default {
  data() {
    return {
      state: 0,
      round: 0,
      user: '',
      words: [],
      strike: {},
      percent: 0,
      answer: '',
      active: null,
      correctAnsw: 0,
      selectedWords: {},
    };
  },

  filters: {
    round,
  },

  ready() {
    words(this, ::this.next);

    Object.assign(this, localStorage);
  },

  methods: {
    randomWord() {
      return Math.floor(Math.random() * this.selectedWords.words.length);
    },

    escape(word) {
      if (!word)
        return 'bład';

      const illegalSigns = {
        'ä': 'a',
        'ö': 'o',
        'ü': 'u',
        'ß': 's',
      };

      return word.replace(/[öäüÖÄÜß ]/g,
        match => illegalSigns[match]);
    },

    prepareWord(words) {
      words = words.concat();

      let ob = {
        name: words.shift(),
        answers: words,
        user: [],
      };

      return ob;
    },

    resetScore() {
      ['correctAnsw', 'round']
        .forEach(val => this[val] = 0);
    },

    drawUntilNew() {
      let old = this.active;
      let isDrawable = this.selectedWords.words.length > 1;

      if (isDrawable) while (this.active === old)
        this.active = this.randomWord();
      else this.active = 0;
    },

    next(words) {
      if (words) this.selectedWords = words;

      this.drawUntilNew();

      let word = this.selectedWords.words[this.active].slice();

      this.words.unshift(this.prepareWord(word));
      this.state = 0;
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

    checkWord(word) {
      if (this.state >= word.answers.length) {
        this.checkStrike(word);
        this.next();

        Object.assign(localStorage, {
          correctAnsw: this.correctAnsw,
          round: this.round,
        });

        return false;
      }
    },

    show() {
      let word = this.words[0];
      let answer = this.answer.trim().toLowerCase();
      let correct = this.escape(word.answers[this.state]);
      let isCorrect = correct === answer;

      if (!answer) return;

      if (this.almostCorrect(answer, correct))
        if (!confirm(`Jesteś pewny że odpowiedź to ${answer}?`))
          return false;

      word.user.push(answer);
      console.log(answer);
      this.answer = '';

      this.round++;
      this.state++;
      isCorrect
        && this.correctAnsw++;

      return this.checkWord(word);
    },
  },
};

</script>
