import type { PropType } from "vue";
import { BaseLoading } from '../../icons/loading';
/**
 * @description 按鈕元件
 * type: 按鈕類型
 * bg: 按鈕背景顏色
 * loading: 是否顯示loading
 * loadingAlign: loading位置
 * loadingSpin: loading是否旋轉
 * loadingIcon: loading圖示
 * border: 是否有邊框
 * disabled: 是否禁用
 * textColor: 文字顏色
 * text: 是否為純文字按鈕
 * round: 是否為圓角按鈕
 * circle: 是否為圓形按鈕
 * 
 */
export const buttonProps = () => ({
    type: {
        String,
        default: "button"
    },
    bg: {
        String,
        default: "#FFACBB"
    },
    loading: {
        type: Boolean,
        default: false
    },
    loadingAlign: {
        type: String as PropType<"left" | "right">,
        default: "left"
    },
    loadingSpin: {
        type: Boolean,
        default: true
    },
    loadingIcon: {
        type: Object,
        default: () => BaseLoading
    },
    border: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    textColor: {
        type: String,
        default: "#fff"
    },
    text: {
        type:Boolean,
        default: false
    },
    round: {
        type: Boolean,
        default: false
    },
    circle: {
        type: Boolean,
        default: false
    }
})