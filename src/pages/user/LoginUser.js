import { useNavigate } from 'react-router-dom';

/**
 * LoginUser
 * @author Peter Rutschmann
 */
function LoginUser({loginValues, setLoginValues}) {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Simuliere erfolgreichen Login
        const user = {
            email: loginValues.email,
            password: loginValues.password
        };
    
        // 1. Speichere die Daten im Zustand
        setLoginValues(user);
    
        // 2. Speichere auch im localStorage (damit es bei Refresh bleibt)
        localStorage.setItem('login', JSON.stringify(user));
    
        // 3. Weiter zur Startseite
        navigate('/');
    };

    return (
        <div>
            <h2>Login user</h2>
            <form onSubmit={handleSubmit}>
                <section>
                    <aside>
                        <div>
                            <label>Email:</label>
                            <input
                                type="text"
                                value={loginValues.email}
                                onChange={(e) =>
                                    setLoginValues(prevValues => ({...prevValues, email: e.target.value}))}
                                required
                                placeholder="Please enter your email *"
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="text"
                                value={loginValues.password}
                                onChange={(e) =>
                                    setLoginValues(prevValues => ({...prevValues, password: e.target.value}))}
                                required
                                placeholder="Please enter your password *"
                            />
                        </div>
                    </aside>
                </section>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginUser;