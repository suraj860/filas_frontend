
import React from "react";

export const Appcontext = React.createContext()

export const ContextProvider = (props)=>{

   const[tshirts , setTshirts] = React.useState([])
   const[product , setProduct]=React.useState(false)
   const[quantities , setQuantity] = React.useState(1)
   const [tshirtlink , setTshirtlink] = React.useState(false)
   const[shirtLink , setShirtLink] = React.useState(false)
   const[shortsLink , setShortLink] = React.useState(false)
   const[allShopLink , setAllShopLink] = React.useState(false)
   const[pajamasLink , setPajamasLink] = React.useState(false)
   const[jeansLink , setJeansLink] = React.useState(false)
   const[api] = React.useState("https://fila-ecommerce.herokuapp.com")

   const[itemDetail , setItemDetails] = React.useState({})
   const[prdSize , setPrdSize] = React.useState("L")
   const[userEmail , setUserEmail] = React.useState("")
   const[password, setPassword] = React.useState("")
   const[name , setName]= React.useState("")
   const[msg , setmsg] = React.useState("")
   const[cartLength , setCartLength] = React.useState()
   const[allProductSort , setAllProductSort] = React.useState(false)
   const[orderLength , setOrderLength] = React.useState([])

   const [prices , setPrice] = React.useState([])
   const[payType , setPayType] = React.useState("")


   const[addressFormState, setAddressFormState]=React.useState(false)
   const[allShop , setAllshop] = React.useState(false)
   const[mensWearState , setMensWearState] = React.useState(false)

   const[navShopAll , setNavShopAll] = React.useState(false)

   const[trendingArticles , settrendingArticles] = React.useState([
         {
             key:0,
            productName : "Marvel:Captain America Sweatshirt",
            type:"t-shirt",
            size: ["L" , "XL" , "XXL"],
            details: "Stylish full sleeve Casual Printed Shirts & Party Wear Casual shirts Premium Poly Cottton, Pre Washed for an extremely soft finish and Rich look Modern slim fit ( we have updated our size chart, please refer the size chart for new measurements before ordering) Breathable Truly comfortable and easy to wear in every season it is insulating in winter and breathable in summer. Disclaimer Product colour may slightly vary due to photographic lighting sources or your monitor settings",
            image:"./images/t-shirts/m1.jpg",
            price: 499,
            quantity:"In Stock",
            color: "grey"
        },
        {
            productName : "Bearjar print pajamas",
            key:1,
            type:"pajamas",
            size: ["L" , "XL" , "XXL"],
            details: "100% Made of cotton , printed , pajamas are comfortable and they have elastic waist band. They have softer handfeel , Machine wash and they are properly stiched and comfortable to use.",
            image:"./images/pajamas/pj1.webp",
            price: 399,
            quantity:"In Stock",
            color: "Black"
        },
       
        {
            productName : "Vertical strip Shirt",
            key:2,
            type:"shirt",
            size: ["L" , "XL" , "XXL"],
            details: "Stylish  Casual Printed Shirts & Party Wear Casual shirts Premium Poly Cottton, Pre Washed for an extremely soft finish and Rich look Modern slim fit ( we have updated our size chart, please refer the size chart for new measurements before ordering) Breathable Truly comfortable and easy to wear in every season it is insulating in winter and breathable in summer. Disclaimer Product colour may slightly vary due to photographic lighting sources or your monitor settings",
            image:"./images/shirt/shirt1.webp",
            price: 699,
            quantity:"In Stock",
            color: "Blue-yellow"
        },
        {
            productName : "Skull print shorts",
            key:3,
            type:"shorts",
            size: ["L" , "XL" , "XXL"],
            details: "Fabric: 50% Tencel Modal, 45% Cotton and 5% Elastane.3X softer and 50% more moisture absorbent than regular cotton. Peach finish for smooth exterior.Natural stretch with a smart fit which makes it perfect for lounging at home or stepping out.Enhanced with anti-microbial finish to prevent unpleasant odours and rashes.",
            image:"./images/shorts/short8.webp",
            price: 499,
            quantity:"In Stock",
            color: "Black"
            },
   ])

   const[userOrder , setUserOrders] = React.useState([])
    return(
        <Appcontext.Provider value={{tshirts , setTshirts ,tshirtlink , setTshirtlink, shirtLink , setShirtLink,
            shortsLink , setShortLink , pajamasLink , setPajamasLink , jeansLink , setJeansLink ,
            product , setProduct ,api , itemDetail , setItemDetails , quantities , setQuantity,
            prdSize , setPrdSize ,userEmail , setUserEmail , password, setPassword ,name , setName,
            msg , setmsg , cartLength , setCartLength , prices , setPrice , payType , setPayType,
            addressFormState, setAddressFormState,allShop , setAllshop , allShopLink , setAllShopLink,
            navShopAll , setNavShopAll , mensWearState , setMensWearState , trendingArticles , settrendingArticles,
            userOrder , setUserOrders , orderLength , setOrderLength , allProductSort , setAllProductSort}}>
            {props.children}
        </Appcontext.Provider>
    )
}