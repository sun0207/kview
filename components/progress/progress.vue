<template>
    <div :class="wrapperClass">
        <div 
            ref="progress"
            :class="wrapClass"
            :style="wrapStyle">
            <div 
                v-if="progressValue !== 100"
                :class="progressClass"
                :style="progressStyle">
                <slot class="kvu-progress-bg-text" v-if="customTooltip" name="tooltip"></slot>
                <span class="kvu-progress-bg-text" v-else>{{progressValue}}%</span>
            </div>
            <div 
                v-else
                :class="progressSuccessClass"
                :style="progressSuccessStyle">
                <slot class="kvu-progress-bg-text" v-if="customTooltip" name="tooltip"></slot>
                <span class="kvu-progress-bg-text" v-else>{{progressValue}}%</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

const classPrefix = 'kvu-progress';

@Component({

})

export default class Progress extends Vue{
    @Prop()               readonly name!: string | undefined
    @Prop({ default:0 })  readonly percent!: number
    @Prop({ default:1 })  readonly step!: number
    @Prop()               readonly strokeColor!: string | Array<string>
    @Prop({ default:12})  readonly strokeWidth!: number

    private customTooltip: boolean | undefined = false
    private currentPos = 0
    private startPos = 0
    private customStep = this.step;

    get progressValue(){
        return this.percent
    }

    get wrapperClass(){
        return [
            `${classPrefix}-wrapper`
        ]
    }

    get wrapClass(){
        return [
            `${classPrefix}-wrap`
        ]
    }

    get wrapStyle(){
        interface StylesObj {
            'height'?: string,
            'borderRadius'?: string
        }

        const styles: StylesObj = {
            'height': this.strokeWidth + 'px',
            'borderRadius': (this.strokeWidth / 2) + 'px' 
        };
        return styles;
    }

    get progressStyle(){
        interface StylesObj {
            'width'?: string,
            'justifyContent'?: string,
            'borderRadius'?: string,
            'backgroundColor'?: string,
            'backgroundImage'?: string,
        }

        const styles: StylesObj = {
            'width': `${this.percent}%`,
            // 'justifyContent':this.percent <= 30 ? 'flex-start':'flex-end',
            'borderRadius': (this.strokeWidth / 2) + 'px' ,
            'backgroundColor': this.strokeColor instanceof Array ? '' : this.strokeColor ,
            "backgroundImage": this.strokeColor instanceof Array ? `linear-gradient(to right, ${this.strokeColor[0]} 0%, ${this.strokeColor[1]} 100%)` : ''
        };
        return styles;
    }

    get progressSuccessStyle(){
        interface StylesObj {
            'width'?: string,
            'borderRadius'?: string,
        }

        const styles: StylesObj = {
            'width': `${this.percent}%`,
            'borderRadius': (this.strokeWidth / 2) + 'px' ,
        };
        return styles;
    }

    get progressClass(){
        return [
            `${classPrefix}-bg`
        ]
    }

    get progressSuccessClass(){
        return [
            `${classPrefix}-bg`,
            `${classPrefix}-bg-success`
        ]
    }
    
    mounted() {
        this.customTooltip = this.$slots.tooltip && this.$slots.tooltip !== undefined;
    }
}
</script>