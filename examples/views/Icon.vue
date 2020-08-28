<template>
  <ul class="kviewicons-list">
    <li 
      class="kviewicons-item"
      v-for="(item) in iconList"
      :key="item"
      >
      <Icon :type="item" />
      <span class="icon-name">{{ item }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';
import Icon from '@/icon/icon.vue';

@Component({
  components:{
    Icon,
  }
})
export default class Home extends Vue{
    private iconList:any[] = [
      'thirteen',
      'k2',
      'klogo',
      'github',
      'QQ',
      'wechat',
      'weibo',
      'zhifubao',
      'taobao',
      'button',
      'color',
      'switch',
      'circle-progress',
      'dialogue',
      'message',
      'progress',
      'tongzhi',
      'code',
      'editor',
      'QRcode',
      'arrow-right',
      'arrow-lift',
      'calendar',
      'close',
      'conditions',
      'clock',
      'discount',
      'download',
      'upload',
      'folder',
      'good',
      'hot',
      'integral',
      'loading',
      'mobile-phone',
      'map',
      'prompt',
      'share',
      'scanning',
      'security',
      'Rightbutton',
      'success',
      'error',
      'viewlist',
      'set',
      'warning-fill',
      'collection',
      'heart',
      'radio-off',
      'radio-on',
      'check_box_off',
      'check_box_on',
      'earth',
      'twocode',
      'image',
      'location',
      'search',
      'email',
      'help',
      'alert'
    ]

    copyIcon(payload:any){
      console.log(payload)
    }
}
</script>