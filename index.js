//插件入口
console.log("vue-zoom-image");
import vueZoomImage from "./index.vue";
const _instance = {};
_instance.install = function (Vue, options) {
  Vue.component(vueZoomImage.name, vueZoomImage)
}

export default _instance;