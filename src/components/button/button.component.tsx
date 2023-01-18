import { FC, ButtonHTMLAttributes } from 'react'
import './button.styles.scss'

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted'
}

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES,
    isLoading?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType = BUTTON_TYPE_CLASSES.base, isLoading = false, ...otherProps }) => {
    return (
        <button
            className={`button-container ${buttonType}`}
            disabled={isLoading}
            {...otherProps}
        >{children}</button>
    )
}

export default Button;