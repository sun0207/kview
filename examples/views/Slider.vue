<template>
  <div class="kviewslider-list">
    <k-slider v-model="range"></k-slider>
    <k-slider v-model="range" style="width:200px;"></k-slider>
    <k-slider v-model="range" style="width:200px;">
        <span slot="tooltip">range:{{range}}</span>
    </k-slider>
    <k-slider :disabled="true" v-model="range" style="width:200px;"></k-slider>
  </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';
import KSlider from '@/slider/slider.vue';

@Component({
  components:{
      KSlider,
  }
})
export default class Slider extends Vue{
    private range = 20;

}
</script>
