import Vue from 'vue'
import mkeyboard from './keyboard.vue'

const KeyboardConstructor = Vue.extend(mkeyboard);

let getAnInstance = () => {
	return new KeyboardConstructor({
		el: document.createElement('div')
	})
}

let keyboard = (option = {}) => {
    let instance = getAnInstance();

    instance.defaultParam.type = option.type || 'number';
    instance.defaultParam.subType = option.subType || 'number';
    instance.defaultParam.typeReg = option.typeReg || '';
    instance.defaultParam.numberType = option.numberType || 'numberic';
    instance.defaultParam.length = option.length || '1,8';
    instance.defaultParam.precision = option.precision || '2';
    instance.defaultParam.maxValue = option.maxValue || '';
    instance.defaultParam.minValue = option.minValue || '';
    instance.defaultParam.defaultValue = option.defaultValue || '';
    instance.defaultParam.hasOpe = option.hasOpe || false;
    instance.defaultParam.theme = option.theme || '';
    instance.defaultParam.message = option.message || '';
    instance.defaultParam.onCancel = option.onCancel || null;
    instance.defaultParam.onConfirm = option.onConfirm || null;
    instance.isChar = instance.defaultParam.type === 'character' ? true : false;
    instance.isNum = !instance.isChar;
    instance.value = instance.defaultParam.defaultValue;
    instance.isUpper = instance.defaultParam.subType === 'upperChar' ? true : false;
    instance.canSwitch = instance.defaultParam.type === 'charNum' ? true : false;
    instance.keyboardclose = (t) => {	
		setTimeout(() => {
            if (instance.$css) {
                document.querySelector('head').removeChild(instance.$css);
            }
            if (instance.$el) {
                instance.$el.parentNode.removeChild(instance.$el);
            }
		},t || 100)
    }
    setTimeout(() => {
        document.body.appendChild(instance.$el)
    }, 100);
    return instance
}

export default keyboard