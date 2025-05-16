import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * LogoutUser
 * @author Chaimaa El Jarite
 */
function LogoutUser({ setLoginValues }) {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("email");
        setLoginValues({ email: "", password: "" });
        navigate("/user/login");
    }, [navigate, setLoginValues]);

    return null; // keine UI nötig, da es nur weiterleitet
}

export default LogoutUser;
