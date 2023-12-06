import axios from "axios";
import Navbar from "./Navbar";
import FormInput from "./Form component/FormInput";
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import checkGuest from './store/checkguest'

const Signup = () => {
    const navigate = useNavigate();
    function loginpage(){
        navigate('/Login')
    }

    var [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const Inputs = [
        {
            id:1,
            label:"Username:",
            name:"name",
            placeholder:"Username",
            errormessage:"Username should be 3-10 characters",
            type:"text",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required:true,
        },
        {
            id:2,
            label:"Email:",
            name:"email",
            placeholder:"Email",
            errormessage:"It should be a valid Email address!",
            type:"email",
            required:true,
        },
        {
            id:3,
            label:"Password:",
            name:"password",
            placeholder:"Password",
            errormessage:"Password should be 7-15 characters",
            type:"password",
            pattern: "^[A-Za-z0-9!@#$%^&*]{7,15}$",
            required:true,
        },
        {
            id:4,
            label:"Confirm Password:",
            name:"password_confirmation",
            placeholder:"Confirm Password",
            errormessage:"Passwords don't match",
            type:"password",
            required:true,
        },
    ];

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.password_confirmation) {
            setErrorMessage("Passwords don't match");
            return;
        }
        axios.post("https://medicalstore.mashupstack.com/api/register", form)
            .then((response) => {
                setErrorMessage('');
            })
            .catch((error) => {
                console.log(error.response.data);
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else {
                setErrorMessage('Failed to connect to API');
            }
            });
    };

    return (
        <>
            <Navbar/>
            <div className="Sg">
                <form onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    {Inputs.map((Input) => (
                        <FormInput
                            key={Input.id}
                            {...Input}
                            value={form[Input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button type="submit">Submit</button>
                    {errorMessage?<p style={{color:"red"}}>{errorMessage}</p>:''}
                    <div>
                        <p>
                            Already have an account?
                            <span className="btn" onClick={loginpage}>
                                Login
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default checkGuest(Signup);