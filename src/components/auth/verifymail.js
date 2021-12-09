

import React from "react";
import axios from "axios";
import { Appcontext } from "../context";
import { useHistory } from "react-router";



function VerifyEmail(props){
    const {api}= React.useContext(Appcontext)
    const [verified , setVerified] = React.useState("")
    let history = useHistory()
    let eToken = props.match.params.id
    async function verify(){
        try{
            const response = await axios.put(api + `/verify/${eToken}`)
            setVerified(response.data.message)
        }catch(error){
            console.log(error)
        }
    }
    React.useEffect(()=>{
        verify()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return(
        <>
        <div style={{marginTop:"20px" , textAlign:"center"}}>
            {
                verified  && verified==="you account is verified" ?
                <>
                <h5 style={{color:"yellowgreen" , marginBottom:"10px"}}>{verified}</h5>
                <button class="btn btn-success" onClick={()=>{
                    history.push("/login")
                }}>Ok</button>
                </>:
                verified  && verified==="something went wrong" ?
                <>
                <h5 style={{color:"red" , marginBottom:"20px"}}>{verified}</h5>
                <button class="btn btn-success" onClick={()=>{
                    history.push("/login")
                }}>Ok</button>
                </> : null
            }
        </div>
        </>
    )
}
export default VerifyEmail;