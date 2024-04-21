import {CSSProperties, FC} from "react";

interface Props {
    text: string,
    type?: "button" | "submit" | "reset",
    style?: CSSProperties,
    color?: "red" | "gray",
    disabled?: boolean
}

const AppButton: FC<Props> = (
    {
        text,
        type,
        style,
        color,
        disabled
    }
) => {
    return (
        <button
            className={
                "app-button " +
                (color ? "app-button-" + color : "app-button-red")
            }
            style={style}
            type={type ?? 'button'}
            disabled={disabled ?? false}
        >
            {text}
        </button>
    );
}

export default AppButton;