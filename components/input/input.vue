<template>
    <div :class="getWrapClass">
        <template v-if="type !== 'textarea'">
            <div :class="[prefixCls + '-group-prepend']" v-if="showPrepend"><slot name="prepend"></slot></div>
            <div :class="[prefixCls + '-inner-container']">
                <span :class="[prefixCls + '-prefix']" v-if="showPrefix && !showPrepend && !showAppend"><slot name="prefix"></slot></span>
                <input 
                    :class="inputClass"
                    ref="input"
                    :type="type"
                    :value="currentValue"
                    :placeholder="placeholder"
                    :autofocus="autofocus"
                    :disabled="disabled"
                    @input="handleInput"
                    @change="handleChange"/>
                <span :class="[prefixCls + '-suffix']" v-if="showSuffix && !showPrepend && !showAppend"><slot name="suffix"></slot></span>
                <span :class="[prefixCls + '-with-search']" v-if="enterButton || search && !showSuffix"><slot name="enterButton"></slot></span>
            </div>
            <div :class="[prefixCls + '-group-append']" v-if="showAppend"><slot name="append"></slot></div>
        </template>
        <textarea 
            v-else
            ref="textarea"
            :placeholder="placeholder"
            :value="currentValue"
            :autofocus="autofocus"
            :disabled="disabled"
            @input="handleInput"
            @change="handleChange">

        </textarea>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import Icon from '@/icon/icon.vue'
import kButton from '@/button/button.vue'

const prefixCls = 'kvu-input';

@Component({
    components:{
        Icon,
        kButton
    }
})

export default class Input extends Vue{
    @Prop()                  readonly type!: string
    @Prop()                  readonly size!: string
    @Prop()                  readonly suffix!: string
    @Prop()                  readonly prefix!: string
    @Prop()                  readonly prepend!: string
    @Prop()                  readonly append!: string
    @Prop()                           value!: string | number
    @Prop()                  readonly placeholder!: string
    @Prop()                  readonly autofocus!: boolean 
    @Prop({ default:false }) readonly readonly!: boolean
    @Prop({ default:false }) readonly disabled!: boolean
    @Prop()                  readonly search!: boolean
    @Prop()                  readonly enterButton!: string

    private prefixCls = prefixCls 
    private currentValue = this.value
    private showPrefix = false
    private showPrepend = false
    private showSuffix = false
    private showAppend = false

    get getWrapClass(){
        return [
            `${prefixCls}-wrapper`,
            {
                [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
                [`${prefixCls}-type`]: this.type,
                [`${prefixCls}-group`]: this.showPrefix || this.showSuffix || this.showPrepend || this.showAppend || this.search || this.enterButton,
                [`${prefixCls}-group-width-prefix`]: this.showPrefix,
                [`${prefixCls}-group-width-suffix`]: this.showSuffix,
                [`${prefixCls}-group-with-search`]:this.search && !this.enterButton,
                [`${prefixCls}-group-with-enter`]:!this.search && this.enterButton
            }
        ]
    }

    get inputClass(){
        return [
            `${prefixCls}`,
            {
                [`${prefixCls}-${this.size}`]: this.size,
                [`${prefixCls}-disabled`]: this.disabled,
                [`${prefixCls}-with-prefix`]: this.showPrefix,
                [`${prefixCls}-group-with-prepend`]: this.showPrepend,
                [`${prefixCls}-with-suffix`]: this.showSuffix,
                [`${prefixCls}-group-with-append`]: this.showAppend,
            }
        ]
    }

    @Watch('value')
    setCurrentValue(newValue:string | number){
        this.currentValue = newValue;
    }

    @Emit('input')
    handleInput( e:any ){
        return e.target.value
    }

    @Emit('on-input-change')
    handleChange( e:any ){
        return e
    }

    mounted() {  
        if( this.type !== 'textarea'){
            this.showPrefix = !!this.prefix || this.$slots.prefix !== undefined
            this.showPrepend = !!this.prepend || this.$slots.prepend !== undefined
            this.showSuffix = !!this.suffix || this.$slots.suffix !== undefined
            this.showAppend = !!this.append || this.$slots.append !== undefined
        }
    }
}
</script>