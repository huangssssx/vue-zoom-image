<template>
  <div ref="zoomShell" class="zoom_image_container" v-bind="$props">
    <slot name="content" />
    <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
      <div class="zoomShellMask " v-show="dialogVisible" @click="closeHandler">
          <img :width="imageWidth" :src="currentImgPath" @mousewheel="mouseWheelHandler" @load="imageLoadedHandler">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name:"vue-zoom-image",
  data() {
    return {
      dialogVisible: false,
      currentImgPath: '',
      imageWidth: 0,
      originWidth: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.zoomShell.addEventListener('click', (event) => {
        if (event.target.nodeName === 'IMG') {
          this.currentImgPath = event.target.src;
          this.dialogVisible = true;
        }
      });
    });
  },
  methods: {
    imageLoadedHandler(event) {
      // this.imageHeight = event.target.naturalHeight;
      this.originWidth = this.imageWidth = event.target.naturalWidth;
    },
    closeHandler(event) {
      if (event.target.nodeName === 'IMG') {
        return;
      }
      setTimeout(()=>{
      this.currentImgPath = '';
      
      },1000)
      this.dialogVisible = false;
    },
    mouseWheelHandler(event) {
      const step = 20;
      // 滚轮向下
      if (event.wheelDeltaY > 0) {
        if (this.imageWidth <= this.originWidth) {
          this.imageWidth = this.originWidth;
          return;
        }
        this.imageWidth -= step;
      } else {
        this.imageWidth += step;
        this.imageWidth = this.imageWidth>=1000?1000:this.imageWidth;
      }
    }
  }
};
</script>

<style lang="scss">
@import url("./animation.css");
.zoom_image_container{
  .zoomShellMask{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 200001;
    margin: 0px;
    background: rgba(0, 0, 0, 0.5);
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    img{
      max-width: 1000px;
    }
  }

 
}

</style>
