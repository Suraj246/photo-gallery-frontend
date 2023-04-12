import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";
function Register() {
    // const [cookies] = useCookies(["cookie-name"]);
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (cookies.jwt) {
    //         navigate("/");
    //     }
    // }, [cookies, navigate]);

    const [input, setInput] = useState({ firstName: "", lastName: "", phoneNumber: "", email: "", password: "" });

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right",
        });
    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { firstName, lastName, email, password, phoneNumber } = input

        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            toast.error("Please enter a valid email or password")
            return
        }
        try {
            const { data } = await axios.post(
                "https://photo-gallerly-backend.onrender.com/register",
                {
                    ...input,
                },
                // { withCredentials: true }
            );
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    navigate("/");
                }
            }
        } catch (ex) {
            alert(ex)
        }
    };
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
                        <span className="signup-title-right">Begin your journey!</span>
                        <span className="signup-para-right">Get started with the best platform for design</span>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group-first">
                            <div className="form-group-input">
                                <label htmlFor="firstname">First Name*</label>
                                <input
                                    type="text"
                                    className="input"
                                    name="firstName"
                                    // placeholder="FirstName"
                                    autoComplete="off"
                                    value={input.firstName}
                                    onChange={inputHandler}
                                />
                            </div>
                            <div className="form-group-input">
                                <label htmlFor="lastname">Last Name*</label>
                                <input
                                    type="text"
                                    className="input"
                                    name="lastName"
                                    // placeholder="lastname"
                                    autoComplete="off"
                                    value={input.lastName}
                                    onChange={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="form-group-first">
                            <div className="form-group-input">
                                <label htmlFor="email">Email Address*</label>
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
                            <div className="form-group-input">

                                <label htmlFor="phone">Phone Number*</label>
                                <input
                                    type="tel"
                                    className="input"
                                    id="phone"
                                    name="phoneNumber"
                                    autoComplete="off"
                                    value={input.phoneNumber}
                                    onChange={inputHandler}
                                />
                            </div>
                        </div>
                        <div className="form-group-input">
                            <label htmlFor="password">Password*</label>
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
                        <div className="form-terms">
                            <input type="checkbox" name="" id="checkbox" />
                            <span>By signing you agree to our User Agreement. Terms of Service & Privacy Policy</span>
                        </div>
                        <button type="submit" className="signup">Sign Up</button>
                        <div>
                            <span>Already have an account ?</span>
                            <NavLink to="/signin" className="a"> Log In</NavLink>
                        </div>
                    </form>
                </div>

            </div>

            <ToastContainer />
        </div>
    );
}

export default Register;