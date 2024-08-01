export default function useButtonStyle (props:any) {
    let styles:{[key:string]: string} = {}
    // 預設按鈕背景色、文字色、滑入、按下的背景色
    styles["--nibu-button-text-color"] = props.textColor;
    styles["--nibu-button-text-hover-color"] = props.textColor;
    styles["--nibu-button-text-active-color"] = props.textColor;
    styles["--nibu-button-color"] = props.bg;
    styles["--nibu-button-hover-color"] = `color-mix(in srgb, ${props.bg} 80%, white)`;
    styles["--nibu-button-active-color"] = `color-mix(in srgb, ${props.bg} 80%, black)`;
    styles["--nibu-button-opacity"] = "1";
    
    // 如果按鈕為純文字，則按鈕背景色為無、文字色為背景色
    if(props.text) {
        styles["--nibu-button-text-color"] = props.bg;
        styles["--nibu-button-disabled-color"] = "none";
        styles["--nibu-button-text-hover-color"] = `color-mix(in srgb, ${props.bg} 80%, white)`;
        styles["--nibu-button-text-active-color"] = `color-mix(in srgb, ${props.bg} 80%, black)`;
        styles["--nibu-button-color"] = "none";
        styles["--nibu-button-hover-color"] = "none";
        styles["--nibu-button-active-color"] = "none";
        styles["--nibu-button-disabled-color"] = "none";
    }
    // 如果按鈕為圓角，則按鈕邊框半徑為20px
    if(props.round) {
        styles["--nibu-button-border-radius"] = "20px";
    }
    // 如果按鈕為圓形，則按鈕寬高為2rem
    if(props.circle) {
        styles["--nibu-button-border-radius"] = "50%";
        styles["--nibu-button-width"] = "2rem";
        styles["--nibu-button-height"] = "2rem";
        styles["text-wrap"] = "nowrap";
    }
    // 如果按鈕為disabled或loading狀態，則按鈕滑入、按下的效果為無
    if(props.disabled || props.loading) {
        styles["cursor"] = "not-allowed";
        styles["--nibu-button-opacity"] = "0.7";
    }
    // 如果是純文字按鈕，且disabled或loading狀態，則按鈕滑入、按下的文字色為混合色
    if((props.disabled || props.loading) && props.text) {
        styles["--nibu-button-text-hover-color"] = `color-mix(in srgb, ${props.bg} 70%, white)`;
        styles["--nibu-button-text-active-color"] = `color-mix(in srgb, ${props.bg} 70%, white)`;
        styles["--nibu-button-text-color"] = `color-mix(in srgb, ${props.bg} 70%, white)`;
    }
    // 如果不是純文字按鈕，且disabled或loading狀態，則按鈕滑入、按下背景色為混合色
    if((props.disabled || props.loading) && !props.text) {      
        styles["--nibu-button-color"] = `color-mix(in srgb, ${props.bg} 70%, white)`;
        styles["--nibu-button-hover-color"] = `color-mix(in srgb, ${props.bg} 70%, white)`;
        styles["--nibu-button-active-color"] = `color-mix(in srgb, ${props.bg} 70%, white)`;
        styles["--nibu-button-disabled-color"] = `color-mix(in srgb, ${props.bg} 70%, white)`;
    }

    return styles
}