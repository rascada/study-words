import Vue from 'vue';
import VueRouter from 'vue-router';
import routerConfig from './router.config';
import studyWords from './App.vue';
const StudyWords = Vue.extend(studyWords);

if (process.env.NODE_ENV != 'production')
  Vue.config.debug = true;

Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
});

routerConfig(router)
  .start(StudyWords, '#study');
