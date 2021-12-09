

import React from "react";
import axios from "axios";
import {Appcontext} from "../context"
import { useHistory} from "react-router-dom";
import "./login.css"

function ForgetPass(){
    let history = useHistory()
    const{userEmail , setUserEmail} = React.useContext(Appcontext)
    const {api}= React.useContext(Appcontext)
    const{msg , setmsg} = React.useContext(Appcontext)

    async function reset(){
        try{
            const response = await axios.put(api + "/reset",{       
                email : userEmail,             
            })
            console.log(response.data)
            
            if(response.data.message==="user registered successfully"){
                window.localStorage.setItem("auth" , response.data.authToken)
                // history.push("/shirts")
                setmsg(response.data.message)
                // history.push("/login")
                setUserEmail("")   
            }else{   
                // history.push("/login")
                setmsg(response.data.message)
                setUserEmail("")
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
            default:
                break;
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        if(userEmail===""){
            return(alert ("Please enter valid inputs"))
        }else{
            reset()
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
                    <div className="headingLogin" style={{marginTop:"50px"}}>
                        <p className="topHead">Reset Password</p>
                        {
                            msg!=="" ? <p className="errMsg" style={{color:"green"}}>{msg}</p> : null
                        }
                    </div>
                    <form onSubmit={handleSubmit} className="loginInfo">
                        <input type="email" className="form-control frms" name="email" value={userEmail} placeholder="Enter your email-id" 
                         onChange={handleChange} required></input><br/>
                        <button type = "submit" className="btn btn-primary btn-lg btn-block logInBtn">Reset</button>
                        <button type = "button" onClick={()=>{
                            history.push("/login")
                        }} className="btn btn-danger btn-lg btn-block logInBtn">Cancel</button>
                    </form>
                <hr style={{margin:"0px" }}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default ForgetPass;