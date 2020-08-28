<template>
    <div 
        :class="wrapperClass">
        <div 
            ref="slider"
            :class="wrapClass"
            @click.self="sliderClick">
            <input 
                type="hidden" 
                :name="name" 
                :value="exportValue"
                @input="emitInput"
                @change="emitChange">
            <div 
                :style="{ width:(exportValue + '%'), backgroundColor:color }"
                :class="barClass"
                @click.self="sliderClick"> 
            </div>
            <div 
                :style="{ left:(exportValue + '%') }"
                :class="buttonClass"
                @touchstart="onPointerDown($event)"
                @mousedown="onPointerDown($event)">
                <div
                    :style="{ color:color, borderColor:color }" 
                    :class="dragButton"
                    @keydown.left="onKeyLeft($event)"
                    @keydown.down="onKeyLeft($event)"
                    @keydown.right="onKeyRight($event)"
                    @keydown.up="onKeyRight($event)">
                </div>
                <div 
                    :class="tooltipClass">
                    <slot v-if="customTooltip" name="tooltip"></slot>
                    <span v-else>Progress: {{exportValue}}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop , Watch} from 'vue-property-decorator';
import elementResizeDetectorMaker from 'element-resize-detector';

import { on, off } from '../utils/dom';

const prefixCls = 'kvu-slider';

@Component({
    
})

export default class Slider extends Vue{
    @Prop() readonly name!: string
    @Prop() value!: number 
    @Prop() readonly color!: string
    @Prop() readonly disabled!: boolean | string
    @Prop({default:100}) readonly valueRange!: number
    
    
    private customTooltip:boolean | undefined = false
    private itemDisabled = this.disabled
    private currentValue = this.value
    private dragging = false 
    private pointerDown = 0
    private sliderWidth = 0
    private startX = 0
    private startPos = 0
    private currentX = 0

    get wrapperClass(){
        return [
            `${prefixCls}-wrapper`,
            {
                [`${prefixCls}-disabled`]: this.itemDisabled
            }
        ]
    }

    get wrapClass(){
        return [
            `${prefixCls}-wrap`,
        ]
    }

    get barClass(){
        return [
            `${prefixCls}-bar`
        ]
    }

    get buttonClass(){
        return [
            `${prefixCls}-button`
        ]
    }

    get dragButton(){
        return [
            `${prefixCls}-button-drag`,
            {
                [`${prefixCls}-button-dragging`]:this.dragging
            }
        ]
    }

    get tooltipClass(){
        return [
            `${prefixCls}-button-tooltip`,
            {
                [`${prefixCls}-button-tooltip-dragging`]:this.dragging
            }
        ]
    }

    get exportValue(){
        return this.currentValue;
    }

    @Watch('value')
    setCurrentValue(val:number){
        this.currentValue = val;
    }

    @Watch('currentValue')
    setValueChange(val:number){
        this.emitInput(val);
        this.emitOnInput(val);
    }

    @Emit('input')
    emitInput(e:any){
        const value = e.target ? e.target.value : e;
        return value;
    }

    @Emit('on-input')
    emitOnInput(e:any){
        const value = e.target ? e.target.value : e;
        return value;
    }

    @Emit('on-change')
    emitChange(e:any){
        const value = e.target ? e.target.value : e;
        return value;
    }  

    getStyle(element:any,styleName:any){
        if (!element || !styleName) return null;
        if (styleName === 'float') {
            styleName = 'cssFloat';
        }
        try {
            const computed = document.defaultView.getComputedStyle(element, '');
            return element.style[styleName] || computed ? computed[styleName] : null;
        } catch(e) {
            return element.style[styleName];
        }
    }

    handleSetSliderWidth() {
        this.sliderWidth = parseInt(this.getStyle(this.$refs.slider, 'width'), 10);
    }  

    minPosition () {
        return 0;
    }

    maxPosition () {
        return 100;
    }

    sliderClick (event:any) {
        if (this.itemDisabled) return;
        const currentX = this.getPointerX(event);
        const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
        const newPos = ( currentX - sliderOffsetLeft ) / this.sliderWidth * 100;
        this.changeButtonPosition(newPos);
    }

    onKeyLeft ( event:any ) {
        console.log(event)
    }

    onKeyRight ( event:any ) {
        console.log(event)
    }


    onPointerDown (event:any) {
        if (this.itemDisabled) return;
        event.preventDefault();
        this.onPointerDragStart(event);
        this.dragging = true;
        on(window, 'mousemove', this.onPointerDrag);
        on(window, 'touchmove', this.onPointerDrag);
        on(window, 'mouseup', this.onPointerDragEnd);
        on(window, 'touchend', this.onPointerDragEnd);
    }

    onPointerDragStart (event:any) {
        this.dragging = false;
        this.currentX = this.getPointerX(event);
        this.startX = this.currentX;
        this.startPos = this.exportValue;
    }

    onPointerDrag (event:any) {
        this.dragging = true;
        this.currentX = this.getPointerX(event);
        const diff = (this.currentX - this.startX) / this.sliderWidth * this.valueRange;
        this.changeButtonPosition(this.startPos + diff);
    }

    onPointerDragEnd () {
        if (this.dragging) {
            this.dragging = false;
            this.emitChange(this.exportValue);
        }
        off(window, 'mousemove', this.onPointerDrag);
        off(window, 'touchmove', this.onPointerDrag);
        off(window, 'mouseup', this.onPointerDragEnd);
        off(window, 'touchend', this.onPointerDragEnd);
    }

    getPointerX (e:any) {
        return e.type.indexOf('touch') !== -1 ? e.touches[0].clientX : e.clientX;
    }

    changeButtonPosition (newPos:any) {
        newPos = parseInt(newPos,10);
        if(newPos < 0){
            newPos = 0
        }
        if(newPos > 100){
            newPos = 100
        }
        this.currentValue = newPos;
        if (!this.dragging) {
            this.emitChange(newPos)
        }
    }

    mounted(){
        this.customTooltip = this.$slots.tooltip && this.$slots.tooltip !== undefined;

        const observer = elementResizeDetectorMaker();
        observer.listenTo(this.$refs.slider, this.handleSetSliderWidth);
        this.$once('hook:beforeDestory',() => {
            observer.removeListener(this.$refs.slider, this.handleSetSliderWidth);
        })
    }
}
</script>