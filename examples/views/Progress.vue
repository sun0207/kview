<template>
  <div class="kviewprogress-list">
    <k-progress :percent="range"></k-progress>
    <k-progress :percent="40" style="width:200px"></k-progress>
    <k-progress :percent="range" style="width:200px">
        <span slot="tooltip">进度：{{range}}</span>
    </k-progress>
    <k-progress :percent="100" style="width:200px"></k-progress>
  </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';
import KProgress from '@/progress/progress.vue';

@Component({
  components:{
      KProgress
  }
})
export default class Progress extends Vue{
    private range = 20;

}
</script>
