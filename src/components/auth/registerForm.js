


import React from "react";
import axios from "axios";
import {Appcontext} from "../context"
import {useHistory} from "react-router-dom";
import "./login.css"

function RegisterForm(){
    let history = useHistory()
    const{userEmail , setUserEmail} = React.useContext(Appcontext)
    const{password, setPassword , name , setName} = React.useContext(Appcontext)
    const {api}= React.useContext(Appcontext)
    const{msg , setmsg} = React.useContext(Appcontext)

    async function register(){
        try{
            const response = await axios.post(api + "/register",{
                name : name , 
                email : userEmail,
                password : password
            })
           
            
            if(response.data.message==="user registered successfully"){
                window.localStorage.setItem("auth" , response.data.authToken)
                // history.push("/shirts")
                setmsg(response.data.message)
                history.push("/login")
                setUserEmail("")
                setPassword("")
                setName("")
            }else{
                
                // history.push("/login")
                setmsg(response.data.message)
                setUserEmail("")
                setPassword("")
                setName("")
                console.log(msg)
            }
            
        }catch(error){
            console.log(error)
        }
       
    }


    function handleChange(event){
        switch (event.target.name) {
            case "name":
                setName(event.target.value)
                break;
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
            register()
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
                        <p className="topHead">Register/SignUp</p>
                        {
                            msg!=="" ? <p className="errMsg">{msg}</p> : null
                        }
                    </div>
                    <form onSubmit={handleSubmit} className="loginInfo">
                    <input type="text" className="form-control frms" name="name" value={name} placeholder="Enter name" 
                         onChange={handleChange} required></input><br/>
                        <input type="email" className="form-control frms" name="email" value={userEmail} placeholder="Enter your email-id" 
                         onChange={handleChange} required></input><br/>
                        <input type="password"  className="form-control frms" name="password" value={password} placeholder="Enter Password"  
                         onChange={handleChange} required></input><br/>
                        <button type = "submit" className="btn btn-primary btn-lg btn-block logInBtn">Register</button>
                        <button type = "button" onClick={()=>{
                            history.push("/login")
                        }} className="btn btn-danger btn-lg btn-block logInBtn">Cancel</button>
                    </form>
                <hr style={{margin:"0px" }}/>
                {/* <div style={{textAlign:"center"}}>
                    <Link to="/register">
                        <p className="link1">Register/signUp</p>
                    </Link>
                    <Link to="/forgetPassword">
                        <p className="link2">Forget Password</p>
                    </Link>
                </div> */}
                </div>
            </div>
        </div>
        </>
    )
}

export default RegisterForm;