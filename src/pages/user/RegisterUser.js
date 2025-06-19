import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUser } from '../../comunication/FetchUser';
import ReCAPTCHA from 'react-google-recaptcha';

function RegisterUser({ loginValues, setLoginValues }) {
    const navigate = useNavigate();
    const captchaRef = useRef(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        captchaToken: "",
    };

    const [credentials, setCredentials] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState('');

    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false,
    });

    const validatePassword = (password) => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    const handlePasswordChange = (value) => {
        setCredentials((prev) => ({ ...prev, password: value }));
        setPasswordChecks({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            number: /\d/.test(value),
            special: /[@$!%*?&]/.test(value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (credentials.password !== credentials.passwordConfirmation) {
            setErrorMessage('Password and password-confirmation are not equal.');
            return;
        }

        if (!validatePassword(credentials.password)) {
            setErrorMessage('Password must be at least 8 characters long, include an uppercase letter, a number and a special character.');
            return;
        }

        const token = captchaRef.current.getValue();
        if (!token) {
            setErrorMessage('Captcha muss gelöst werden.');
            return;
        }

        const payload = {
            ...credentials,
            captchaToken: token,
        };

        try {
            await postUser(payload);
            setLoginValues({ userName: credentials.email, password: credentials.password });
            setCredentials(initialState);
            navigate('/');
        } catch (error) {
            console.error('Failed to fetch to server:', error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="register-wrapper">
            <h2 className="register-title">Register user</h2>

            <form onSubmit={handleSubmit}>
                <div className="register-block">
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={credentials.firstName}
                        onChange={(e) => setCredentials((prev) => ({ ...prev, firstName: e.target.value }))}
                        required
                        placeholder="Peter"
                    />

                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={credentials.lastName}
                        onChange={(e) => setCredentials((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                        placeholder="Rutschmann"
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        value={credentials.email}
                        onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        placeholder="peter@example.ch"
                    />

                    <label>Password:</label>
                    <div className="input-with-icon">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={credentials.password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            required
                            placeholder="New Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="toggle-visibility"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    <ul className="password-rules">
                        <li className={passwordChecks.length ? 'valid' : 'invalid'}>
                            {passwordChecks.length ? '✔' : '✘'} Minimum 8 characters
                        </li>
                        <li className={passwordChecks.uppercase ? 'valid' : 'invalid'}>
                            {passwordChecks.uppercase ? '✔' : '✘'} 1 uppercase
                        </li>
                        <li className={passwordChecks.number ? 'valid' : 'invalid'}>
                            {passwordChecks.number ? '✔' : '✘'} 1 number
                        </li>
                        <li className={passwordChecks.special ? 'valid' : 'invalid'}>
                            {passwordChecks.special ? '✔' : '✘'} 1 special character (@$!%*?&)
                        </li>
                    </ul>


                    <label>Password confirmation:</label>
                    <div className="input-with-icon">
                        <input
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            value={credentials.passwordConfirmation}
                            onChange={(e) => setCredentials((prev) => ({ ...prev, passwordConfirmation: e.target.value }))}
                            required
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                            className="toggle-visibility"
                        >
                            {showPasswordConfirmation ? '🙈' : '👁️'}
                        </button>
                    </div>

                    <div className="recaptcha-box">
                        <ReCAPTCHA sitekey="6Lf-2V8rAAAAAA7LrctP9xin37TD2HX8g01wJaMF" ref={captchaRef} />
                    </div>

                    <button type="submit" className="register-button">Register</button>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
}

export default RegisterUser;
