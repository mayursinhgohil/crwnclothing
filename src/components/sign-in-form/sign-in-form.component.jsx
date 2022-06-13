import { useState } from "react"
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            const response = await signInAuthWithEmailAndPassword(email, password);
            resetFormFields()
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                alert('Incorrect password for email')
            } else if (error.code === "auth/user-not-found") {
                alert('Email does not exists')
            }
            console.log('user signin error ', error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value });
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button type="submit" >Sign In</Button>
                    <Button buttonType={"google"} onClick={signInWithGoogle} type="button" >Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm