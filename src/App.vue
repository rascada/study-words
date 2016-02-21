<template lang="jade">
.studyWords
  h1 siema
  router-view
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket: io('localhost:4040'),
    };
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
  margin 0
  height 100vh
  display flex
  flex-flow column
  align-items center
  justify-content center
</style>
