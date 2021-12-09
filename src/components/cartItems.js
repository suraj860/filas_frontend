

import axios from "axios";
import React from "react";
import { Appcontext } from "./context";
import Nav from "./navbar";
import {  toast } from 'react-toastify';
import GooglePayButton from "@google-pay/button-react";
import 'react-toastify/dist/ReactToastify.css';
import "../css/cart.css"
import { useHistory } from "react-router";

toast.configure()
function CartItems (){
    const {cartLength , setCartLength , api ,prices ,setPrice} = React.useContext(Appcontext)
    const{payType , setPayType } = React.useContext(Appcontext)
    const{addressFormState, setAddressFormState} = React.useContext(Appcontext)
    const[gpay , setGpay] = React.useState(false)
    const[formKey , setkey] = React.useState(0)
   
   let history = useHistory()

    const [address , setAddress] = React.useState({
        fullName:"",
        mob:"",
        pin:"",
        flat:"",
        area:"",
        landMark:"",
        city:""
    })

    
    let token = window.localStorage.getItem("auth")

    // checking the form states
    function lets(){
        if(payType==="gpay" && address.fullName!=="" && address.mob!=="" && address.pin!=="" && address.flat!=="" &&
        address.area!=="" && address.landMark!=="" && address.city!==""){
            setGpay(true)
        }
        else{
            return(setGpay(false))
        }
    }
    React.useEffect(()=>{
        lets()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[payType , address])
    

    // creating an instance for the axios
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })
    
    // deleting an item from the cart
    async function deleteItem(value){
        try{
            const response = await instance.put(api + "/removeCart",{
                cartId: value.cartId
            })
            setCartLength(response.data)
            setPrice(response.data.cart)
        }catch(error){
            console.log(error)
        }
    }

    // placeing an order with required data
    async function placeOrder(item){
        try{
             await instance.post(api +"/orders",{
                productName:item.productName,
                price:item.price,
                image:item.image,
                quantity:item.quantity,
                size:item.size,
                type:item.type,
                userId:item.userId,
                cartId:item.cartId,
                pay:payType,
                pin:address.pin,
                total:price + 50 ,
                fullName:address.fullName,
                mob:address.mob,
                area:address.area,
                city:address.city,
                landMark:address.landMark

            })
            deleteItem(item)

        }catch(error){
            console.log(error)
        }
    }

// ordering placeing
    function orderPlaced (){
        cartLength.cart.forEach((item)=>{       
            placeOrder(item)
        })
        setCartLength("")
        setPayType("")
        setkey(formKey + 1)
        setAddressFormState(!addressFormState)
        toast.success('Order Placed Successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
        history.push("/orderHistory")
    }
    
   
// calculating total cart price for the billing purpose
    const price =  prices.reduce((acc , curr)=>{
        return (curr.price + acc )
    },0) 

// handeling changes in the payment method form
    function handleChange(event){
        switch (event.target.name) {
            case "payType":
                setPayType(event.target.value)
               
                break;
            default:
                break;
        }
    }

// handeling changes in the address info  form
    function handleChange2(event){
        switch (event.target.name) {
            case "fullName":
                setAddress({...address , fullName : event.target.value})
                break;
            case "mob":
                setAddress({...address , mob : event.target.value})
                break;
            case "pin":
                setAddress({...address , pin : event.target.value})
                break;
            case "flat":
                setAddress({...address , flat : event.target.value})
                break;
            case "area":
                setAddress({...address , area : event.target.value})
                break;
            case "landMark":
                setAddress({...address , landMark : event.target.value})
                break;
            case "city":
                setAddress({...address , city : event.target.value})
                break;
        
            default:
                break;
        }
    }

    // controlling onsubmit fun
    function handleSubmit(event){
        event.preventDefault()
        if(address.fullName==="" || address.mob==="" || address.pin==="" || address.flat==="" ||
        address.area==="" || address.landMark==="" || address.city===""){
            return(
            toast.error('Please Enter Address', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress:undefined ,
                }))
        }else if(payType===""){
            return(
                toast.error('Please Select Payment Mode', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress:undefined ,
                    }))
        }else{
            orderPlaced()
        }
        
        console.log(payType)
    }

    return(
        <>
        <Nav/>
        {
           cartLength && cartLength.cart.length !==0 ?  
           <div className="container">
               <div className="row" style={{marginTop:"40px" , marginBottom:"20px"}}>
               <div className="col-lg-8">
               <div style={{border:"1px solid rgb(187, 184, 184 , 0.3)" , borderRadius:"0.7rem"}}>

            {/* mapping over the cartItems of a particular user */}
            {
                cartLength.cart.map((items)=>{
                    return(
                        <>
                        <div className="parentCart" key={items.userId}>
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
                            <button className="cartRemoveBtn" onClick={()=>{deleteItem(items)}}>Remove</button>
                            </div>
                        </div>
                        <hr style={{margin:"0px"}}/>
                        </>
                        
                    )
                })
            } </div> </div>
            <div className="col-lg-4">
                <div style={{border:"1px solid rgb(187, 184, 184 ,0.3)" , borderRadius:"0.7rem" , overflow:"hidden"}}>
                    <div className="billingDetails">
                        <p className="b1">BILLING DETAILS</p>
                    </div>
                    <div style={{display:"flex" , justifyContent: "space-between" , padding:"20px 15px"}}>
                    <div style={{display:"flex"}}>
                            <div>
                            <i className="fas fa-shopping-cart ship"></i>
                            </div>
                            <div>
                            <p className="b2">Cart Total</p>
                            </div>
                        </div>
                        <div>
                        <p className="b3">Rs. {price}</p>
                        </div>
                    </div>
                    <hr style={{margin:"0px"}}/>
                    <div style={{display:"flex" , justifyContent: "space-between" , padding:"20px 15px"}}>
                        <div style={{display:"flex"}}>
                            <div>
                            <i className="fas fa-shipping-fast ship"></i>
                            </div>
                            <div>
                            <p className="b2">Shipping Charges</p>
                            </div>
                        </div>
                        <div>
                        <p className="b3">Rs. 50 </p>
                        </div>
                    </div>
                    <hr style={{margin:"0px"}}/>
                    <div style={{display:"flex" , justifyContent: "space-between" , padding:"20px 15px"}}>
                    <div style={{display:"flex"}}>
                            <div>
                            <i className="fas fa-coins ship" style={{color:"gold"}}></i>
                            </div>
                            <div>
                            <p className="b2">Total Amount</p>
                            </div>
                        </div>
                        <div>
                        <p className="b3">Rs. {price + 50} </p>
                        </div>
                    </div>
                    <hr style={{margin:"0px"}}/>
                    
                    <div>
                        <div className="deliveryDiv">
                            <div>
                            <p className="b6">Delivery Address :</p>
                            </div>
                            <div style={{marginRight:"20px"}}>
                                <button className="addressDownbtn" onClick={()=>{
                                    setAddressFormState(!addressFormState)
                                }}><i className="fas fa-chevron-down" style={{ color:"white"}}></i></button>
                            </div>
                        </div>
                    { addressFormState === true ?
                    <form className="addressForm" key={formKey}>
                        <input type="text" required  placeholder="Enter your full name" name="fullName" value={address.fullName} onChange={handleChange2}/><br/>
                        <input type="text" required  placeholder="Enter your Mobile no."  maxlength = "10"name="mob" value={address.mob} onChange={handleChange2}/><br/>
                        <input type="text" required  placeholder="Enter your Pincode"  maxlength = "6"name="pin" value={address.pin} onChange={handleChange2}/><br/>
                        <input type="text" required  placeholder="Flat , House no. , Building, Apartment " name="flat" value={address.flat} onChange={handleChange2}/>
                        <input type="text" required  placeholder=" Area , Street , Village" name="area" value={address.area} onChange={handleChange2}/>
                        <input type="text" required  placeholder="LandMark" name="landMark" value={address.landMark} onChange={handleChange2}/>
                        <input type="text" required  placeholder="Town / City" name="city" value={address.city} onChange={handleChange2}/>
                    </form> : null
                    }               
                    </div>
                    <hr style={{margin:"0px 0px 5px 0px"}}/>
                    <div>
                        <div className="payMethodDiv">
                        <p className="b7">Payment Method :</p>
                        </div>
                        <form onSubmit={handleSubmit} >
                            <div className="paymentForm">
                           <input type="radio" name="payType" value="cod" onChange={handleChange}/>
                           <label className="pay1"> Cash On Delivery</label><br/>
                           <input type="radio" name="payType" value="gpay" onChange={handleChange}/>
                           <label className="pay1"> Pay with G-pay</label><br/>
                           </div>

                           {/* INTEGRATING G-PAY DEMO */}
                           <div>
                               {gpay===true ?
                           <GooglePayButton
                                environment="TEST"
                                paymentRequest={{
                                    apiVersion: 2,
                                    apiVersionMinor: 0,
                                    allowedPaymentMethods: [
                                    {
                                        type: 'CARD',
                                        parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                        },
                                        tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        parameters: {
                                            gateway: 'example',
                                            gatewayMerchantId: 'exampleGatewayMerchantId',
                                        },
                                        },
                                    },
                                    ],
                                    merchantInfo: {
                                    merchantId: '12345678901234567890',
                                    merchantName: 'Demo Merchant',
                                    },
                                    transactionInfo: {
                                    totalPriceStatus: 'FINAL',
                                    totalPriceLabel: 'Total',
                                    totalPrice: '100.00',
                                    currencyCode: 'INR',
                                    countryCode: 'IN',
                                    },
                                }}
                                onLoadPaymentData={paymentRequest => {
                                    console.log('load payment data', paymentRequest);  
                                    orderPlaced()
                                    setGpay(false)
                                }}
                                
                                />
                                : 
                           <button type="submit" className="btn orderssBtnss btn-lg btn-block">Place Order</button>}
                           </div>
                        </form>     
                    </div>
                </div>
                    
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
export default CartItems; 