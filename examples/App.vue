<template>
  <div id="app">
    <nav class="nav-wrap">
      <router-link to="/" tag="a" class="logo-wrap">
        <img src="./assets/kview_logo.png" alt="logo">
      </router-link>
      <div class="search-wrap">
      
      </div>
      <ul class="nav-list-wrap">
          <li class="nav-item">
            指南
          </li>
          <li class="nav-item">
            组件
          </li>
          <li class="nav-item">
            资源
          </li>
      </ul>
    </nav>
    <div class="container-wrap">
      <div class="navigate-wrap kvu-col-span-4">
        <ul class="main-menu-list">
          <router-link 
            v-for="(item,index) in linkList"
            :key="item.link"
            :to="item.link"
            :tag="item.tag"
            @click.native="routerChange(index)"
            >
            <Icon :type="item.iconType" :size="18"></Icon>
            {{item.nameEn}} {{item.nameZh}} 
          </router-link>
        </ul>
      </div>
      <div class="router-view-wrap kvu-col-span-20">
        <h3 class="container-title">{{title}}</h3>
        <p class="container-desc">{{describe}}</p>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Icon from '@/icon/icon.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components:{
    Icon
  }
})

export default class App extends Vue{
  private linkList:any[] = [
    {
      link:'/',
      tag:'li',
      iconType:'thirteen',
      nameEn:'Home',
      nameZh:'首页',
      title:'关于kView UI',
      describe:'欢迎来到kView',
    },
    {
      link:'/icon',
      tag:'li',
      iconType:'heart',
      nameEn:'Icon',
      nameZh:'图标',
      title:'Icon 图标',
      describe:'语义化的图标',
    },
    {
      link:'/button',
      tag:'li',
      iconType:'button1',
      nameEn:'Button',
      nameZh:'按钮',
      title:'Button 按钮',
      describe:'可以自定义的按钮',
    },
    {
      link:'/input',
      tag:'li',
      iconType:'editor',
      nameEn:'Input',
      nameZh:'输入框',
      title:'Input 输入框',
      describe:'多样化的输入框',
    },
    {
      link:'/slider',
      tag:'li',
      iconType:'conditions',
      nameEn:'Slider',
      nameZh:'滑块',
      title:'Slider 滑块',
      describe:'自由灵活的滑块',
    },
    {
      link:'/progress',
      tag:'li',
      iconType:'progress',
      nameEn:'Progress',
      nameZh:'进度条',
      title:'Progress 进度条',
      describe:'彰显你的别样化进度',
    },
    {
      link:'/circle',
      tag:'li',
      iconType:'circle-progress',
      nameEn:'Circle',
      nameZh:'进度环',
      title:'Circle 进度环',
      describe:'进度环 or 仪表盘？',
    },
  ]

  // 导航守卫函数
  private beforeRouteEnter(to:any, from:any, next: () => void): void {
    console.log("beforeRouteEnter", to, from, next);
    next();
  }
  
  mounted() {
    setTimeout(()=>{
      const currentRouterIndex = this.linkList.findIndex((item)=>{
        return item.link === this.$route.path;
      })
      this.title = `${this.linkList[currentRouterIndex].title}`;
      this.describe = `${this.linkList[currentRouterIndex].describe}`;
    },100)
  }

  private title = '关于kView UI'

  private describe = '欢迎来到kView'

  routerChange(i:number){
    this.title = `${this.linkList[i].title}`;
    this.describe = `${this.linkList[i].describe}`;
  }
}

</script>
<style lang="scss">
@import './main.scss';
</style>
