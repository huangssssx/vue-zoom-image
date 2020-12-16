# vue-zoom-image使用说明
## 1. 使用场景
1. 在文档中（html dom）有图片，希望图片可以点击后出现放大图像。
2. 在vue中使用（vue version > 2.0）
3. 希望滚动鼠标中键对图片进行放大缩小。

## 2. 如何使用
- npm i vue-zoom-image --save
- 在项目中注册
```javascript
import vueZoomImage from 'vue-zoom-image';
Vue.use(vueZoomImage);
```
- 在vue中使用
```javascript
<vue-zoom-image>
  <div slot="content" class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</vue-zoom-image>

```

- 注意事项：
  1. vue-zoom-image标签中需要包含一个slot="content"的容器。控件将通过它获取标签中包含的文章内容，如果没有设置组件将不起作用。

  2. 组件中包含了animation.css，请注意。

3. 效果：
![preview.png](https://i.loli.net/2020/12/16/4re1l8YxN5EMmfQ.png)