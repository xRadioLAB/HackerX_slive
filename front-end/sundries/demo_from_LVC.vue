<template>
  <div id="app" v-el:app>
    <video :src="videoSrc" autoplay class="video" v-el:video></video>
    <div class="img-wrap" v-show="showPicture">
      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" class="svg" v-show="showPicture">
        <polygon :points="point"
     stroke="yellow" fill="transparent" stroke-width="5"/>
      </svg>
      <img :src="dataURI" v-el:img v-show="showPicture" tra/>
    </div>
    <div class="info" v-show="showPicture">
      名称：{{data.name}}<br>
      年代：{{data.year}}<br>
      信息：{{data.info}}
    </div>
    <div class="bottom" :class="{'fullscreen-bottom': showPicture}">
      <button class="shoot"
        :class="{'btn-big': bigBtn}"
        @touchstart="shoot"
        @touchend="bigBtn = false">
        <span style="font-size:25px;color: #FFF">{{showPicture?'X':''}}</span>
      </button>
    </div>
    <button @click="fullscreen" v-show="!isFullscreen">21312414</button>
  </div>
</template>

<script>
export default {
  ready () {
    let cameraId = []
    let _this = this
    navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia)
    MediaStreamTrack.getSources(getSources)
    function getSources (sources) {
      for (let i = 0; i < sources.length; i++) {
        if (sources[i].kind === 'video') {
          cameraId.push(sources[i].id)
        }
      }
      navigator.getUserMedia({
        video: {
          optional: [{sourceId: cameraId[1]}]
        }
      }, localMediaStream => {
        _this.videoSrc = window.URL.createObjectURL(localMediaStream)
      }, err => {
        console.log(err)
      })
    }
    this.ws.onmessage = (msg) => {
      let data = JSON.parse(msg.data)
      if (data.detect) {
        this.data = data
        let points = this.data.coordinates
        const scale = 0.65
        this.point = `${points.A.x * scale} ${points.A.y * scale}, ${points.B.x * scale} ${points.B.y * scale}, ${points.C.x * scale} ${points.C.y * scale}, ${points.D.x * scale} ${points.D.y * scale}`
        this.showPicture = true
      }
    }
  },
  data () {
    return {
      videoSrc: '',
      dataURI: '',
      showPicture: false,
      ws: new WebSocket('wss://10.6.10.50:9002'),
      bigBtn: false,
      full: false,
      isFullscreen: false,
      data: {},
      point: ''
    }
  },
  methods: {
    shoot () {
      if (!this.showPicture) {
        this.bigBtn = true
        let canvas = document.createElement('canvas')
        canvas.width = this.$els.video.videoWidth
        canvas.height = this.$els.video.videoHeight
        let ctx = canvas.getContext('2d')
        ctx.drawImage(this.$els.video, 0, 0)
        let data = canvas.toDataURL('image/jpeg')
        this.dataURI = data
        this.$els.img.style.width = `${this.$els.video.videoWidth * 0.6}px`
        this.$els.img.style.height = `${this.$els.video.videoHeight * 0.6}px`
        this.ws.send(data)
      } else {
        this.showPicture = false
      }
    },
    fullscreen () {
      document.documentElement.webkitRequestFullScreen()
      this.isFullscreen = true
    }
  }
}
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100vh;
}
body {
  margin: 0;
  overflow: hidden;
}
.video {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 16vh;
  background-color: rgba(255,255,255,.4);
  backdrop-filter: blur(25px);
  transition: height .4s ease;
}
.shoot {
  position: fixed;
  bottom: 25px;
  left: 50%;
  z-index: 9999;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background-color: rgba(255, 0, 0, .6);
  border: none;
  border-radius: 50%;
  outline: none;
  transition: all 0.1s linear;
}
.btn-big {
  transform: scale3d(1.2, 1.2, 0);
  background-color: rgba(255, 0, 0, .2);
}
.fullscreen-bottom {
  height: 100vh;
  backdrop-filter: blur(10px);
}
.img {
  position: absolute;
  left: 0;
  top: 0;
}
.svg {
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
}
.img-wrap {
  z-index: 10;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #FFF;
  padding: 10px 10px;
  margin-top: 20px;
  border-radius: 6px;
   box-shadow: 0 0 10px 10px #666;
}
.info {
  position: fixed;
  padding: 10px;
  right: -10px;
  bottom: 20vh;
  z-index: 99;
  transform: rotate(90deg);
  background-color: rgba(0,0,0,0.5);
  color: #fff;
}
img {
  border-radius: 10px;
}
</style>