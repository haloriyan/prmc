import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

const UserMiddleware = ({children}) => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (admin === null) {
            let myData = JSON.parse(window.localStorage.getItem('user_data'));
            console.log(myData);
            if (myData === null) {
                navigate('/login');
            } else {
                axios.post(`${config.baseUrl}/api/user/auth`, {
                    token: myData.token,
                })
                .then(response => {
                    let res = response.data;
                    if (res.status === 200) {
                        window.localStorage.setItem('user_data', JSON.stringify(res.user));
                        setAdmin(res.user);
                    } else {
                        navigate('/login')
                    }
                })
            }
        }
    }, [admin]);

    if (admin !== null) {
        return children;
    }
}

export default UserMiddleware;