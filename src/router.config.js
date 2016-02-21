export default function(router) {
  router.map({
    '/': {
      component(resolve) {
        require(['./views/wordsList'], resolve);
      },
    },

    '/nowy': {
      component(resolve) {
        require(['./views/wordsCreator'], resolve);
      },
    },
  });

  return router;
};
