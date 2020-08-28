<template>
    <button :class="getClass" :disabled="disabled" @click="handelClick" :style="getStyles" >
        <Icon class="kvu-load-loop" type="loading" size="14" v-if="loading"></Icon>
        <Icon :type="icon" size="16" v-if="icon && !loading"></Icon>
        <span><slot></slot></span>
    </button>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import Icon from '@/icon/icon.vue';

const prefixCls = 'kvu-btn';

@Component({
    components:{
        Icon
    }
})

export default class Button extends Vue {
    @Prop()                       readonly icon: string | undefined
    @Prop()                       readonly long: string | undefined
    @Prop( {default: 'default'} ) readonly type: string | undefined
    @Prop( {default: 'default'})  readonly size: string | number | undefined
    @Prop({ default: 14})         readonly fontSize!: number 
    @Prop()                       readonly disabled!: boolean 
    @Prop({ default: false})      readonly loading!: boolean 
    @Prop({ default: false})      readonly ghost!: boolean 
    
    private duration = 3000
    
    get getClass():any {
        return [
            `${prefixCls}`,
            `${prefixCls}-${this.type}`,
            {
                [`${prefixCls}-long`]: this.long,
                [`${prefixCls}-${this.size}`]: this.size && this.size !== '',
                [`${prefixCls}-${this.loading}`]: this.loading != null && this.loading,
                [`${prefixCls}-desabled`]: this.disabled,
                [`${prefixCls}-ghost`]: this.ghost
            }
        ]
    }

    get getStyles():any {
        interface StylesObj {
            'font-size'?:string,
        }
        const styles:StylesObj = {
            'font-size': `${this.fontSize}px`
        };
        return styles;
    }

    @Emit('click')
    handelClick(e:any) {
        return {
            e,
            loading:this.loading,
            duration:this.duration
        }
    }
}
</script>