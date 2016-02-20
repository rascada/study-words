<style src='./index.styl' lang='stylus'></style>
<template src='./index.jade' lang='jade'></template>
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
      state: 0,
      round: 0,
      words: [],
      strike: {},
      percent: 0,
      answer: '',
      active: null,
      correctAnsw: 0,
      availableWords: words,
      selectedWord: 'irregular',
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

    prepareWord(word) {
      let ob = {
        name: word.shift(),
        answers: word,
        user: [],
      };

      console.log(ob)
      return ob;
    },

    next(newGroup) {
      if (newGroup) {
        let word = this.selectedWords[this.active = this.randomWord()];

        this.words.$set(0, this.prepareWord(word));
      } else {
        let old = this.active;
        let word = this.selectedWords[this.active].slice();

        while (this.active == old)
          this.active = this.randomWord();

        this.words.unshift(this.prepareWord(word));
      }

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
