import React from "react";
import{BrowserRouter , Switch, Route} from "react-router-dom";
import { ContextProvider } from "./components/context";
import Tshirts from "./components/t-shirts";
import Shirts from "./components/shirts";
import Shorts from "./components/shorts";
import Pajamas from "./components/pajamas";
import Jeans from "./components/jeans";
import Details from "./components/itemDetails";
import Login from "./components/auth/loginPage";
import RegisterForm from "./components/auth/registerForm";
import VerifyEmail from "./components/auth/verifymail";
import ForgetPass from "./components/auth/forgetPassword";
import UpdatePassword from "./components/auth/updatePass";
import CartItems from "./components/cartItems";
import WishListItems from "./components/wishListItem";
import Allshop from "./components/allShop";
import Home from "./components/LandingPage";
import UserOrders from "./components/placedOrder";

function App() {
  return (
   <>
   <ContextProvider>
     <BrowserRouter>
     <Switch>
       <Route  exact path="/" component={Home}/>
       <Route  path="/t-shirt" component={Tshirts}/>
       <Route path="/shirts" component={Shirts}/>
       <Route path="/shorts" component={Shorts}/>
       <Route path="/pajamas" component ={Pajamas}/>
       <Route path="/jeans" component={Jeans}/>
       <Route path="/details" component={Details}/>
       <Route path="/login" component={Login}/>
       <Route path="/register" component={RegisterForm}/>
       <Route path="/verify/:id" component={VerifyEmail}/>
       <Route path="/forgetPassword" component={ForgetPass}/>
       <Route path="/resetMail/:id" component={UpdatePassword}/>
       <Route path="/cart" component={CartItems} />
       <Route path="/wishList" component={WishListItems}/>
       <Route path="/allProduct" component={Allshop}/>
       <Route path="/orderHistory" component={UserOrders}/>
     </Switch> 
    </BrowserRouter>
   </ContextProvider>
   
   </>
  );
}

export default App;
