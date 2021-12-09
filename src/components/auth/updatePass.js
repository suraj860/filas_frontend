

import React from "react";
import axios from "axios";
import {Appcontext} from "../context"
import { useHistory} from "react-router-dom";
import "./login.css"

function UpdatePassword(props){
    let history = useHistory()
   const[pass1 , setPass1] = React.useState("")
   const[pass2 , setPass2] = React.useState("")
    const {api}= React.useContext(Appcontext)
    const{msg , setmsg} = React.useContext(Appcontext)
    let tk = props.match.params.id
    async function reset(){
        try{
            const response = await axios.put(api + "/updatePassword",{       
                newpassword : pass1, 
                tk :  tk          
            })
          
            
            if(response.data.message==="Password resetted successfully"){
                history.push("/login")
                setmsg(response.data.message)
                // history.push("/login")
                setPass1("") 
                setPass2("")  
            }else{   
                // history.push("/login")
                setmsg(response.data.message)
                setPass1("")
                setPass2("")
            }
            
        }catch(error){
            console.log(error)
        }
       
    }


    function handleChange(event){
        switch (event.target.name) {     
            case "pass1":
                setPass1(event.target.value)
                break;
            case "pass2":
                setPass2(event.target.value)
                break;
            default:
                break;
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        if(pass1==="" && pass2===""){
            return(alert ("Please enter valid inputs"))
        }else if(pass1!==pass2){
           return (alert ("Please enter valid Password"))
        }else{
            reset()
        }
    }
    return(
        <>
        <div className="loginDiv">
            <div className="loginForm">
                <div style={{width:"auto"}}>
                    <img src="../images/shops.jpg" alt="c" className="logInImages"/>
                    {/* <p>yess done</p> */}
                </div>
                <div style={{width:"100%"}}>
                    <div className="headingLogin" style={{marginTop:"50px"}}>
                        <p className="topHead">Reset Password</p>
                        {
                            msg!=="" ? <p className="errMsg">{msg}</p> : null
                        }
                    </div>
                    <form onSubmit={handleSubmit} className="loginInfo">
                        <input type="password" className="form-control frms" name="pass1" value={pass1} placeholder="Create new password" 
                         onChange={handleChange} required></input><br/>
                         <input type="password" className="form-control frms" name="pass2" value={pass2} placeholder="Re-Enter password" 
                         onChange={handleChange} required></input><br/>
                        <button type = "submit" className="btn btn-primary btn-lg btn-block logInBtn">Reset</button>
                    </form>
                <hr style={{margin:"0px" }}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default UpdatePassword;