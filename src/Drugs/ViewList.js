import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import {Link, useParams } from "react-router-dom"
import Navbar from "../Navbar";
import checkAuth from "../store/checkAuth";
import "./new.css";

function ViewList() {
    const {postId} = useParams()
    var [post,setPost] = useState({name:'',company:'', expiry_date:''})
    var user = useSelector(store=> store.auth.user);
    
    useEffect(()=>{
        if(user){
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
            headers:{'Authorization':"Bearer "+ user.token}
        }).then(response=>{
            setPost(response.data)
        })
    }},[postId, user]);

    return(
    <div className="View">
        <Navbar/>
        <div style={{marginTop:"100px"}} className="container">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <div className="card-header">
                            <h4 style={{color:"#15a6b4"}}>Drug<Link className="btn" style={{width:"100px", height:"40px", float:"right", fontSize:"15px", backgroundColor:"#15a6b4", color:"white", textDecoration:"none"}} 
                            to={'/Drugs/posts'}>Back</Link></h4>
                        </div>
                        <div className="card-body">
                            <h6><b>Name:</b>{post.name}</h6>
                            <h6><b>Class:</b>{post.company}</h6>
                            <h6><b>Date:</b>{post.expiry_date}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default checkAuth(ViewList);