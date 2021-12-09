
import React from "react";
import { Appcontext } from "./context";
import Nav from "./navbar";
import jwt from "jsonwebtoken";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/detail.css"
import axios from "axios";

import { useHistory } from "react-router";
toast.configure()

function Details(props){
    // const {itemDetail} = React.useContext(Appcontext)
    const {quantities , setQuantity} = React.useContext(Appcontext)
    const {prdSize , setPrdSize , api } = React.useContext(Appcontext)
    const { setCartLength } = React.useContext(Appcontext)

    //using token stored in the local storage 
    let token = window.localStorage.getItem("auth")
    let userData = jwt.decode(token)
    let path = props.location.pathname

    const storeData = window.localStorage.getItem("infos")
    let history = useHistory()
    const answer = JSON.parse(storeData)
   
    // creating instance 
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })

    // adding to cart 
    async function cart(values){
        try{
            if(token && userData.exp*1000 >= Date.now() && values === 1){
            const response = await instance.put(api + "/addCart", {
               productName : answer.productName,
               price : answer.price * quantities,
               image : answer.image,
               quantity : quantities,
               size : prdSize,
               type: answer.type
            })
            // console.log(response.data)
            setCartLength(response.data)
            setQuantity(1)
            toast.success('Added to Cart', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            }
            else if(token && userData.exp*1000 >= Date.now() && values === 2){
            const response = await instance.put(api + "/wishlist", {
                productName : answer.productName,
                price : answer.price * quantities,
                image : answer.image,
                quantity : quantities,
                size : prdSize,
                type: answer.type
            })
           
            setCartLength(response.data)
            setQuantity("")
            toast.success('Added to Wishlist', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            }
           
            else{
                history.push("/login")
            }
        }catch(error){
            console.log(error)
        }
    }

    // handelling the changes of  the quantity
    function handleChange(event){
        switch (event.target.name) {
          case "qty":
            setQuantity(event.target.value)
            break;
    
          default:
            break;
        }
      }

    return(
        <>
        <Nav/>
        <div style={{width:"800px" , height:"auto" , paddingLeft:"50px"}}>
          <div style={{ fontFamily: 'Source Sans Pro,sans-serif'}}>
              <p className="dt2">Home/{answer.type}{path}/{answer.productName }</p>
          </div>
        </div>
        <hr style={{margin:"0px" }}/>
        <div className="container-fluid">
            <div className="row">
                <div className = "col-lg-5 gg">
                    <div className="itemdetails">
                        <img className="detailImg" src={answer.image} alt="dt"/>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div>
                        <p className="prdssName">{answer.productName}</p>
                        <p className="ctg">Categories : {answer.type}</p>
                        <p className="qnty">{answer.quantity}</p>
                    </div>
                    <hr style={{margin:"0px"}}/>
                    <div> 
                        <p className="productPrice"> Rs. {answer.price}</p>
                    </div>
                    <hr style={{margin:"0px"}}/>
                    <div>
                        <p className="sizes">Please Select Size : </p>
                        <div className="sizeDiv">
                            {
                                answer.size.map((item)=>{
                                    return(
                                    <button style={prdSize===item ?{backgroundColor:"#00D7E3"} : {backgroundColor:"white"}}
                                    className="sizeBtn"onClick={()=>{
                                    setPrdSize(item)
                                    // setSizeButton(!sizeButton)
                                    }}>{item}</button>
                                    )
                                })
                            }
                        </div>
                        <div className="quantityDiv">
                            <label>Quantity : </label>
                            <select onChange={handleChange} name="qty">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="returnPolicy">
                        <i className="fas fa-people-carry fa-2x dd"></i>
                        <p className="rtn">Easy 30 day return policy. No questions asked.</p>
                        </div>
                        <div className="btnCart">
                            <button className="cartBtn addBtn" onClick={()=>{cart(1)}}><i className="fas fa-shopping-cart" style={{marginRight:"10px"}}>
                                </i>Add To Cart</button>
                            <button className="cartBtn wishBtn" onClick={()=>{cart(2)}}>
                            <i className="fas fa-heart wishBtn" style={{marginRight:"10px"}}></i>
                                Add To Wishlist</button>
                        </div>
                       
                    </div>
                    <hr style={{margin:"16px 0px"}}/>
                    <div className="description">
                        <p className="sizes">Product Description : </p>
                        <p className="info">{answer.details}</p>
                    </div>
                    <hr style={{marginTop:"0px"}}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Details;