<script setup lang="ts">
import { onLaunch, onShow, onHide, onError } from '@dcloudio/uni-app';
import { useStore } from './store';

const store = useStore();
onLaunch(() => {
  console.log('App Launch');
  store.dispatch('moduleLogin/updateUserInfo').catch((err) => {
    console.error('onLaunch', err);
    uni.reLaunch({
      url: '/pages/Login/index',
    });
  });
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/utilities';
@import 'animate.css';
</style>
