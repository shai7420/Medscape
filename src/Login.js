import axios from "axios";
import Navbar from "./Navbar";
import FormInput from "./Form component/FormInput"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from './store/authSlice';
import "./Login.css"
import checkGuest from './store/checkguest'

const Login = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    function Signuppage(){
        navigate('/Signup')
    }
    
    var [errorMessage, setErrorMessage] = useState('');
    const[form, setForm] =useState({
        email:"",
        password:"",
    });

    const Inputs = [
        {
            id:1,
            label:"Email:",
            name:"email",
            placeholder:"Email",
            errormessage:"It should be a valid Email address!",
            type:"email",
            required:true,
        },
        {
            id:2,
            label:"Password:",
            name:"password",
            placeholder:"Password",
            errormessage:"Password should be 7-15 characters",
            type:"password",
            pattern: "^[A-Za-z0-9!@#$%^&*]{7,15}$",
            required:true,
        },
    ];

    const onChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    };

    function handlerSubmit(e) {
        e.preventDefault();
        axios.post('https://medicalstore.mashupstack.com/api/login',form)
        .then(response=>{
            setErrorMessage('')
            console.log(response?.data?.token);
            var user = {
                email:form.email,
                token:response.data.token,
            }
            dispatch(setUser(user));
            navigate("/Drugs/posts");
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }

    console.log(form);
    return(
        <>
        <Navbar/>
            <div className="Tg">
                <form onSubmit={handlerSubmit}>
                    <h1>Login</h1>
                   {Inputs.map((Input) =>(<FormInput key={Input.id} {...Input} value={form[Input.name]} onChange={onChange}/>))}
                    <button type="submit">Submit</button>
                    {errorMessage?<p style={{color:"red"}}>{errorMessage}</p>:''}
                    <div className="last"><p>Don't have an account?<span className="btn" onClick={Signuppage}>Signup</span></p></div>
                </form>
            </div>
        </>
    )
}

export default checkGuest(Login);