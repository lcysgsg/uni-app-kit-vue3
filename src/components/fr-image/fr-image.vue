<template>
  <view class="fr_img">
    <!-- 主图 -->
    <image
      class="fr_img_content"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      :webp="webp"
      :show-menu-by-longpress="showMenuByLongpress"
      @error="onImgError"
      @load="onImgLoad"
    />
    <view v-if="loading_complete && completeTransition" class="loading_complete_transition"></view>

    <!-- 加载失败图 -->
    <view v-if="loading_error" class="loading_error">
      <image class="loading_error_img" :src="loadingErrorImg" mode="aspectFit"></image>
    </view>

    <!-- 加载中图 -->
    <view v-else-if="!loading_complete" class="loading">
      <image
        v-if="loadingIngImg == 'two-balls'"
        class="loading_img"
        :src="require('./loading_two_balls.gif')"
        mode="aspectFit"
      ></image>
      <view v-if="loadingIngImg == 'oblique-light'" class="loading_oblique_light"></view>
      <view v-if="loadingIngImg == 'looming'" class="loading_looming"></view>
    </view>
  </view>
</template>

<script>
import imgLoadingError from './loading_error.png';
export default {
  props: {
    // 和官方Image组件属性一致
    src: {
      type: String,
      default: '',
    },

    mode: {
      type: String,
      default: '',
    },

    lazyLoad: {
      type: Boolean,
      default: false,
    },

    webp: {
      type: Boolean,
      default: false,
    },

    showMenuByLongpress: {
      type: Boolean,
      default: false,
    },

    // 可选： 加载失败图片：可以本地url、网络url、base64 （与src一致）
    loadingErrorImg: {
      type: String,
      default: imgLoadingError,
    },

    // 可选： 加载中的图片
    // two-balls = 两个球来回转
    // oblique-light = 斜光
    // looming = 若影若现
    // 本地url、网络url、base64 = 自定义的加载中图片（与src一致）
    loadingIngImg: {
      type: String,
      default: 'oblique-light',
    },

    // 可选：是否需要加载完成动画
    completeTransition: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      loading_complete: false,
      loading_error: false,
    };
  },

  methods: {
    onImgError: function (event) {
      this.loading_error = true;
      this.$emit('error', event);
    },

    onImgLoad: function (event) {
      this.loading_complete = true;
      this.$emit('load', event);
    },
  },
};
</script>

<style lang="scss">
.fr_img {
  position: relative;
  width: 100%;
  height: 100%;

  .fr_img_content {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .loading_complete_transition {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    animation: loading_complete_transition 1.2s forwards;
  }

  @keyframes loading_complete_transition {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  .loading_error {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;

    .loading_error_img {
      width: 100rpx;
      max-width: 100%;
      height: 100rpx;
      max-height: 100%;
    }
  }

  .loading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;

    // 加载图
    .loading_img {
      width: 100rpx;
      max-width: 100%;
      height: 100rpx;
      max-height: 100%;
    }

    // 斜光
    .loading_oblique_light {
      width: 100%;
      height: 100%;
      background-color: #e3e3e3;
      background-image: linear-gradient(
        100deg,
        rgb(255 255 255 / 0%),
        rgb(255 255 255 / 20%) 50%,
        rgb(255 255 255 / 0%) 80%
      );
      background-repeat: repeat-y;
      background-position: 0 0;
      background-size: 100rpx 100%;
      animation: loading_oblique_light 0.6s infinite;
    }

    @keyframes loading_oblique_light {
      to {
        background-position: 200% 0;
      }
    }

    // 若隐若现
    .loading_looming {
      width: 100%;
      height: 100%;
      background-color: #e3e3e3;
      animation: loading_looming 1s infinite linear;
    }
    @keyframes loading_looming {
      0% {
        background-color: rgba($color: #e3e3e3, $alpha: 50%);
      }

      50% {
        background-color: rgba($color: #e3e3e3, $alpha: 100%);
      }

      100% {
        background-color: rgba($color: #e3e3e3, $alpha: 50%);
      }
    }
  }
}
</style>
