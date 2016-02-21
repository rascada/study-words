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
