

import React from "react";
import axios from "axios";
import {Appcontext} from "../context"
import {Link, useHistory} from "react-router-dom";
import "./login.css"

function Login(props){
    let history = useHistory()
    const{userEmail , setUserEmail} = React.useContext(Appcontext)
    const{password, setPassword} = React.useContext(Appcontext)
    const {api}= React.useContext(Appcontext)
    const{msg , setmsg} = React.useContext(Appcontext)
    

    async function login(){
        try{
            const response = await axios.post(api + "/login",{
                email : userEmail,
                password : password
            })
            if(response.data.authToken){
                window.localStorage.setItem("auth" , response.data.authToken)
                // history.push("/shirts")
                history.push("/")
                setUserEmail("")
                setPassword("")
                setmsg("")
            }else{
                
                // history.push("/login")
                setmsg(response.data.message)
                setUserEmail("")
                setPassword("")
                console.log(msg)
            }
            
        }catch(error){
            console.log(error)
        }
       
    }

   

    function handleChange(event){
        switch (event.target.name) {
            case "email":
                setUserEmail(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
            default:
                break;
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        if(userEmail==="" || password===""){
            return(alert ("Please enter valid inputs"))
        }else{
            login()
        } 
    }
    return(
        <>
        <div className="loginDiv">
            <div className="loginForm">
                <div style={{width:"auto"}}>
                    <img src="./images/shops.jpg" alt="c" className="logInImages"/>
                    {/* <p>yess done</p> */}
                </div>
                <div style={{width:"100%"}}>
                    <div className="headingLogin">
                        <p className="topHead">Please Log-In</p>
                        {
                            msg!=="" ? <p className="errMsg">{msg}</p> : null
                        }
                    </div>
                    <form onSubmit={handleSubmit} className="loginInfo">
                        <input type="email" className="form-control frms" name="email" value={userEmail} placeholder="Enter your email-id" 
                         onChange={handleChange} required></input><br/>
                        <input type="password"  className="form-control frms" name="password" value={password} placeholder="Enter Password"  
                         onChange={handleChange} required></input><br/>
                        <button type = "submit" className="btn btn-primary btn-lg btn-block logInBtn">Login</button>
                        <button type = "button" onClick={()=>{
                            history.push("/")
                        }} className="btn btn-danger btn-lg btn-block logInBtn">Cancel</button>
                    </form>
                <hr style={{margin:"0px" }}/>
                <div style={{textAlign:"center"}}>
                    <Link to="/register">
                        <p className="link1">Register/signUp</p>
                    </Link>
                    <Link to="/forgetPassword">
                        <p className="link2">Forget Password</p>
                    </Link>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;