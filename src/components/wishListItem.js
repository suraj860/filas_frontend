


import axios from "axios";
import React from "react";
import { Appcontext } from "./context";
import Nav from "./navbar";
import "../css/cart.css"
import jwt from "jsonwebtoken";
import { useHistory } from "react-router";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/detail.css"

toast.configure()
function WishListItems(){
    const {cartLength , setCartLength , api } = React.useContext(Appcontext)
    const {  setQuantity} = React.useContext(Appcontext)
    const {prdSize } = React.useContext(Appcontext)
    let token = window.localStorage.getItem("auth")

    let userData = jwt.decode(token)
    const storeData = window.localStorage.getItem("infos")
    let history = useHistory()
    const answer = JSON.parse(storeData)

    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })
   
    async function deleteItem(value){
        try{
            const response = await instance.put(api + "/removewishlist",{
                wishId: value.wishId
            })
            setCartLength(response.data)
        }catch(error){
            console.log(error)
        }
    }

   async function getWishList(){
       try{
           const response = await instance.get(api +"/getCart")
           setCartLength(response.data)
       }catch(error){
           console.log(error)
       }
   }
    
   React.useEffect(()=>{
       getWishList()
         // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])


    async function cart(items){
        try{
            if(token && userData.exp*1000 >= Date.now()){
                
            const response = await instance.put(api + "/addCart", {
               productName : items.productName,
               price : items.price ,
               image : items.image,
               quantity : items.quantity,
               size : prdSize,
               type: answer.type
            })
            
            setCartLength(response.data)
            setQuantity(1)
            toast.success('Added to Cart',{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            deleteItem(items)
            }
            else{
                history.push("/login")
            }
        }catch(error){
            console.log(error)
        }
    }

    

    return(
        <>
        <Nav/>
        {
           cartLength && cartLength.wishList.length !== 0 ?  
           <div className="container">
               <div className="row" style={{marginTop:"40px" , marginBottom:"20px"}}>
               <div className="col-lg-12 wl1">
            {
                cartLength.wishList.map((items)=>{
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
                            <p className="h5s">Total Price : <span className="span1">Rs. {items.price} </span></p>
                            <p className="h6s">Size: {items.size}</p>
                            <hr style={{margin:"0px" , marginBottom:"20px"}}/>
                            <button className="cartRemoveBtn btn123" onClick={()=>{cart(items)}}>Move to Cart</button>
                            <button className="cartRemoveBtn" onClick={()=>{deleteItem(items)}}>Remove</button>
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
export default WishListItems; 