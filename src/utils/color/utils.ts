/**
 * 需要將 1.0 處理為 100%，因為一旦它是一個數字，就無法區分它和 1
 * @hidden
 */
export const hasPoint = (value: string): boolean => {
    // if(typeof value === 'string') {
    return value.indexOf('.') !== -1 && !isNaN(parseFloat(value))
    // }  
    // return false
}
/**
 * 檢查傳入的字符串是否是百分比
 * @hidden
 */
export const hasPercentage = (value: string): boolean => {
    // if (typeof value === 'string') {
    return value.indexOf('%') !== -1 
    // }
    // return false
}
/**
 * 將小數替換為百分比值
 * @hidden
 */
export const toPercentage = (value: number): string => {
    if(value < 1) {
        return `${value * 100}%`
    }
    return `${value}%`
}
/**
 * 強制十六進制值為 2 個字符
 * @hidden
 */
export const toTwoDigits = (hex: string): string => {
    return hex.padStart(2, '0')
}
/**
 * 返回有效的 alpha 值 [0,1]，所有無效值都將設置為 1
 * @hidden
 */
export const normalizedAlpha = (value: number | string):number => {
    value = parseFloat(value as string);
    if(isNaN(value) || value < 0 || value > 1) {
        value = 1;
    }
    return value;
}
/**
 * 將數字限制在 0 和 1 之間
 * @hidden
 */
export const clampZeroToOne = (value: number): number => {
    return Math.min(1, Math.max(0, value));
}
/**
 * 將數字限制在特定範圍
 * @param value 
 * @param max 
 * @hidden
 */
export const clampValue = (value:string, max:number):number => {
    return Math.min(max, Math.max(0, parseFloat(value)));
}

export const clampToMax = (value:number, max:number): number => {
    return value % max;
}
export const normalizeZeroToOne = (value: number | string, max:number): number => {
    if(hasPoint(value as string)){
        value = '100%';
    }
    const hasPercent = hasPercentage(value as string);
    value = max === 360 ? Number(value) : clampValue(value as string,max);
    // 轉換成數字
    if(hasPercent){
        value = parseInt(String(value as number * max),10) / 100;
    }
    if(Math.abs(value as number - max) < 0.000001) {
        return 1;
    }
    // 讓數字在 0 和 1 之間
    const clampToMax = (value as number) % max
    if(max === 360) {
        // 如果值是以度數給定的色相，
        // 將超出範圍的值包裹到 [0, 360] 範圍內，
        // 然後轉換為 [0, 1]。
        value = (clampToMax < 0 ? clampToMax + max : clampToMax) / parseFloat(String(max));         
    } else {
        // 如果值不是以度數給定的色相，
        // 則將其轉換為 [0, 1] 範圍內。
        value = clampToMax / parseFloat(String(max));
    }
    return value;
}

// 檢查是否是嚴格模式
export const isStrictMode = (() => {
    return !this;
})();
// 參考ctrl tinyColor