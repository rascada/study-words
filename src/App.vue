<template lang="jade">

.studyWords
  link(href='https://fonts.googleapis.com/css?family=Kelly+Slab&subset=latin,latin-ext' rel='stylesheet' type='text/css')
  nav
    h1(v-link="{ path: '/' }") słówka
    button(v-link="{ path: 'nowy' }") Dodaj nowe
    auth

  //ad

  main
    router-view

</template>

<script>
import io from 'socket.io-client';
import auth from './auth';
import ad from './ad';

export default {
  data() {
    return {
      socket: io('https://server.slowka.xyz', { path: '/' }),
    };
  },

  components: {
    auth,
    ad,
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
@import "~flexstyl/flex"

*
  font-family Kelly Slab

body
  background #fafafa
  height 100vh
  margin 0

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

.studyWords
  height 100%
  flex styl
  flex column


  input::placeholder
    color #2da - 20%

  nav
    flex styl
    color #fff
    align center
    justify around
    background #2da

    h1
      cursor pointer

  main
    flex styl
    flex-grow 1
    flex center
</style>
