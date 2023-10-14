import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg"
const Title = () =>{
    return(
           <a href="/">
               <img className="logo" src={logo} alt="Food Fire Logo"/>
           </a>
   );
   }
   const Header =()=>{
       return (
           <div className="header">
               <Title/>
               <div className="nav-items">
               <ul>
                 <li><Link to="/">Home</Link></li>
                   <li><Link to="/about">About</Link></li>
                   <li><Link to="/contact">contact</Link></li>
                   <li><i className="fa-solid fa-cart-shopping"></i></li>
               </ul>
               </div>
           </div>
       )
   }
   export default Header