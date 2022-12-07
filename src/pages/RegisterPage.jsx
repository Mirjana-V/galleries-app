import React, { useState } from "react";
import RegisterComponent from "../components/RegisterComponent";
import { useHistory } from "react-router-dom";
import { authService } from "../services/AuthService";

export default function RegisterPage() {
    const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', password: '', password_confirmation: '' });
    const history = useHistory();

    const handleOnRegister = async (e) => {
        e.preventDefault();
        if (newUser.password !== newUser.password_confirmation) {
            alert('password not matching')
        }
        const response = await authService.register(newUser);
        if (response) {
            alert('Registration successful.');
            history.push("/login");
        }
    };

    return (
        <RegisterComponent
            handleOnRegister={handleOnRegister}
            newUser={newUser}
            setNewUser={setNewUser}
        />
    )

}