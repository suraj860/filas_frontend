
import axios from "axios";
import React from "react";
import { Appcontext } from "./context";
import Nav from "./navbar";
import "../css/cart.css"
import jwt from "jsonwebtoken";
import { useHistory } from "react-router";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/detail.css";
toast.configure()
function UserOrders(){
    const {orderLength , setOrderLength , api } = React.useContext(Appcontext)
    // const {quantities , setQuantity} = React.useContext(Appcontext)
    // const {prdSize } = React.useContext(Appcontext)
    let token = window.localStorage.getItem("auth")

    let userData = jwt.decode(token)
    // const storeData = window.localStorage.getItem("infos")
    let history = useHistory()
    // const answer = JSON.parse(storeData)

    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })
  
    async function getPlacedOrders(){
        if(token && userData.exp*1000 >= Date.now()){
           try{
               const response = await instance.get(api +"/getOrders")
               setOrderLength(response.data)
           }catch(error){
               console.log(error)
           }}
           else{
            history.push("/login")
           }
       }
    
    async function cancelFinalOrder(value){
        try{
            await instance.put(api + "/cancelFinal_order",{
                id: value._id
            })
            getPlacedOrders()
        }catch(error){
            console.log(error)
        }
    }
        
    
   React.useEffect(()=>{
    getPlacedOrders()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

    return(
        <>
        <Nav/>
        {
           orderLength && orderLength.length !== 0 ?  
           <div className="container">
               <div className="row" style={{marginTop:"40px" , marginBottom:"20px"}}>
               <div className="col-lg-12 wl1">
            {
                orderLength.map((items)=>{
                    return(
                        <>
                        <div className="parentCart">
                            <div className="cartImage">
                                <img className="cartImg" src={items.image} alt="p"/>
                            </div>
                            <div style={{width:"100%"}}>
                            <p className="h1s">{items.productName}</p>
                            <p className="h2s">Categories: {items.type}</p>
                            <p className="h3s">Rs. {items.price / items.quantity }</p>
                            <p className="h4s">Qty. {items.quantity}</p>
                            <p className="h6s">Size: {items.size}</p>
                            <p className="h6s">Total Price : Rs. {items.total} / Payment Method : {items.pay}</p>
                            <p className="h2s">Will be Delivered in 4 Days <span style={{color:"red" , opacity:"0.5"}}>(
                                You can cancel your order within 24 hrs only)</span></p>
                            <hr style={{margin:"0px" , marginBottom:"20px"}}/>
                            <button className="cartRemoveBtn" onClick={()=>cancelFinalOrder(items)}>Cancel Order</button>
                            </div>
                        </div>
                        <hr style={{margin:"0px"}}/>
                        </>
                    )
                })
            }  
            </div>

            </div>
        </div> :
       <div>
             <div style={{width : "550px" , height:"450px" ,margin:"90px auto 0px auto"}}>
                <img src="./images/empty-cart.png" alt="cc" style={{width:"100%" , height:"100%"}}/>
            </div>
        </div>
        }
        
        </>
    )
}
export default UserOrders; 