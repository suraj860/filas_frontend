
import React from "react";
import { Appcontext } from "./context";
import "../css/shop.css"
import { Link} from "react-router-dom";
import axios from "axios";


function Shop(props){
    
    const{product , setProduct ,allShop , setAllshop , api}=React.useContext(Appcontext)
    const{ setTshirts} = React.useContext(Appcontext)
    const {tshirtlink , shirtLink , allProductSort , setAllProductSort} = React.useContext(Appcontext)
    const {shortsLink ,pajamasLink ,jeansLink , allShopLink} = React.useContext(Appcontext)
    const[sort , setSort] = React.useState(false)
    
    async function lowToHigh(){
        if(allProductSort !== true){
            try{
                const response = await axios.put(api + "/asc",{
                    typess : props.type
                })
                setTshirts(response.data)
            }catch(error){
                console.log(error)
            }
        }
        else{
            try{
                const response = await axios.get(api + "/all_asc")
                setTshirts(response.data)
            }catch(error){
                console.log(error)
            }  
        }
    }

    async function highToLow(){
        if(allProductSort !== true){
            try{
                const response = await axios.put(api + "/dsc",{
                    typess : props.type
                })
                setTshirts(response.data)
            }catch(error){
                console.log(error)
            }
        }else{
            try{
                const response = await axios.get(api + "/all_dsc")
                setTshirts(response.data)
            }catch(error){
                console.log(error)
            }
        }
       
    }

    return(
        <>
       
                     <div>
                        <div className="items">
                        <p className="itmTitle">SHOP ALL</p>
                        <button className="arrowBtn" onClick={()=>{setAllshop(!allShop)}}>
                            <i className="fas fa-chevron-down"></i></button>
                        </div>
                        <hr style={{marginBottom:"5px"}}/>
                        {
                            allShop===true ? 
                            <div className="itemList">
                                <ul  type="none" className="types">
                                     <Link to="/allProduct"  style={{textDecoration:"none" , color:"black"}} onClick={()=>{setAllProductSort(true)}}>
                                     <div  className="cate1"  style={allShopLink===true ? {backgroundColor:"rgb(14, 212, 212)" , color:"white", display:"flex"}: {display:"flex"}}>
                                        <div style={{width:"28px" , height:"25px", margin:"8px 8px 0px 8px"}}>
                                            <img src="./images/allProductIcon.png" style={{width:"100%" , height:"100%"}} alt="dicon"/>
                                        </div>
                                        <div style={{width:"100%"}}>
                                        <li className="lis">All Products</li>
                                        </div>
                                    </div>
                                    </Link>
                                </ul>
                            </div>:null
                        }
                    </div>
                    <div>
                        <div className="items">
                        <p className="itmTitle">CATEGORIES</p>
                        <button className="arrowBtn" onClick={()=>{setProduct(!product)}}>
                            <i className="fas fa-chevron-down downs"></i></button>
                        </div>
                        <hr style={{marginBottom:"5px"}}/>
                        {
                            product===true ? 
                            <div className="itemList">
                            <ul type="none" className="types">
                                
                               

                                <Link to="/t-shirt"  style={{textDecoration:"none" , color:"black"}} onClick={()=>{setAllProductSort(false)}}>
                                    <div className="cate1"  style={tshirtlink===true ? {backgroundColor:"rgb(14, 212, 212)" , color:"white", display:"flex"}: {display:"flex"}}>
                                        <div style={{width:"28px" , height:"25px", margin:"8px 8px 0px 8px"}}>
                                            <img src="./images/tShirtIcon.png" style={{width:"100%" , height:"100%"}} alt="dicon"/>
                                        </div>
                                        <div style={{width:"100%"}}>
                                        <li className="lis">T-Shirts</li>
                                        </div>
                                    </div>
                              
                                </Link>

                                <Link to="/shirts"  style={{textDecoration:"none"  , color:"black"}} onClick={()=>{setAllProductSort(false)}}>
                                     <div  className="cate1"  style={shirtLink===true ? {backgroundColor:"rgb(14, 212, 212)" , color:"white", display:"flex"}: {display:"flex"}}>
                                        <div style={{width:"28px" , height:"25px", margin:"8px 8px 0px 8px"}}>
                                            <img src="./images/shirtIcon.png" style={{width:"100%" , height:"100%"}} alt="dicon"/>
                                        </div>
                                        <div style={{width:"100%"}}>
                                        <li className="lis">Shirts</li>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/shorts"  style={{textDecoration:"none"  , color:"black"}} onClick={()=>{setAllProductSort(false)}}>
                                    <div   className="cate1" style={shortsLink===true ? {backgroundColor:"rgb(14, 212, 212)" , color:"white", display:"flex"}: {display:"flex"}}>
                                        <div style={{width:"28px" , height:"25px", margin:"8px 8px 0px 8px"}}>
                                            <img src="./images/icons8-shorts-60.png" style={{width:"100%" , height:"100%"}} alt="dicon"/>
                                        </div>
                                        <div style={{width:"100%"}}>
                                        <li className="lis">Shorts</li>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/pajamas"  style={{textDecoration:"none"  , color:"black"}} onClick={()=>{setAllProductSort(false)}}>
                                    <div  className="cate1"  style={pajamasLink===true ? {backgroundColor:"rgb(14, 212, 212)" , color:"white", display:"flex"}: {display:"flex"}}>
                                        <div style={{width:"28px" , height:"25px" , margin:"8px 8px 0px 8px"}}>
                                            <img src="./images/pajamas.png" style={{width:"100%" , height:"100%"}} alt="dicon"/>
                                        </div>
                                        <div style={{width:"100%"}}>
                                        <li className="lis">Pajamas</li>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/jeans"  style={{textDecoration:"none"  , color:"black"}} onClick={()=>{setAllProductSort(false)}}>
                                    <div  className="cate1"  style={jeansLink===true ? {backgroundColor:"rgb(14, 212, 212)" , color:"white", display:"flex"}: {display:"flex"}}>
                                        <div style={{width:"28px" , height:"25px", margin:"8px 8px 0px 8px"}}>
                                            <img src="./images/jeansIcon.png" style={{width:"100%" , height:"100%"}} alt="dicon"/>
                                        </div>
                                        <div style={{width:"100%"}}>
                                        <li className="lis">Jeans</li>
                                        </div>
                                    </div>
                                </Link>

                            </ul>
                            <hr/>
                        </div>: null

                        }
                        
                        
                    </div>
                   
                    <div>
                        <div className="items">
                        <p className="itmTitle">SORT</p>
                        <button className="arrowBtn" onClick={()=>{setSort(!sort)}}><i className="fas fa-chevron-down"></i></button>
                        </div>
                        <hr style={{marginBottom:"5px"}}/>
                        {
                            sort===true ?
                            <div className="itemList">
                            <ul type="none" className="types">
                               
                                <div  className="cate1" style={{display:"flex"}}>
                                    <div style={{width:"22px" , height:"20px", margin:"8px 8px 0px 8px"}}>
                                        <img src="./images/upIcon.png" style={{width:"100%" , height:"100%"}} alt="dicon"/>
                                    </div>
                                    <div style={{width:"100%"}}>
                                    <li className="lis">
                                    <button className="sortingBtn" onClick={lowToHigh} style={{display:"flex" , textAlign:"center"}}>
                                    Low to High</button>
                                    </li>
                                    </div>
                                </div>

                                <div className="cate1" style={{display:"flex"}}>
                                    <div style={{width:"22px" , height:"20px", margin:"8px 8px 0px 8px"}}>
                                        <img src="./images/downIcon.png" style={{width:"100%" , height:"100%"}} alt="dicon"/>
                                    </div>
                                    <div style={{width:"100%"}}>
                                    <li className="lis">
                                    <button className="sortingBtn" onClick={highToLow} style={{display:"flex" , textAlign:"center"}}>
                                    High to Low</button>
                                    </li>
                                    </div>
                                </div>
                            </ul>
                            <hr/>
                            </div>:null

                        }
                    </div>
        </>
    )
}

export default Shop;
