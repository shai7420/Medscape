import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../store/checkAuth";
import "./new.css";

function DrugList() {

    var user = useSelector(store=>store.auth.user)
    var [posts, setPosts]=useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    function fetchPosts() {
        if (!user || !user.token) {
            console.error('User is not logged in');
            return;
        }
    
        axios.get('https://medicalstore.mashupstack.com/api/medicine', {
            headers: { 'Authorization': "Bearer " + user.token }
        }).then(response => {
            setPosts(response.data);
        }).catch(error => {
            console.error('Error fetching posts:', error);
        });
    }
    
    useEffect(()=>{
        if(user){
        fetchPosts()
    }})

    const filteredPosts = posts.filter(item =>
        item.name.toLowerCase().startsWith(searchTerm.trim().toLowerCase())
    );

    var currentDate = new Date();
    
    var details = filteredPosts.map( (item, index) => {
        var expiryDate = new Date(item.expiry_date);
        var isExpired = expiryDate < currentDate;
        return(
            <tr key={index}  className={isExpired ? 'expired-row' : ''}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>
                    <Link to={`/Drugs/posts/${item.id}`} className="btn fa fa-eye" 
                    style={{float:"left", borderRadius:"10px", paddingTop:"12px", width:"50px", height:"40px", fontSize:"15px", backgroundColor:"#15a6b4", color:"white", textDecoration:"none"}}
                    ></Link>
                </td>
                <td>
                    <Link to={`/Drugs/posts/${item.id}/edit`} className="fa fa-pencil" 
                    style={{borderRadius:"10px", paddingLeft:"16px", paddingTop:"12px", width:"50px", height:"40px", fontSize:"15px", backgroundColor:"#ffda00", color:"white", textDecoration:"none"}}
                    ></Link>
                </td>
                <td>
                    <Link to={`/Drugs/posts/${item.id}/delete`} className="fa fa-trash" 
                    style={{borderRadius:"10px", paddingLeft:"18px", paddingTop:"12px", width:"50px", height:"40px", fontSize:"15px", backgroundColor:"red", color:"white", textDecoration:"none"}} 
                    ></Link>
                </td>
            </tr>
        )
    } );

    return (
        <div className="Drug">
        <Navbar/>
        <div style={{marginTop:"100px"}} className="container">
            <div className="form-group mb-0">
                <input style={{width:"25%", borderRadius:"12px",}} type="text" className="form-control" placeholder="Search by name..." 
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div style={{color:"white", opacity:"0.88"}} className="card">
                        <div className="card-header">
                            <h4 style={{color:"#15a6b4"}}>DrugList <Link className="btn" style={{width:"100px", height:"40px", float:"right", fontSize:"15px", backgroundColor:"#15a6b4", color:"white", textDecoration:"none"}} 
                            to={'/Drugs/posts/create'}>Add Drug</Link></h4>
                        </div>
                        <div style={{padding:"15px", paddingBottom:"5px"}} className="card-body">
                        <div  className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>View</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {details}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default checkAuth(DrugList);