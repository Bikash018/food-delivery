import RestaurantCard from "./restaurantcard"
import Shimmer from "./shimmer";
import { useEffect, useState } from "react"; 
import {swiggy_api_URL} from "../constants"
import { Link } from "react-router-dom";
import useResData from "../Hooks/useresdata";
import useOnline from "../Hooks/useOnline";
import UserOffline from "./useroffline";

function filterdata(searchText,restaurants){
    const filterData=restaurants.filter((restaurant)=>
     restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
);
    return filterData;
}
const Body =()=>{
     const [searchText, setsearchText] = useState("");
     const [filteredRestaurants, setfilteredRestaurants] = useState(null)
     const [errorMessage, seterrorMessage] = useState("")
     const [allRestaurants, FilterRes] = useResData(swiggy_api_URL);
     const isOnline = useOnline();

     if(!isOnline){
      return <UserOffline/>
     }
     
     const searchdata=(searchText,restaurant)=>{
        if(searchText!==""){
          const filterData=filterdata(searchText,restaurant);
          setfilteredRestaurants(filterData);
          seterrorMessage("");
          if(filterData?.length===0){
            seterrorMessage("No Match Found");
          }

        } else{
          seterrorMessage("");
          setfilteredRestaurants(restaurant);
        }
    };

    if(!allRestaurants) return null;
     
    return (
    <>
    <div className="search-container">
        <input
        type="text"
        className="search-input"
        placeholder="Search the hotel You want"
        value={searchText}
        onChange={(e)=>setsearchText(e.target.value)}
        ></input>
        <button
        className="search-btn"
        onClick={()=>{
          searchdata(searchText,allRestaurants);
        }}>
          Search
        </button>

    </div>
    {errorMessage && <div className="error-container">{errorMessage}</div>}
    { allRestaurants?.length === 0 && FilterRes?.length ===0 ? (
      <Shimmer/>
    ) : (
      <div className="restaurant-list">
        {(filteredRestaurants === null ? FilterRes : filteredRestaurants).map((restaurant)=>{
          return ( <Link
                to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
              );
      })}
    </div>
    )}
    <div className="area"></div>
   
    </>
    );
  };
  export default Body

