import './button.styles.scss'

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonType, isLoading = false, ...otherProps }) => {
    return (
        <button
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            disabled={isLoading}
            {...otherProps}
        >{children}</button>
    )
}

export default Button;