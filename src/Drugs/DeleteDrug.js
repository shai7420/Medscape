import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import checkAuth from '../store/checkAuth';
import "./new.css";

function DeleteDrug() {
    const {postId} = useParams();
    var user = useSelector(store=>store.auth.user)
    var navigate = useNavigate();

    function deleteMedicine() {
        axios.delete('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
            headers:{'Authorization':"Bearer "+ user.token}
            
        }).then(response=>{
            navigate('/Drugs/posts')
        })
    }

    function Cancel(){
        navigate('/Drugs/posts')
    }

  return (
    <div className='Delete'>
    <Navbar/>
    <div style={{marginTop:"100px"}} className="container">
        <div className="row">
            <div className="col-6 offset-3">
                <div className="card">
                    <div className="card-header">
                        <h4 style={{color:"#15a6b4"}}>Delete Drug</h4>
                    </div>
                    <div className="card-body">
                        <p className='text-center'>Are you sure you want to Delete the Drug ?</p><hr/>
                        <div className='form-group'>
                            <button style={{width:"100px", height:"40px", fontSize:"15px", backgroundColor:"#FF0000", color:"white", textDecoration:"none"}} className='btn float-left' onClick={deleteMedicine}>Delete</button>
                            <button style={{width:"100px", height:"40px", fontSize:"15px", backgroundColor:"#15a6b4", color:"white", textDecoration:"none"}} className='btn float-right' onClick={Cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default checkAuth(DeleteDrug);
