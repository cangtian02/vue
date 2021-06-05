<template>
<div class="keyboard-body" :id='ID' @click="handleNumClick">
    <div class="keyboardMaskbg"></div>
    <div ref="keyboard_msg" class="keyboard-inner-message"></div>
    <div ref="keyboard_content" class="keyboard-content">
        <div class="keyboard-top">
            <a href="javascript:void(0);" class="keyboard-cancel" id="keyboard_cancel">取消</a>
            <a href="javascript:void(0);" class="keyboard-confirm" id="keyboard_confirm">确定</a>
            <div class="keyboard-showNum">
                <span id="keyboard_showNum">{{ value }}</span>
            </div>
        </div>
        <div :class="[{'hidden': !isChar}, 'character-cont']">
            <ul :class="[{'hidden': isUpper}, 'character-lower-keyboard']" id="character_lower_keyboard">
                <li v-for="(lc, i) in lowerCharList" :key="lc" :class="['character-lower-item', 'key-item', {'disable': noneKey.indexOf(i) > -1}]">{{lc}}</li>
                <li :class="['character-lower-item', 'caLock', 'toUpper', 'key-item', {'disable':  noneKey.indexOf(26) > -1}]"><i class="flag"></i></li>
            </ul>
            <ul :class="[{'hidden': !isUpper}, 'character-upper-keyboard']" id="character_upper_keyboard">
                <li v-for="(uc, i) in upperCharlist" :key="uc"  :class="['character-upper-item', 'key-item', {'disable': noneKey.indexOf(i) > -1}]">{{ uc }}</li>
                <li :class="['character-upper-item', 'caLock', 'toLower', 'key-item', {'disable':  noneKey.indexOf(26) > -1}]"><i class="flag"></i></li>
            </ul>
            <ul class="operSym">
                <li :class="['character-special-item', 'key-item',{ 'disable': noneOpe.indexOf(0) > -1}]">Num</li>
                <li :class="['character-special-item', 'key-item',{ 'disable': noneOpe.indexOf(1) > -1}]">@</li>
                <li :class="['character-special-item', 'key-item',{ 'disable': noneOpe.indexOf(2) > -1}]">_</li>
                <li :class="['character-special-item', 'key-item',{ 'disable': noneOpe.indexOf(3) > -1}]">-</li>
                <li class="character-special-item key-item">×</li>
            </ul>
        </div>

        <div :class="[{'hidden': !isNum}, 'number-cont']">
            <ul :class="['number-keyboard', {'numKeyboard-noChange': !canSwitch}]" id="number_keyboard">
                <li v-for="(n,i) in numList" :key="n" :class="['number-keyboard-item', 'key-item', {'disable': noneKey.indexOf(i) > -1}]">{{ n }}</li>
                <li v-if="canSwitch" :class="['number-keyboard-item', 'number-special-item', 'key-item', {'disable': noneKey.indexOf(9) > -1}]">En</li>
                <li :class="['number-keyboard-item', 'number-special-item', 'key-item', {'disable': !canSwitch ? noneKey.indexOf(9) > -1 : noneKey.indexOf(10) > -1}]">{{defaultParam.subType ==='certNo' ? 'X' : '.'}}</li>
                <li :class="['number-keyboard-item', 'number-special-item', 'key-item', {'disable': !canSwitch ? noneKey.indexOf(10) > -1 : noneKey.indexOf(11) > -1}]">0</li>
                <li :class="['number-keyboard-item', 'number-special-item', 'key-item']">×</li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { getId, newElem, isColor, setColor, addprix } from './themeColor.js';

export default {
    name: "keyboard",
    data() {
        return {
            isChar: false,
            canSwitch: false,
            isNum: true,
            isUpper: false,
            canConfirm: false,
            isFirst: true, 
            value: '',
            ID: '',
            noneKey: [],
            noneOpe: [],
            numList: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            lowerCharList: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            upperCharlist: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            defaultParam: {
                type: 'number',
                hasOpe: false,
                subType: 'number',
                typeReg: '',
                numberType: 'numberic',
                length: '1,8',
                precision: '',
                maxValue: '',
                minValue: '',
                defaultValue: '',
                theme: '',
                message: ''
            }
        };
    },
    created () {
    },
    mounted () {
        setTimeout(() => {
            this.ID = getId();
            this.setCss();
            this.setkeyBoard();
        }, 20);
    },
    methods: {
        setkeyBoard(){
            switch (this.defaultParam.subType) {
                case 'phone':
                    this.setPhone();
                    break;
                case 'certNo':
                    this.setCertNo();
                    break;
                case 'number':
                    this.setNumber();
                    break;
                case 'float':
                    this.setFloat();
                    break;
                case 'lowerChar':
                case 'upperChar':
                    this.setChar('noUpLow');
                    break;
                case 'character':
                    this.setChar('upLow');
                    break;
                case 'charNum':
                    this.setCharNum();
                case 'password':
                    this.setPassword();
                    break;
                case 'email':
                    this.setEmail();
                    break;
                default:
                    this.setCustom();
                break;
            }
        },
        setPhone(){
            this.canConfirm = false;
            this.defaultParam.length = '11';
            this.noneKey = [];
            if (!this.value.length) {
                this.noneKey = [1,2,3,4,5,6,7,8,9,10];
            } else if (this.value.length === 1){
                this.noneKey = [0,1,5,8,9,10];
            } else if (this.value.length >= this.defaultParam.length - 0) {
                this.canConfirm = true;
                this.noneKey = [0,1,2,3,4,5,6,7,8,9,10];
            } else {
                this.noneKey = [9];
            }
        },
        setNumber(){
            this.noneKey = [];
            const l = this.defaultParam.length,
                a = l && l.split(',');
            this.canConfirm = false;
            if (a.length === 1) {
                if (this.value.length !== (a[0] - 0)) {
                    this.noneKey = [9];
                } else {
                    this.canConfirm = true;
                    this.noneKey = [0,1,2,3,4,5,6,7,8,9,10];
                }
            } else {
                if (this.value.length < (a[0] - 0) || this.value.length > (a[1] - 0)) {
                    this.noneKey = [9];
                } else {
                    this.canConfirm = true;
                    if (this.value.length >= (a[1] - 0)){
                        this.noneKey = [0,1,2,3,4,5,6,7,8,9,10];
                    } else {
                        this.noneKey = [9];
                    }
                }
            }
        },
        setFloat(){
            this.canConfirm = false;
            this.noneKey = [];
            const a = this.defaultParam.maxValue && (this.defaultParam.maxValue - 0) || 999999999,
                b = this.defaultParam.minValue && (this.defaultParam.minValue - 0) || 0,
                l = [0,1,2,3,4,5,6,7,8,9,10], v = this.value,
                p = this.defaultParam.precision && (this.defaultParam.precision - 0) || 0;
            let k=[],f=0;
            if (!v.length) {
                if ((a+'').length === (b+'').length) {
                    let m = (a+'').substr(0,1)-0, n = (b+'').substr(0,1)-0;
                    k = this.getNumL(n,m);
                    this.noneKey = l.map((i) => {
                        if (k.indexOf(i) === -1) return i; 
                    });
                } else if(b && a/b < 10) {
                    const c = (a+'').substr(0,1)-0,
                        d = (b+'').substr(0,1)-0;
                    if (d - c > 1) {
                        k = this.getNumL(c+1, d-1);
                        this.noneKey = [...k,10];
                    }
                }
                this.noneKey = [...this.noneKey, 9];
            } else {
                const o = v.split('.');
                if (o.length === 1) {
                    if (v.length === 1 && v === '0') {
                        this.noneKey = [0,1,2,3,4,5,6,7,8,10];
                        return;
                    } else if((a+'').indexOf(v) === 0 && (a+'').length > v.length) {
                        f = parseInt((a+'').substr(v.length,1));
                        this.noneKey = [...this.getNumL(f+1,9)];
                        if (v-0<b){
                            this.noneKey = [...this.noneKey, 9];
                        }
                    } else if((b+'').indexOf(v) === 0 && (b+'').length > v.length){
                        f = parseInt((b+'').substr(v.length,1));
                        // debugger
                        this.noneKey = [...this.getNumL(0,f-1), 9];
                    } else if (a/(v-0) < 10 && a>(v-0)){
                        this.noneKey = [0,1,2,3,4,5,6,7,8,10];
                    } else if ((v-0)<b) {
                        this.noneKey = [9];
                    } else if ((v-0) >= a) {
                        this.noneKey = [0,1,2,3,4,5,6,7,8,9,10];
                    }
                } else {
                    if (o[1].length>=p){
                        this.noneKey = [0,1,2,3,4,5,6,7,8,9,10];
                    } else if (o[1].length === p-1 && o[0] === '0' && o[1]-0 === 0) {
                        this.noneKey=[9,10];
                    } else {
                        this.noneKey=[9];
                    }
                }
            }
            if (v - 0>=b&&v-0<=a){
                this.canConfirm = true;
            }
            if (!p) {
                this.noneKey = [...this.noneKey, 10];
            }
        },
        setCertNo(){
            this.canConfirm = false;
            const v = this.value;
            if (v.length < 17) {
                this.noneKey = [9];
            } else if(v.length === 17) {
                this.noneKey = [];
            } else {
                this.noneKey = [0,1,2,3,4,5,6,7,8,9,10];
                this.canConfirm = true;
            }
        },
        setChar(t){
            this.noneKey = [];
            this.canConfirm = false;
            if (t === 'noUpLow') {
                this.noneKey= [26];
            } else {
                this.noneKey= [];
            }
            if (this.defaultParam.hasOpe) {
                this.noneOpe = [0];
            }else {
                this.noneOpe = [0,1,2,3];
            }
            this.setNonekey('c');
            setTimeout(() => {
                if (this.noneOpe.length === 3) {
                    this.noneOpe = [0,1,2,3];
                }
            }, 0);
        },
        getNumL(s,e){
            let k =[];
            for(let i = s; i <= e; i++) {
                if (i === 0) {
                    k.push(11);
                } else {
                    k.push(i-1);
                }
            }
            return k;
        },
        handleNumClick(e) {
            const ev = e || window.event,
                t = ev.target || ev.srcElement;
            if (t.parentNode.nodeName.toLowerCase() == 'li' || t.nodeName.toLowerCase() == 'li') {
                const tc = t.className, tpc = t.parentNode.className;
                if (tc.indexOf('disable') > -1 || tpc.indexOf('disable') > -1) {
                    return;
                } else {
                    this.handleNumAdd(t);
                }
            } else if (t.id && t.id === 'keyboard_cancel') {
                this.onCancel();
            } else if (t.id && t.id === 'keyboard_confirm') {
                this.onConfirm();
            }
        },
        setCharNum(){
            this.noneKey = [];
            this.canConfirm = false;
            if (this.isNum) {
                if (this.defaultParam.hasOpe) {
                    this.noneKey = [];
                } else {
                    this.noneKey = [10];
                }
                this.setNonekey('n');
            } else {
                // debugger
                if (!this.defaultParam.hasOpe) {
                    this.noneOpe = [1,2,3]
                } else {
                    this.noneOpe = []
                }
                this.setNonekey('c');
            }
        },
        setPassword() {
            this.noneKey = [];
            this.canConfirm = false;
            const v = this.value;
            if (this.isNum) {
                this.noneKey = [10];
                this.setNonekey('n');
            } else {
                this.noneKey = [];
                if (!v.length) {
                    this.noneOpe = [1,2,3]
                } else {
                    this.noneOpe = []
                }
                this.setNonekey('c');
            }
        },
        setEmail(){
            this.noneKey = [];
            this.canConfirm = false;
            const v = this.value;
            if (this.isNum) {
                if (v.indexOf('@')===-1 || v.indexOf('@') === (v.length - 1) || (v.indexOf('.')>-1 && !v.split('.').pop())) {
                    this.noneKey = [10];
                } else if (v.indexOf('.')>-1 && v.split('.').pop().length > 4) {
                    this.noneKey = [0,1,2,3,4,5,6,7,8,9,11];
                }
            } else {
                this.noneKey = [];
                if (!v.length) {
                    this.noneOpe = [1,2,3]
                } else {
                    if (v.indexOf('@') > 0) {
                        this.noneOpe = [1];
                    } else if (v.indexOf('.')>-1 && v.split('.').pop().length > 4) {
                        this.noneKey = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
                        this.noneOpe = [1,2,3];
                    }
                }
            }
            const reg = this.defaultParam.typeReg || /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (reg.test(v)) {
                this.canConfirm = true;
            }
        },
        setCustom(){
            if (this.defaultParam.type === 'number') {
                if (this.defaultParam.numberType === 'count') {
                    this.setFloat();
                } else if (this.defaultParam.numberType === 'numberic') {
                    this.setNumber();
                }
            } else if (this.defaultParam.type === 'character') {
                this.setChar('upLow');
            } else if (this.defaultParam.type === 'charNum') {
                this.setCharNum();
            }
        },
        setNonekey(type){
            const l = this.defaultParam.length,
                a = l.split(','), v = this.value,
                nl = [0,1,2,3,4,5,6,7,8,10,11], cl = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
            if (a.length === 1 && v.length >= a[0]-0) {
                if (type === 'n') {
                    this.noneKey = nl;
                } else {
                    this.noneKey = cl;
                    this.noneOpe = [1,2,3];
                }
                
                if (v.length === a[0]-0) {
                    this.canConfirm = true;
                }
            }
            if (a.length === 2 && a[0] && a[1]) {
                if (v.length >= a[1]-0) {
                    if (type === 'n') {
                        this.noneKey = nl;
                    } else {
                        this.noneKey = cl;
                        this.noneOpe = [1,2,3]
                    }
                }
                if (v.length >= a[0]-0 && v.length <= a[1]-0) {
                    this.canConfirm = true;
                }
            }
        },
        handleNumAdd(t){
            if (t.innerHTML === '×') {
                const v = this.value;
                this.value = v.substr(0,v.length-1);
            } else if(t.innerHTML === 'Num' || t.innerHTML === 'En'){
                this.isNum = !this.isNum;
                this.isChar = ! this.isNum;
            }else if(t.className.indexOf('caLock') > -1 || t.parentNode.className.indexOf('caLock') > -1){
                this.isUpper = !this.isUpper;
            } else {
                this.value += t.innerHTML;
            }
            this.setkeyBoard();
        },
        cssCont(){
            const isCol = isColor(this.defaultParam.theme), $css = [],
                colors = setColor(this.defaultParam.theme);
            if (!isCol || !colors.length) {
                return;
            }
            if (colors[5].substr(1, 2) <= 'ee' || colors[5].substr(3, 2) <= 'ee' || colors[5].substr(5, 2) <= 'ee') {
                $css.push('#' + this.ID + ' .keyboard-content, ');
                $css.push('#' + this.ID + ' .number-cont {');
                $css.push('background-color: ' + colors[7] + ';}');
                $css.push('#' + this.ID + ' .character-upper-item.disable,');
                $css.push('#' + this.ID + ' .character-lower-item.disable,');
                $css.push('#' + this.ID + ' .character-special-item.disable,');
                $css.push('#' + this.ID + ' .number-keyboard-item.disable {');
                $css.push('background-color: ' + colors[5] + ';}');
                $css.push('#' + this.ID + ' .character-upper-item,');
                $css.push('#' + this.ID + ' .character-lower-item,');
                $css.push('#' + this.ID + ' .character-special-item,');
                $css.push('#' + this.ID + ' .number-keyboard-item {');
                $css.push('background-color: ' + colors[3] + ';');
                $css.push('color: #fff;');
                $css.push('}');
                $css.push('#' + this.ID + ' .caLock .flag {');
                $css.push('background-color: ' + colors[9] + ';');
                $css.push('border: 1px solid ' + colors[9] + ';')
                $css.push('}');
                $css.push('#' + this.ID + ' .character-upper-item .flag {');
                $css.push('background-color: ' + colors[1] + ';');
                $css.push('border: 1px solid ' + colors[1] + ';')
                $css.push('}');

                $css.push('#' + this.ID + ' .caLock .flag::after {');
                $css.push('border-bottom: 3px solid ' + colors[9] + ';');
                $css.push('}');
                $css.push('#' + this.ID + ' .caLock .flag::before {');
                $css.push('border-bottom: 4px solid ' + colors[9] + ';');
                $css.push('}');
                
                $css.push('#' + this.ID + ' .character-upper-item .flag::after {')
                $css.push('border-bottom: 3px solid ' + colors[1] + ';');
                $css.push('}');
                $css.push('#' + this.ID + ' .character-upper-item .flag::before {');
                $css.push('border-bottom: 4px solid ' + colors[1] + ';');
                $css.push('}');
            }
            return $css.join('');
        },
        setCss(){
            // console.log(Tools)
            this.$css = newElem({
                type: 'text/css',
                media: 'screen'
            }, {
                html: this.cssCont()
            }, 'style');
            document.querySelector('head').appendChild(this.$css);
        },
        onCancel(){
            this.keyboardclose();
        },
        onConfirm(){
            if (this.defaultParam.subType === 'float' && this.value.split('.').length === 2) {
                this.value += addprix(this.value.split('.')[1].length, this.defaultParam.precision);
                const min = this.defaultParam.minValue && this.defaultParam.minValue-0 || 0,
                    max = this.defaultParam.maxValue && this.defaultParam.maxValue || 999999999;
                if (this.value>= min && this.value <= max) {
                    this.canConfirm = true;
                }
            }
            if (!this.canConfirm) {
                const msg = this.defaultParam.message || '您的输入有误，请重新输入';
                this.$refs.keyboard_msg.innerHTML = msg;
                this.$refs.keyboard_msg.style.display = 'block';
                this.$refs.keyboard_content.style.display = 'none';
                this.keyboardclose(1000);
                return;
            }
            if (toString.call(this.defaultParam.onConfirm) === '[object Function]') {
                this.defaultParam.onConfirm(this.value, this);
                // this.keyboardclose();
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./keyboard.css";
</style>
