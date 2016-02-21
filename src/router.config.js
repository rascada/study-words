export default function(router) {
  router.map({
    '/:words': {
      component(resolve) {
        require(['./views/StudyWords'], resolve);
      },
    },

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
