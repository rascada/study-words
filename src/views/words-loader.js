export default function(vue, cb) {
  vue.$dispatch('emit', 'words', vue.$route.params.words);

  vue.$root.socket.on('words', words => {
    if (false) {
      vue.$router.go('/nowy');
      return false;
    }

    cb(words);
  });
}
