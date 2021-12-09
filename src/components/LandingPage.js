

import React from "react";
import Nav from "./navbar";
import "../css/landing.css";
import "../css/tshirt.css";
import { Link } from "react-router-dom";
import { Appcontext } from "./context";

function Home(){
    const{trendingArticles  , setItemDetails}= React.useContext(Appcontext)
    return(
        <>
        <Nav/>

        {/* carousel section */}

        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
               
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active" >
                <img className="d-block w-100" src="./images/q.jpg" alt="First slide"  style={{width:"100%" , height:"100%"}}/>
                </div>
                <div className="carousel-item">
                <img className="d-block w-100" src="./images/q2.jpg" alt="Second slide"/>
                </div>
               
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>

        {/* Shopping categories */}

        <div className="homeCatDiv">
            <p className="j1">CATEGORIES</p>
        </div>
        <div className="container-fluid">
            <div className="row" >
                <div className="col-lg-4 rows12">
                    <Link to="/t-shirt">
                    <div className="homeImg">
                    <img src="./images/homet-shirt.webp" alt="t-shirt" className="twerk" />
                    <div className="titleHome">
                        <p style={{fontSize:"2rem" , fontWeight:"bold"}}>T-SHIRTS</p>
                    </div>
                    </div>
                    </Link>
                    
                </div>
                <div className="col-lg-4 rows12"  >
                    <Link to="/shorts">
                    <div  className="homeImg">
                    <img src="./images/homeshort.jpg" alt="t-shirt" className="twerk"/>
                    <div className="titleHome">
                        <p style={{fontSize:"2rem" , fontWeight:"bold"}}>SHORTS</p>
                    </div>
                    </div>
                    </Link>
                   
                </div>
                <div className="col-lg-4 rows12" >
                    <Link to="/shirts">
                    <div  className="homeImg">
                    <img src="./images/homeshirt.webp" alt="t-shirt" className="twerk"/>
                    <div className="titleHome">
                        <p style={{fontSize:"2rem" , fontWeight:"bold"}}>SHIRTS</p>
                    </div>
                    </div>
                    </Link>
                   
                </div>   
            </div>
        </div>
        <div className="container-fluid">
            <div className="row" >
                <div className="col-lg-6 rows13" >
                    <Link to="/pajamas">
                    <div className="homeImg2">
                    <img src="./images/homePajamas.jpg" alt="t-shirt" className="twerk"/>
                    <div className="titleHome2">
                        <p style={{fontSize:"2rem" , fontWeight:"bold"}}>PAJAMAS</p>
                    </div>
                    </div>
                    </Link>
                </div>   
                <div className="col-lg-6 rows13"  >
                    <Link to="/jeans">
                    <div className="homeImg2">
                    <img src="./images/homeJeans.jpg" alt="t-shirt" className="twerk"/>
                    <div className="titleHome2">
                        <p style={{fontSize:"2rem" , fontWeight:"bold"}}>JEANS</p>
                    </div>
                    </div>
                    </Link>
                </div>   
            </div>
           
        </div>

        {/* trending articles */}

        <div className="homeCatDiv">
            <p className="j1">TOP SELLINGS</p>
        </div>
        <div className="container-fluid">
            <div className="row rj">
            {
                trendingArticles.map((item)=>{
                    return(
                            <>      
                            <div  key={item.key} className="col-lg-3 col-md-4 col-sm-6 prd">
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
                                </Link>
                            </div>
                                   
                            </>
                            )

                            })

            }
            </div>
        </div>
        <div className="homeCatDiv2">
            <p className="title12">HOME GROWN INDIAN BRAND FOR MEN'S</p>
            <p className="title123">Over <span style={{color:"yellowgreen"}}> 4 Million </span> Happy Customer</p>
            
        </div>

        {/* Footer */}

        <div className="container-fluid kk" >
            <div className="row" style={{padding:"0px 20px"}}>
                <div className="col-lg-4" style={{padding:"0px 35px" , borderRight:"1px solid rgb(190, 190, 190)"}}>
                    <div className="footer">
                    <p>ABOUT US</p>
                    </div>
                    <div style={{textAlign:"left"}}>
                        <p className="z1">
                        We create and curate stunning designs and print 
                        them on all sorts of equally stunning products- from t-shirts 
                         to shorts to  jeans
                         and many, many more! Our funky products are 
                        designed and printed specifically to spread happiness.So if you're looking for great products, 
                         with even greater deals and discounts, you've come to the right place!

                        </p>
                    </div>
                </div>
                <div className="col-lg-4" style={{padding:"0px 35px" , borderRight:"1px solid rgb(190, 190, 190)"}}>
                    <div  className="footer">
                    <p>CONTACT-US</p>
                    </div>
                    <div>
                        <p className="z1">You can mail us or give a ring we will be happy by helping you
                            ,drop a direct mail to our mail box , return an order on provided address
                        </p>
                    </div>
                    <div style={{display:"flex"}}>
                    <i className="fas fa-envelope contactIcon"></i>
                    <p className="z1">filasStreet435@gmail.com</p>
                    </div>
                    <div style={{display:"flex"}}>
                    <i className="fas fa-phone-square contactIcon"></i>
                    <p className="z1">(+91) 8976345610</p>
                    </div>
                    <div style={{display:"flex"}}>
                    <i className="fas fa-map-marker-alt contactIcon"></i>
                    <p className="z1">Street:123, Bandra-East ,Royal complex , Mumbai-534621</p>
                    </div>
                </div>
                <div className="col-lg-4" style={{padding:"0px 35px" }}>
                    <div style={{display:"flex"}}>
                    <i className="fas fa-recycle contactIcon"></i>
                    <p className="z1">30 Days return policy available</p>
                    </div>
                    <div style={{display:"flex"}}>
                    <i className="fas fa-rupee-sign contactIcon"></i>
                    <p className="z1">COD Available</p>
                    </div>
                    <div style={{display:"flex"}}>
                    <i className="fas fa-truck contactIcon"></i>
                    <p className="z1">Get your product deliver in 4 days</p>
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <div>
                            <p>STAY IN TOUCH</p>
                        </div>
                        <i className="fab fa-facebook-square fa-2x socialIcons fa-color-red"></i>
                        <i className="fab fa-mailchimp fa-2x socialIcons" style={{color:"orange"}}></i>
                        <i className="fab fa-instagram fa-2x socialIcons" style={{color:"rgb(212, 14, 163)"}}></i>
                        <i className="fab fa-twitter fa-2x socialIcons" style={{color:"blue"}}></i>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Home;