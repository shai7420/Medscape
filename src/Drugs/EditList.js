import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../store/checkAuth";
import "./new.css";

function EditList() {
    const {postId} = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('')
    var user = useSelector(store=> store.auth.user);
    var navigate = useNavigate()

    useEffect(()=>{
        if(user){
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
            headers:{'Authorization':"Bearer "+ user.token}
        }).then(response=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry_date(response.data.expiry_date);
        })
    }},[postId, user]);

    function updatePost(){
        axios.post('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
            name: name,
            company: company,
            expiry_date: expiry_date,
        },
        
        {headers:{'Authorization':"Bearer "+ user.token}}
        
        ).then(response=>{
            navigate('/Drugs/posts')
        })
    }

    return(
    <div className="Edit">
        <Navbar/>
        <div style={{marginTop:"100px"}} className="container">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <div className="card-header">
                            <h4 style={{color:"#15a6b4"}}>Change Drug Information<Link className="btn" style={{width:"100px", height:"40px", float:"right", fontSize:"15px", backgroundColor:"#15a6b4", color:"white", textDecoration:"none"}} 
                            to={'/Drugs/posts'}>Back</Link></h4>
                        </div>
                        <div className="card-body">

                            <div className="form-group">
                                <label>Name:</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(event)=>{setName(event.target.value)}}
                                />
                            </div>

                            <div className="form-group">
                                <label>Class:</label>
                                <input 
                                className="form-control" 
                                value={company} 
                                onChange={(event)=>{setCompany(event.target.value)}}
                                />
                            </div>

                            <div className="form-group">
                                <label>Date:</label>
                                <input
                                type="date"
                                className="form-control"
                                value={expiry_date}
                                onChange={(event)=>{setExpiry_date(event.target.value)}}
                                />
                            </div>

                            <div className="form-group">
                                <button style={{width:"100px", height:"40px", float:"right", fontSize:"15px", backgroundColor:"#15a6b4", color:"white", textDecoration:"none"}} 
                                className="btn" onClick={updatePost}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default checkAuth(EditList);
          