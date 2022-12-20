import { onPageScroll, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
// [z-paging]使用页面滚动时引入此mixin，用于监听和处理onPullDownRefresh等页面生命周期方法

export type IZPagingRef = {
  // 手动录入类型，维护常用方法

  //重新设置列表数据，调用此方法不会影响pageNo和pageSize，也不会触发请求。适用场景：当需要删除列表中某一项时，将删除对应项后的数组通过此方法传递给z-paging。(当出现类似的需要修改列表数组的场景时，请使用此方法，请勿直接修改page中:list.sync绑定的数组)
  resetTotalData: (data: any) => void;

  //重新加载分页数据，pageNo会恢复为默认值，相当于下拉刷新的效果(animate为true时会展示下拉刷新动画，默认为false)
  reload: (animate?: boolean) => void;

  //刷新列表数据，pageNo和pageSize不会重置，列表数据会重新从服务端获取。必须保证@query绑定的方法中的pageNo和pageSize和传给服务端的一致
  refresh: () => void;

  // 滚动并且自定义下拉刷新时，请在页面的onPageScroll中调用此方法，告知z-paging当前的pageScrollTop，否则会导致在任意位置都可以下拉刷新
  updatePageScrollTop: (scrollTop: number) => void;

  //手动触发滚动到顶部加载更多，聊天记录模式时有效
  doChatRecordLoadMore: () => void;

  //页面滚动到底部时通知z-paging进行进一步处理
  pageReachBottom: () => void;

  //请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为是否成功(默认是是）
  complete: (data: any, success?: boolean) => void;

  [key: string]: any;
};

function useZPagingInit() {
  const paging = ref<IZPagingRef>();

  onPullDownRefresh(() => {
    if (!paging.value) return;
    paging.value.reload();
  });

  onPageScroll((e) => {
    if (!paging.value) return;
    paging.value.updatePageScrollTop(e.scrollTop);
    if (e.scrollTop < 10) {
      paging.value.doChatRecordLoadMore();
    }
  });

  onReachBottom(() => {
    if (!paging.value) return;
    paging.value.pageReachBottom();
  });

  return {
    paging,
  };
}
export { useZPagingInit };

// export default {
//   onPullDownRefresh() {
//     if (this.isPagingRefNotFound()) return;
//     this.$refs.paging.reload();
//   },
//   onPageScroll(e) {
//     if (this.isPagingRefNotFound()) return;
//     this.$refs.paging.updatePageScrollTop(e.scrollTop);
//     if (e.scrollTop < 10) {
//       this.$refs.paging.doChatRecordLoadMore();
//     }
//   },
//   onReachBottom() {
//     if (this.isPagingRefNotFound()) return;
//     this.$refs.paging.pageReachBottom();
//   },
//   methods: {
//     isPagingRefNotFound() {
//       return !this.$refs.paging;
//     },
//   },
// };
