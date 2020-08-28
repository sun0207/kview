<template>
  <div class="kviewbutton-list">
    <k-button-group vertical="true">
      <k-button type="default" size='large' :loading="loading" @click="toLoading">
        <span v-if="!loading">Click me!</span>
        <span v-else>Loading...</span>
      </k-button>&nbsp;
      <k-button type="primary" size='large'>
        Primary
      </k-button>&nbsp;
      <k-button type="info" size='large'>
        Info
      </k-button>&nbsp;
      <k-button type="success" size='large'>
        Success
      </k-button>&nbsp;
      <k-button type="warning" size='large'>
        Warning
      </k-button>&nbsp;
      <k-button type="error" size='large'>
        Error
      </k-button>&nbsp;
    </k-button-group>
  </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';
import KButton from '@/button/button.vue';
import KButtonGroup from '@/button/button-group.vue';

@Component({
  components:{
    KButtonGroup,
    KButton,
  }
})
export default class Home extends Vue{
  private loading = false;

  toLoading(payload: any) {
    this.loading = true;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.loading = false;
    },payload.duration);
  }
}
</script>
