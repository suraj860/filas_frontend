

import React from "react";
import Nav from "./navbar";
import Shop from "./shop";
import axios from "axios";
import { Appcontext } from "./context";
import "../css/tshirt.css"
import { Link } from "react-router-dom";

function Pajamas(props){

    const{tshirts , setTshirts} = React.useContext(Appcontext)
    const{setProduct , setItemDetails}=React.useContext(Appcontext)


    const { setTshirtlink , setShirtLink , setShortLink} =React.useContext(Appcontext)
    const {setJeansLink , setPajamasLink ,setAllShopLink,setMensWearState} = React.useContext(Appcontext)
    const {api, setAllProductSort}= React.useContext(Appcontext)

    let path = props.location.pathname


  async  function pajamasData(){
    try{
      const response = await axios.get( api + "/pajamas")
      setTshirts(response.data)
      setProduct(true)
      setAllProductSort(false)
      setMensWearState(false)
    }catch(error){
        console.log(error)
    }  
 }

 React.useEffect(()=>{
    pajamasData()
     resettingLinks()
       // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])

 function resettingLinks (){
    setTshirtlink(false)
    setShirtLink(false)
    setShortLink(false)
    setJeansLink(false)
    setPajamasLink(true)
    setAllShopLink(false)
 }

  
    return(
        <>
        <Nav/>
        <div style={{width:"300px" , height:"auto" , marginLeft:"280px"}}>
          <div>
              <p className="t2">Home{path}</p>
              <p className="t3">Pajamas : {tshirts.length} items</p>
          </div>
          </div>
          <hr style={{marginBottom:"0px"}}/>
        <div className="container-fluid">
            <div className="row">
                <div  className="col-lg-2 shopNav">
                    <Shop type="pajamas"/>
                </div>
                <div className="col-lg-10 productRow">
                    <div className="row  r1">
                        {
                            tshirts.map((item)=>{
                                return(
                                    <>
                                    
                                    <div className="col-lg-3 col-md-4 col-sm-6 prd">
                                        {/* <div className="cardInfo"> */}
                                        <Link to="/details" onClick={()=>{
                                            setItemDetails(item)
                                            window.localStorage.setItem("infos", JSON.stringify(item))}} style={{textDecoration:"none"}}>
                                            <div className="cards" >
                                                <div className="imgDiv"> 
                                                <img src={item.image} alt=""  className="prodimg"/>
                                                </div>
                                                <div className="prdName">
                                                <p className="itemNames">{item.productName}</p>
                                                </div>
                                                
                                                <hr style={{margin:"0px"}}/>
                                                <div className="prdName">
                                                <p className="type">{item.type}</p>
                                                </div>
                                                <div className="prdName">
                                                <p className="itemNames">Rs. {item.price}</p>
                                                </div>
                                            </div>
                                        {/* </div> */} </Link>
                                    </div>
                                   
                                    </>
                                )
                            })

                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Pajamas;
