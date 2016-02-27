<template lang='jade'>
  button(@click='requestAds') add ad
  video(v-el:video)
    source(src="http://rmcdn.2mdn.net/Demo/vast_inspector/android.mp4")
    source(src="http://rmcdn.2mdn.net/Demo/vast_inspector/android.webm")
  .ad(v-el:ad)
</template>

<style lang='stylus'>
</style>

<script>
  export default {
    data() {
      return {
        loader: null,
        request: null,
        manager: null,
      };
    },

    ready() {
      let adCont = new google.ima.AdDisplayContainer(this.$els.ad, this.$els.video);

      adCont.initialize();
      this.loader = new google.ima.AdsLoader(adCont);
      this.loaderEvents(this.loader);

      this.$els.video.onended = _ => this.loader.contentComplete();

      this.request = new google.ima.AdsRequest();
      this.request.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
          'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
          'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
          'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';

      this.request.linearAdSlotWidth = 640;
      this.request.linearAdSlotHeight = 400;
      this.request.nonLinearAdSlotWidth = 640;
      this.request.nonLinearAdSlotHeight = 150;
    },

    methods: {
      loaderEvents(loader) {
        loader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            this.onAdsManagerLoaded, false);

        loader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            this.onAdError, false);
      },

      onAdError(adErrorEvent) {
        console.log(adErrorEvent.getError());
        this.manager.destroy();
      },

      requestAds() {
        this.loader.requestAds(this.request);
      },

      onContentPauseRequested() {
        this.$els.video.removeEventListener('ended', contentEndedListener);
        this.$els.video.pause();
      },

      onContentResumeRequested() {
        this.$els.video.addEventListener('ended', contentEndedListener);
        this.$els.video.play();
      },

      onAdsManagerLoaded(adsManagerLoadedEvent) {
        this.manager = adsManagerLoadedEvent.getAdsManager(this.$els.video);

        this.manager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            this.onAdError);

        this.manager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            this.onContentPauseRequested);

        this.manager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            this.onContentResumeRequested);

        try {
          this.manager.init(640, 360, google.ima.ViewMode.NORMAL);
          this.manager.start();
        } catch (adError) {}
      },
    },
  };

</script>
