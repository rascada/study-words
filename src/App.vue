<template lang="jade">
.studyWords
  nav
    h1(v-link="{ path: '/' }") słówka
    button(v-link="{ path: 'nowy' }") Dodaj nowe
    auth
  main
    router-view
</template>

<script>
import io from 'socket.io-client';
import auth from './auth';

export default {
  data() {
    return {
      socket: io('onnexus.ddns.net:4040'),
    };
  },

  components: {
    auth,
  },

  ready() {
    this.$root.socket = this.socket;
  },

  events: {
    emit(event, ...data) {
      this.socket.emit(event, ...data);
    },
  },
};

</script>

<style lang='stylus'>
@import url('http://fonts.googleapis.com/css?family=Kelly+Slab&subset=latin,latin-ext')
@import "~flexstyl/flex"

body
  font-family Kelly Slab
  background #fafafa
  height 100vh
  margin 0

.studyWords
  height 100%
  flex styl
  flex column

  nav
    flex styl
    color #fff
    align center
    justify around
    background #2da

    h1
      cursor pointer

    button
      outline none
      font-weight bold
      background none
      cursor pointer
      padding .75em .5em
      border-radius .1em
      color #fff
      border 0

      transition .3s
      &:hover
        box-shadow 0 .1em .2em rgba(#333, .5)
        background #fff
        color #2da

  main
    flex styl
    flex-grow 1
    flex center
</style>
