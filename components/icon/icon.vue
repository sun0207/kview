<template>
    <i :class="getClasses" :style="getStyles" @click="handleClick"></i>
</template>
<script lang="ts">
import { Vue, Prop, Emit, Component } from 'vue-property-decorator';
const prefixCls = 'kvu-icon';

@Component({

})

export default class Icon extends Vue{
    @Prop({ default: '' }) type! :string;
    @Prop({ default: 24 }) size! :number | string;
    @Prop() color! :string;
    @Prop() costom! :string;

    get getClasses():any[] {
        return [
            `${prefixCls}`,
            {
                [`${prefixCls}-${this.type}`]: this.type && this.type!=='',
                [`${this.costom}`]: this.costom && this.costom !=='',
            }
        ]
    }

    get getStyles() {
        interface StylesObj {
            'font-size'?:number | string,
            'color'?:string
        }
        const styles: StylesObj = {
            'font-size': this.size ? `${this.size}px` : '',
            'color': this.color || ''
        }
        return styles;
    }

    @Emit('click')
    handleClick (event:any) {
        return event.target.value
    }
}
</script>