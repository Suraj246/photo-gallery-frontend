import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login() {
    // const [cookies] = useCookies([]);
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (cookies.jwt) {
    //         navigate("/");
    //     }
    // }, [cookies, navigate]);

    const [input, setInput] = useState({ email: "", password: "" });
    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right",
        });
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!input.email || !input.password) {
            toast.error("Please enter a valid email or password")
            return
        }
        try {
            const { data } = await axios.post(
                "https://photo-gallerly-backend.onrender.com/login",
                {
                    ...input,
                },
                // { withCredentials: true }
            );
            console.log();
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    localStorage.setItem("iduser", data.user);
                    navigate("/");
                }
            }
        } catch (ex) {
            alert(ex)
        }
    };

    useEffect(() => {
        localStorage.getItem('iduse')
    }, [])

    return (
        <div className="container-signup">
            <div className="signup-left">
                <div className="signup-msg-left">
                    <h1 className="signup-title-left">Welcome to Photo Gallery</h1>
                    <p className="signup-para-left">lets get you all set up so start with your account and begin setting up your profile</p>
                </div>
            </div>
            <div className="signup-right">
                <div className="signup-form-container">
                    <div className="signup-msg-right">
                        <span className="signup-title-right">Welcome back!</span>
                        <span className="signup-para-right">Please Enter your details</span>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>


                        <div className="form-group-first">
                            <div className="form-group-input">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="input"
                                    name="email"
                                    // placeholder="Email"
                                    autoComplete="off"
                                    value={input.email}
                                    onChange={inputHandler}
                                />
                            </div>

                        </div>
                        <div className="form-group-input">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="input"
                                // placeholder="Password"
                                name="password"
                                autoComplete="off"
                                value={input.password}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="login-forgetp">
                            <div>
                                <input type="checkbox" name="" id="checkbox" />
                                <span>Remeber me</span>
                            </div>
                            <div>
                                <NavLink to="" className="a">Forget Password? </NavLink>
                            </div>
                        </div>
                        <button type="submit" className="signup">Log In</button>
                        <div>
                            <span>Don't have an account ?</span>
                            <NavLink to="/signup" className="a"> Sign Up</NavLink>
                        </div>
                    </form>
                </div>

            </div>

            <ToastContainer />
        </div>
    );
}

export default Login;