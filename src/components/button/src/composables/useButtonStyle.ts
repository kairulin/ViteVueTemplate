export default function useButtonStyle (props:any) {
    console.log(props)
    let styles:{[key:string]: string} = {}
    styles["--nibu-button-text-color"] = props.textColor;
    styles["--nibu-button-color"] = props.text? "none" : props.disabled ? `color-mix(in srgb, ${props.bg} 70%, white)` :  props.bg;
    styles["--nibu-button-hover-color"] = props.text? "none" : props.disabled ? `color-mix(in srgb, ${props.bg} 70%, white)` :`color-mix(in srgb, ${props.bg} 80%, white)`;
    styles["--nibu-button-active-color"] = props.text? "none" : props.disabled ? `color-mix(in srgb, ${props.bg} 70%, white)` : `color-mix(in srgb, ${props.bg} 80%, black)`;
    styles["--nibu-button-disabled-color"] = props.text? "none" : `color-mix(in srgb, ${props.bg} 70%, white)`;
    styles["--nibu-button-border-radius"] = props.round ? "20px" : props.circle ? "50%" : "0.25rem";
    styles["--nibu-button-width"] = props.circle ? "2rem" : "auto";
    styles["--nibu-button-height"] = props.circle ? "2rem" : "auto";
    styles["text-wrap"] = props.circle ? "nowrap" : "wrap";
    return styles
}