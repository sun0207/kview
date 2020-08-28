<template>
  <div class="kviewcircle-list">
    <k-circle :percent="range">
        <span class="demo-Circle-inner" style="font-size:24px">{{range}}%</span>
    </k-circle>
    <k-circle :percent="80">
        <span class="demo-Circle-inner" style="font-size:24px">80%</span>
    </k-circle>
    <k-circle :percent="percent" stroke-color="#5cb85c">
        <Icon type="success" color="#5cb85c" v-if="percent===100"></Icon>
        <span v-else class="demo-Circle-inner" style="font-size:24px">{{percent}}%</span>
    </k-circle>
    <k-circle :percent="80" :dashboard="true">
        <span class="demo-Circle-inner" style="font-size:24px">80%</span>
    </k-circle>
  </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';
import KCircle from '@/circle/circle.vue';
import Icon from '@/icon/icon.vue';

@Component({
  components:{
      KCircle,
      Icon
  }
})
export default class KvuCircle extends Vue{
    private range = 20;
    private percent = 100;

}
</script>
