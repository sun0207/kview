<template>
    <div :class="getClass">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
const prefixCls = 'kvu-button-group'

@Component({

})

export default class ButtonGroup extends Vue{
    @Prop( { default: false}) readonly vertical!: boolean
    @Prop() readonly shape!: boolean

    get getClass():any {
        return [
            `${prefixCls}`,
            {
                [`${prefixCls}-vertical`]: this.vertical,
                [`${prefixCls}-${this.shape}`]: this.shape
            }
        ]
    }
}

</script>