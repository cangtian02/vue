<template>
	<div class="keyboard" id="keyboard">
        <h3>Num</h3>
        <span class="clickMe" @click="showKeyboard1">{{ numVal }}</span>
        <span class="clickMe" @click="showKeyboard2">{{ telVal }}</span>
        <span class="clickMe" @click="showKeyboard3">{{ certIdVal }}</span>
        <span class="clickMe" @click="showKeyboard4">{{ floatVal }}</span>

        <h3>Char</h3>
        <span class="clickMe" @click="showKeyboard5">{{ lowerCharaterVal }}</span>
        <span class="clickMe" @click="showKeyboard6">{{ upperCharaterVal }}</span>
        <span class="clickMe" @click="showKeyboard7">{{ charaterVal }}</span>
        <h3>CharNum</h3>
        <span class="clickMe" @click="showKeyboard10">{{ charNumVal }}</span>
        <span class="clickMe" @click="showKeyboard9">{{ passwordVal }}</span>
        <span class="clickMe" @click="showKeyboard8">{{ emailVal }}</span>
        <h3>custom</h3>
        <span class="clickMe" @click="showKeyboard11">{{ customVal }}</span>
	</div>
</template>

<script>
import keyboard from '@/components/keyboard/keyboard'

export default {
    name: 'keyboard',
    data() {
        return {
            telVal:'请输入电话号码',
            numVal: '请输入数字',
            certIdVal: '请输入身份证号码',
            floatVal: '请输入数值',

            lowerCharaterVal: '请输入小写字母',
            upperCharaterVal: '请输入大写字母',
            charaterVal: '请输入字母',

            charNumVal: '请输入数字字母',
            passwordVal: '请输入密码',
            emailVal: '请输入邮箱',

            customVal: '请输入自定义字符',
            keyboardParam: {
                // type: 'number',
                // subType: 'float',
                // typeReg: '',
                // numberType: 'numberic',
                // length: '1,8',
                // hasOpe: false,
                // precision: '2',
                // maxValue: '70',
                // minValue: '9',
                // defaultValue: '',
                // theme: '',
                // message: '',
                // onCancel: (res) => {

                // },
                // onConfirm: (v, t) => {
                //     t.keyboardclose(200);
                // }
            }
        }
    },
    methods: {
        showKeyboard1(){
            this.keyboardParam.type = 'number'
            this.keyboardParam.length = '1,8';
            this.keyboardParam.subType = 'number';
            this.keyboardParam.theme = '#e1e1e1';
            this.keyboardParam.defaultValue = '';
            if (this.numVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.numVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.numVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },
        showKeyboard2() {
            this.keyboardParam.type = 'number'
            this.keyboardParam.length = '6';
            this.keyboardParam.subType = 'phone';
            this.keyboardParam.theme = '#ff0000';
            this.keyboardParam.defaultValue = '';
            if (this.telVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.telVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.telVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },
        showKeyboard3() {
            this.keyboardParam.type = 'number'
            this.keyboardParam.length = '6';
            this.keyboardParam.subType = 'certNo';
            this.keyboardParam.theme = '#ff0000';
            this.keyboardParam.defaultValue = '';
            if (this.certIdVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.certIdVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.certIdVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },
        showKeyboard4() {
            this.keyboardParam.type = 'number'
            this.keyboardParam.length = '1,6';
            this.keyboardParam.minValue = '20';
            this.keyboardParam.maxValue = '200';
            this.keyboardParam.subType = 'float';
            this.keyboardParam.theme = '#ff0000';
            this.keyboardParam.defaultValue = '';
            if (this.floatVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.floatVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.floatVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },

        showKeyboard5() {
            this.keyboardParam.type = 'character'
            this.keyboardParam.length = '1,6';
            this.keyboardParam.minValue = '20';
            this.keyboardParam.maxValue = '200';
            this.keyboardParam.defaultValue = '';
            this.keyboardParam.subType = 'lowerChar';
            this.keyboardParam.theme = '#ff0000';
            if (this.lowerCharaterVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.lowerCharaterVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.lowerCharaterVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },
        showKeyboard6() {
            this.keyboardParam.type = 'character'
            this.keyboardParam.length = '1,6';
            this.keyboardParam.minValue = '20';
            this.keyboardParam.defaultValue = '';
            this.keyboardParam.maxValue = '200';
            this.keyboardParam.subType = 'upperChar';
            this.keyboardParam.theme = '#ff0000';
            if (this.upperCharaterVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.upperCharaterVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.upperCharaterVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },
        showKeyboard7() {
            this.keyboardParam.type = 'character'
            this.keyboardParam.length = '1,6';
            this.keyboardParam.minValue = '20';
            this.keyboardParam.maxValue = '200';
            this.keyboardParam.defaultValue = '';
            this.keyboardParam.subType = 'character';
            this.keyboardParam.theme = '#ff0000';
            if (this.charaterVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.charaterVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.charaterVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },
        showKeyboard8() {
            this.keyboardParam.type = 'charNum'
            this.keyboardParam.length = '1,6';
            this.keyboardParam.minValue = '20';
            this.keyboardParam.defaultValue = '';
            this.keyboardParam.maxValue = '200';
            this.keyboardParam.subType = 'email';
            this.keyboardParam.theme = '#ff0000';
            if (this.emailVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.emailVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.emailVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },
        showKeyboard9() {
            this.keyboardParam.type = 'charNum'
            this.keyboardParam.length = '1,6';
            this.keyboardParam.minValue = '20';
            this.keyboardParam.defaultValue = '';
            this.keyboardParam.maxValue = '200';
            this.keyboardParam.subType = 'password';
            this.keyboardParam.theme = '#ff0000';
            if (this.passwordVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.passwordVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.passwordVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },
        showKeyboard10() {
            this.keyboardParam.type = 'charNum'
            this.keyboardParam.length = '1,6';
            this.keyboardParam.minValue = '20';
            this.keyboardParam.maxValue = '200';
            this.keyboardParam.defaultValue = '';
            this.keyboardParam.subType = 'charNum';
            this.keyboardParam.theme = '#ff0000';
            if (this.charNumVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.charNumVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.charNumVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        },
        showKeyboard11() {
            this.keyboardParam.type = 'charNum'
            this.keyboardParam.length = '1,6';
            this.keyboardParam.minValue = '20';
            this.keyboardParam.maxValue = '200';
            this.keyboardParam.defaultValue = '';
            this.keyboardParam.subType = 'custom';
            this.keyboardParam.theme = '#ff0000';
            if (this.customVal.indexOf('请输入') === -1) {
                this.keyboardParam.defaultValue = this.customVal;
            }
            this.keyboardParam.onConfirm = (v, t) => {
                this.customVal = v;
                t.keyboardclose(200);
            }
            keyboard(this.keyboardParam);
        }
    }
}
</script>

<style scoped>
.clickMe {display: block;width: 180px;height: 28px;margin: 0 0 10px 10px;padding: 0 8px;font-size: 14px;line-height: 28px;color: #333;border: 1px #333 solid;}
</style>
