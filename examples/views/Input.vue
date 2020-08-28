<template>
    <div class="kviewinput-list">
        <k-input 
            style="width:300px;"
            type="text" 
            v-model="textValue"
            enterButton="true"
            placeholder="请输入搜索内容">
        </k-input>
        <k-input 
            style="width:200px;"
            type="text" 
            v-model="emailValue"
            placeholder="请输入"
            @on-input-change="valueChange">
            <Icon type="email" size="16" slot="prefix"></Icon>
        </k-input>
        <k-input 
            style="width:200px;"
            type="password" 
            v-model="pwdValue"
            placeholder="请输入"
            @on-input-change="valueChange">
            <Icon type="password" size="16" slot="prefix"></Icon>
        </k-input>
        <k-input 
            style="width:200px;"
            type="text" 
            v-model="pwdValue"
            placeholder="请输入"
            @on-input-change="valueChange">
            <span slot="prepend">www.</span>
            <span slot="append">.com</span>
        </k-input>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import KInput from '@/input/input.vue';
import Icon from '@/icon/icon.vue';
import kButton from '@/button/button.vue';

@Component({
    components:{
        KInput,
        Icon,
        kButton
    }
})

export default class Input extends Vue{
    private textValue = 'hello world!';
    private emailValue = '1452897977@163.com';
    private pwdValue = '123456';

    valueChange(payload:any){
        console.log(payload)
    }

    destroyed() {
        // Object.assign(this.$data, this.$options.data())
    }
}

</script>