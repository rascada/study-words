<style lang='stylus'>
@import '~flexstyl/flex'

.auth
  .login
    flex styl

    .actions
      flex styl
      justify around

  button
    border 0
    background #fff
    color #2da
    cursor pointer
    padding .5em .75em
    margin .25em

  input
    border .1em solid transparent
    margin .25em
    outline none
    padding .5em
    border-radius .2em
    box-shadow 0 .1em .2em rgba(#000, .25)

  .error
    color red
    border .1em solid red

  .logged
    flex styl
    align center

    & > *
      margin 0 .25em

</style>

<template lang='jade'>

.auth
  .login(v-show='!authName' v-on:keydown.enter="auth()")
    input(
      v-model='username'
      placeholder='username'
      v-bind:class='{ error: error == 1 || error == 3 }'
    )

    input(
      type='password'
      v-model='password'
      placeholder='password'
      v-bind:class='{ error: error == 2 }'
    )
    .actions
      button(@click='auth()') login
      button(@click='auth(true)') register

  .logged(v-show='authName')
    h1 {{ authName }}
    button(v-on:click='logout') logout

</template>

<script>
export default {
  data() {
    return {
      error: '',
      authName: '',
      username: '',
      password: '',
    };
  },

  methods: {
    auth(register) {
      this.$parent.socket.emit(register ? 'register' : 'login', {
        username: this.username,
        password: this.password,
      });
    },

    logout() {
      this.$parent.socket.emit('logout');
      this.authName = '';
    },
  },

  ready() {
    this.$parent.socket.on('authError', err => this.error = err);
    this.$parent.socket.on('user', user => {
      this.authName = user.name;
      ['error', 'username', 'password']
        .forEach(prop => this[prop] = null);
    });
  },
};

</script>
