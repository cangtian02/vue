
export function isColor(t){
    return t.indexOf('#') === 0 || t.indexOf('rgb') === 0 || false;
}

export function setColor(v){
    let color = [];
    if(v.indexOf('#') === 0) {
        color = toRGB(v);
    } else if(v.indexOf('rgb') ===0) {
        let reg = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/,
            rgb = v.replace(/\s+/g, "").match(reg);
        if (rgb && rgb[1] <= 255 && rgb[2] <= 255 && rgb[3] <= 255) {
            color.push(rgb[1]);
            color.push(rgb[2]);
            color.push(rgb[3]);
        }
    }
    return calculateColor(color);
}

const calculateColor = (v) => {
    let colors = [];
    if(!v.length) {
        return colors;
    }
    let r = +v[0] - 0,
        g = +v[1] - 0,
        b = +v[2] - 0,
        or = (255 - v[0]) / 10 | 0,
        og = (255 - v[1]) / 10 | 0,
        ob = (255 - v[2]) / 10 | 0,
        i = 0;
    for (i = 0; i < 10; i++) {
        colors.push(toHex('rgb(' + (r + or * i) + ',' + (g + og * i) + ',' + (b + ob * i) + ')'));
    }
    return colors;
}

const toHex = (v) => {
    let reg = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/,
        rgb = v.replace(/\s+/g, "").match(reg),
        r = parseInt(rgb[1], 10).toString(16).length === 1 ? '0' + parseInt(rgb[1], 10).toString(16) : parseInt(rgb[1], 10).toString(16),
        g = parseInt(rgb[2], 10).toString(16).length === 1 ? '0' + parseInt(rgb[2], 10).toString(16) : parseInt(rgb[2], 10).toString(16),
        b = parseInt(rgb[3], 10).toString(16).length === 1 ? '0' + parseInt(rgb[3], 10).toString(16) : parseInt(rgb[3], 10).toString(16);
    return '#' + r + g + b;
}

const toRGB = (v) => {
    let hex = [], hexr, hexg, hexb, themeList = v.split('');
    if(v.length !== 4 && v.length !== 7) return [];
    if (v.length === 4) {
        hexr = themeList[1] + themeList[1];
        hexg = themeList[2] + themeList[2];
        hexb = themeList[3] + themeList[3];
    }else {
        hexr = themeList[1] + themeList[2];
        hexg = themeList[3] + themeList[4];
        hexb = themeList[5] + themeList[6];
    }
    hex.push(parseInt(hexr,16).toString(10));
    hex.push(parseInt(hexg,16).toString(10));
    hex.push(parseInt(hexb,16).toString(10));
    return hex;
}

export function newElem(attrs, inner, name){
    let elem = document.createElement(name);
    for(let k in attrs) {
        elem.k = attrs.k;
    }
    elem.innerHTML = inner.html;
    return elem;
}

export function getId(){
    let id = 'keyboard_body';
    let i = 0;
    const getMyID = () => {
        if (document.querySelector('#' + id)) {
            id = id + (i++);
            return getMyID();
        } else {
            return id;
        }
    }
    return getMyID();
}

export function addprix(a, b){
    var i = 0,
        suffixLength = b - a,
        suffix = '';
    for (i = 0; i < suffixLength; i++) {
        suffix += '0';
    }
    return suffix;
}