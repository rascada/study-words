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
