import { useState } from "react";
import "./FormInput.css"

export default function FormInput(props){
    const [errormsg, setErrormsg] = useState("");
    const { label,errormessage, onChange, id, ...Inputprops} = props;

    const handleError = (e) =>{
        setErrormsg("true");
    }
    return(
        <div className="FormInput">
          <label>{label}</label>
            <input {...Inputprops} 
            onChange={onChange} 
            onBlur={handleError}
            errormsg={errormsg.toString()}/>
            <span>{errormessage}</span>
        </div>
    )
}