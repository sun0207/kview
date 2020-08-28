<template>
    <div 
        :style="circleSize" 
        :class="wrapClass">
        <svg viewBox="0 0 100 100">
            <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0" :style="trailStyle"/>
            <path :d="pathString" :stroke-linecap="strokeLinecap" :stroke="strokeColor" :stroke-width="computedStrokeWidth" fill-opacity="0"  :style="pathStyle"/>
        </svg>
        <div :class="innerClass">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

const prefixCls = 'kvu-chart';

@Component({

})

export default class KvuCircle extends Vue{
    @Prop({ default:120 })          readonly size!: number
    @Prop()                         readonly percent!: number 
    @Prop({ default:6 })            readonly strokeWidth!: number 
    @Prop({ default:'#2d8cf0' })    readonly strokeColor!: string 
    @Prop({ default:5 })            readonly trailWidth!: number 
    @Prop({ default:'#eaeef2' })    readonly trailColor!: string 
    @Prop({ default:'round' })      readonly strokeLinecap!: string 
    @Prop({ default:false })        readonly dashboard!: boolean | string

    get wrapClass(){
        return [
            `${prefixCls}-circle`
        ]
    }

    get circleSize(){
        return {
            width: `${this.size}px`,
            height: `${this.size}px`
        };
    }
    
    get radius () {
        return 50 - this.strokeWidth / 2;
    }

    get computedStrokeWidth () {
        return this.percent === 0 && this.dashboard ? 0 : this.strokeWidth;
    }

    get pathString () {
        if (this.dashboard) {
            return `M 50,50 m 0,${this.radius}
            a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}
            a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}`;
        } else {
            return `M 50,50 m 0,-${this.radius}
            a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
            a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`;
        }
    }

    get len () {
        return Math.PI * 2 * this.radius;
    }

    get trailStyle(){
        let style = {};
        if (this.dashboard) {
            style = {
                'stroke-dasharray': `${this.len - 75}px ${this.len}px`,
                'stroke-dashoffset': `-${75 / 2}px`,
                'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
            };
        }
        return style;
    }

    get pathStyle(){
        let style = {};
        if (this.dashboard) {
            style = {
                'stroke-dasharray': `${(this.percent / 100) * (this.len - 75)}px ${this.len}px`,
                'stroke-dashoffset': `-${75 / 2}px`,
                'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
            };
        } else {
            style = {
                'stroke-dasharray': `${this.len}px ${this.len}px`,
                'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
                'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
            };
        }
        return style;
    }

    get innerClass () {
        return `${prefixCls}-circle-inner`;
    }
}

</script>