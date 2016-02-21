<template lang="jade">
.studyWords
  nav
    h1 słówka
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
      socket: io('localhost:4040'),
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

  main
    flex styl
    flex-grow 1
    flex center
</style>
