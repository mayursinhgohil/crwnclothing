import { useState, FormEvent, ChangeEventHandler, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from "firebase/auth";

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import './sign-up-form.styles.scss'
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (password != confirmPassword) {
            alert("Passwords do not match!")
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use!')
            }
            console.log('user creation error ', error);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={'Display Name'}
                    type="text"
                    required
                    onChange={handleChange}
                    value={displayName}
                    name="displayName" />
                <FormInput
                    label={'Email'}
                    type="email"
                    required
                    onChange={handleChange}
                    value={email}
                    name="email" />
                <FormInput
                    label={'Password'}
                    type="password"
                    required
                    onChange={handleChange}
                    value={password}
                    name="password" />
                <FormInput
                    label={'Confirm Password'}
                    type="password"
                    required
                    onChange={handleChange}
                    value={confirmPassword}
                    name="confirmPassword" />
                <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base} >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm