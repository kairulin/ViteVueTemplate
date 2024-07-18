import {normalizeZeroToOne, toTwoDigits} from './utils'
type RGB = {
    r: number;
    g: number;
    b: number;
    a?: number;
    format?: string;
};

type HSL = {
    h: number;
    s: number;
    l: number;
    a?: number;
    format?: string;
};

type HSV = {
    h: number;
    s: number;
    v: number;
    a?: number;
    format?: string;
};

type ColorInput = string | number | RGB | HSL | HSV;

export  const rgbToRgb = (r:number, g:number, b:number):RGB  => {
    return {
        r:normalizeZeroToOne(r,255) * 255,
        g:normalizeZeroToOne(g,255) * 255,
        b:normalizeZeroToOne(b,255) * 255
    }
}

export  const rgbToHsl = (r:number, g:number, b:number): HSL => {
    r = normalizeZeroToOne(r, 255);
    g = normalizeZeroToOne(g, 255);
    b = normalizeZeroToOne(b, 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let lightness = (max + min) / 2;
    if(max === min) {
        return {h:0,s:0,l:lightness}
    }
    const difference = max - min;
    let hue = 0,saturation = 0;
    saturation = lightness > 0.5 ? difference / (2 - max - min) : difference / (max + min);
    switch(max) {
        case r: hue = (g - b) / difference + (g < b ? 6 : 0); break;
        case g: hue = (b - r) / difference + 2; break;
        case b: hue = (r - g) / difference + 4; break;
    }
    hue /= 6;
    return {
        h: hue,
        s: saturation,
        l: lightness
    }
}

const hueToRgb = (p:number, q:number, t:number): number => {
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1 / 6) return p + (q - p) * 6 * t;
    if(t < 1 / 2) return q;
    if(t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

export  const hslToRgb = (h:number, s:number, l:number): RGB => {
    let r = 0,g = 0,b = 0;
    if(s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }
    return {r:(r * 255), g:(g * 255), b:(b * 255)};
}

export  const rgbToHsv = (r:number, g:number, b:number): HSV =>{
    r = normalizeZeroToOne(r, 255);
    g = normalizeZeroToOne(g, 255);
    b = normalizeZeroToOne(b, 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let hue = 0, value = max, difference = max - min, saturation = max === 0 ? 0 : difference / max;
    if(max !== min) {
        switch(max) {
            case r:
                hue = (g - b) / difference + (g < b ? 6 : 0);
                break;
            case g:
                hue = (b - r) / difference + 2;
                break;
            case b:
                hue = (r - g) / difference + 4;
                break;
            default:
                break;
        }
        hue /= 6;
    }
    return {
        h: hue,
        s: saturation,
        v: value
    }    
}

export  const hsvToRgb = (h:number, s:number, v:number): RGB => {
    h = normalizeZeroToOne(h, 360) * 6;
    s = normalizeZeroToOne(s, 100);
    v = normalizeZeroToOne(v, 100);
    const i = Math.floor(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    const mod = i % 6;
    const r = [v, q, p, p, t, v][mod];
    const g = [t, v, v, q, p, p][mod];
    const b = [p, p, t, v, v, q][mod];
    return {
        r: r * 255,
        g: g * 255,
        b: b * 255
    }
}
export  const rgbToHex = (r:number, g:number, b:number, allow3Char:boolean) => {
    const hex = [
        toTwoDigits(Math.round(r).toString(16)),
        toTwoDigits(Math.round(g).toString(16)),
        toTwoDigits(Math.round(b).toString(16))
    ];
    if(allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex.map(value => value.charAt(0)).join('');
    }
    return hex.join('');
}

const convertDecimalToHex = (d: number) => {
    return Math.round(parseFloat(String(d)) * 255).toString(16);
}
export  const rgbaToHex = (r:number, g:number, b:number, a:number, allow4Char:boolean) => {
    const hex = [
        toTwoDigits(Math.round(r).toString(16)),
        toTwoDigits(Math.round(g).toString(16)),
        toTwoDigits(Math.round(b).toString(16)),
        toTwoDigits(convertDecimalToHex(a))
    ];
    if(allow4Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1)) &&
        hex[3].startsWith(hex[3].charAt(1))) {
        return hex.map(value => value.charAt(0)).join('');
    }
    return hex.join('');
}

export  const rgbaToArgbHex = (r:number, g:number, b:number, a:number) => {
    const hex = [
        toTwoDigits(convertDecimalToHex(a)),
        toTwoDigits(Math.round(r).toString(16)),
        toTwoDigits(Math.round(g).toString(16)),
        toTwoDigits(Math.round(b).toString(16))
    ];
    return hex.join('');   
}
export const convertHexToDecimal = (h: string) => {
    return parseIntFromHex(h) / 255;
}
export const parseIntFromHex = (value:string) => {
    return parseInt(value, 16);
}
export const numberInputToObject = (color:number) => {
    return {
        r: color >> 16,
        g: (color & 0xff00) >> 8,
        b: color & 0xff
    }
}