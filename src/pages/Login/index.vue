<template>
  <view class="px-5 h-full relative flex justify-center overflow-hidden">
    <view class="px-6 pt-10 pb-10 z-10 w-full mt-10">
      <!-- <image :src="Logo" class="rounded-3xl mx-auto mb-10 flex items-center" style="width: 50%" mode="widthFix"></image> -->

      <view class="text-white mb-20">
        <view class="font-bold text-xl">您好！</view>
        <view>欢迎使用库房管理系统手持机设备</view>
      </view>

      <uni-forms ref="formRef" :rules="rules" :model="formValues" label-width="80px">
        <uni-forms-item label="账号" required name="userName">
          <template #label>
            <view class="mr-4">
              <text class="text-white">账号</text>
              <!-- <text class="text-red-500">*</text> -->
            </view>
          </template>
          <uni-easyinput v-model="formValues.userName" placeholder="请输入账号" />
        </uni-forms-item>
        <uni-forms-item label="密码" required name="passWord">
          <template #label>
            <view class="mr-4">
              <text class="text-white">密码</text>
              <!-- <text class="text-red-500">*</text> -->
            </view>
          </template>
          <uni-easyinput v-model="formValues.passWord" type="password" placeholder="请输入密码" />
        </uni-forms-item>
      </uni-forms>

      <button
        class="w-full h-10 rounded-md flex items-center justify-center mt-10 text-blue-500 font-bold text-lg"
        size="mini"
        @click="submit()"
      >
        登&nbsp;录
      </button>
    </view>
    <view
      class="w-64 h-60 absolute -bottom-10 -right-8 img-handheld-machine animate__animated animate__fadeInBottomRight"
    ></view>
    <!-- <view class="w-60 h-60 absolute bottom-0 right-0 img-ornament animate__animated animate__fadeInBottomRight"></view> -->
    <!-- <view
      class="w-96 h-96 h- absolute -top-40 -right-64 rounded-full flotage"
      style="background: rgb(119 192 255)"
    ></view>
    <view
      class="w-96 h-96 absolute -top-20 -left-10 rounded-br-full flotage"
      style="background: rgb(75 151 218); animation-delay: 1.5s"
    ></view> -->
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, inject, onMounted, onUnmounted, watchEffect, watch } from 'vue';
import Logo from '@/static/logo.png';
import { commonAdminLogin } from '@/services';
import imgHandheldMachine from '@/static/img-handheld-machine.png';
import { useStore } from '@/store';

const props = defineProps<{
  url?: string;
}>();
const store = useStore();

const formValues = reactive({
  ident: 'tools',
  sysType: 'app',
  userName: '',
  passWord: '',
});

const rules = reactive<Uniui.FormRule>({
  userName: {
    rules: [
      {
        required: true,
        errorMessage: '账号不能为空',
      },
    ],
  },
  passWord: {
    rules: [
      {
        required: true,
        errorMessage: '密码不能为空',
      },
    ],
  },
});
const formRef = ref<Uniui.FormsRef | null>(null);
const loading = ref<boolean>(false);

watch(
  () => store?.state?.login?.token,
  (count, prevCount) => {
    if (count) {
      if (props.url) {
        uni.reLaunch({
          url: props.url,
        });
      } else {
        uni.reLaunch({
          url: '/pages/index/index',
        });
      }
    }
    // console.log('count', count);
    // console.log('prevCount', prevCount);
  },
);

const submit = () => {
  formRef.value?.validate().then(() => {
    if (loading.value) {
      return;
    }

    loading.value = true;
    uni.showLoading({
      title: '登录中',
    });
    commonAdminLogin(formValues)
      .then((res) => {
        const user = res;
        store.commit('moduleLogin/setUserInfo', user);
        store.commit('moduleLogin/setToken', user.loginToken);
        if (props.url) {
          uni.reLaunch({
            url: props.url,
          });
        } else {
          uni.reLaunch({
            url: '/pages/Main/index',
          });
        }
      })
      .finally(() => {
        uni.hideLoading();
        loading.value = false;
      });
  });
};

/* #ifdef H5 */
const keydownEnterHandle = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
    submit();
  }
};

onMounted(() => {
  window.addEventListener('keydown', keydownEnterHandle);
});

onUnmounted(() => {
  window.removeEventListener('keydown', keydownEnterHandle, false);
});
/* #endif */
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background: linear-gradient(0deg, #4e86ee 0%, #1a5bee 100%);
  // background: linear-gradient(140deg, rgb(105 168 222) 40%, rgb(25 97 160));
}

.login-card {
  // top: 100rpx;
  // border-top-right-radius: 360rpx !important;
  // transition: border-radius 0.5s ease-in;
  // transition-delay: 3s;
  // border-top-right-radius: 20rpx;
  // animation: login-card 0.6s forwards ease-in;
  // animation-delay: 0.3s;
}

@keyframes login-card {
  0% {
    border-top-right-radius: 20rpx;
  }

  100% {
    border-top-right-radius: 360rpx;
  }
}

.flotage {
  animation: flotage 5s infinite alternate;
}

@keyframes flotage {
  0% {
    transform: translate(0);
  }

  50% {
    transform: translate(10px, -5px);
  }

  100% {
    transform: translate(25px, 10px);
  }
}

.img-handheld-machine {
  background: url('~@/static/img-handheld-machine.png') no-repeat;
  background-size: contain;
}

.img-ornament {
  background: url('~@/static/img-ornament.png') no-repeat;
  background-size: contain;
}
</style>
