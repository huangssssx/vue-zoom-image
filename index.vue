<template>
  <div ref="zoomShell" class="zoom_image_container" v-bind="$props" >
    <slot name="content" />
    <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
      <div class="zoomShellMask " v-show="dialogVisible" @click="closeHandler" @scroll.prevent  @mousewheel="maskMouseWheelHandler">
          <img :width="imageWidth" :height="imageHeight" :src="currentImgPath" @mousewheel="mouseWheelHandler" @load="imageLoadedHandler">
      </div>
    </transition>
  </div>
</template>

<script>
import { currentOs } from "./utils";
export default {
  name:"vue-zoom-image",
  data() {
    return {
      dialogVisible: false,
      currentImgPath: '',
      imageWidth: 0,
      imageHeight:0,
      originWidth: 0,
      os:currentOs(),
      wheelState:"",
      zoomSide:"",//是缩放width，还是height
      originHeight:0,
      originWidth:0,
      maxSideSize:0,
      MAX_SIDE:800,
      MIN_SIDE:100,
    };
  },
  watch:{
    dialogVisible:function(value){
      if(value){
        document.body.classList.add("zoom_image_hidden_body_overflow");
      }
      else{
        document.body.classList.remove("zoom_image_hidden_body_overflow");
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.zoomShell.addEventListener('click', (event) => {
        if (event.target.nodeName === 'IMG') {
          this.currentImgPath = event.target.src;
          setTimeout(() => {
             this.dialogVisible = true;
          }, 0);
        }
      });
    });
  },
  methods: {
    maskMouseWheelHandler(event){
      event.stopPropagation();
    },
    imageLoadedHandler(event) {
      this.originHeight = event.target.naturalHeight;
      this.originWidth = event.target.naturalWidth;
      //判断对哪个边进行缩放
      this.zoomSide = this.originWidth>this.originHeight?"Width":"Height";
      if(this.zoomSide ==='Width'){
        this.MAX_SIDE = 1200;
        this.MIN_SIDE = 200;
        this.imageWidth = this.originWidth>this.MAX_SIDE?this.MAX_SIDE-200:this.originWidth;
        this.imageHeight = "auto";
      }
      else{
        this.MAX_SIDE = 800;
        this.MIN_SIDE = 200;
        this.imageHeight = this.originHeight>this.MAX_SIDE?this.MAX_SIDE-200:this.originHeight;
        this.imageWidth  = "auto";
      }

    },
    closeHandler(event) {
      if (event.target.nodeName === 'IMG') {
        return;
      }
      this.dialogVisible = false;
      // this.currentImgPath = '';
    },
    mouseWheelHandler(event) {
      const step = 20;
      let {zoomSide,MAX_SIDE,MIN_SIDE} = this;
      // const maxSide = zoomSide==='Width'?this.MAX_WIDTH:this.MAX_HEIGHT;
      //区分滚轮在不同系统下的状态
      if(this.os === 'mac'){
        this.wheelState = event.wheelDeltaY > 0?"down":"up";
      }
      else{
        this.wheelState = event.wheelDeltaY > 0?"up":"down";
      }

      //滚轮下滑
      if (this.wheelState === "down") {
        if(this[`image${zoomSide}`]<MIN_SIDE){
          return;
        }
        this[`image${zoomSide}`]  -= step;
      } 
      //滚轮上滑
      else {
        if(this[`image${zoomSide}`]>MAX_SIDE){
          return;
        }
        this[`image${zoomSide}`]  += step;
      }
    }
  }
};
</script>

<style lang="scss">
@import url("./animation.css");
.zoom_image_hidden_body_overflow{
  overflow: hidden;
}

// .zoom_image_pointer{
//   cursor: pointer;
// }

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
      // max-width: 1000px;
      // max-height: 600px;
      // min-width: 50px;
      // min-height: 30px;
    }
  }

 
}

</style>
