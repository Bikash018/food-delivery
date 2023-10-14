import { useEffect, useState } from "react";

const UseResData=(API_URL)=>{
    const [allRestaurants, setallRestaurants] = useState([]);
    const [filteredRestaurants, setfilteredRestaurants] = useState([]);
    useEffect(() => {
        getRestaurant()
     }, []);

     async function getRestaurant(){
      try{
        const response= await fetch(API_URL);
        const json= await response.json();

        async function checkJsonData(jsonData){
          for (let i = 0; i < jsonData?.data?.cards.length; i++) {

            // initialize checkData for Swiggy Restaurant data
            let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            if(checkData!==undefined){
              return checkData;
            }
        }
      }
        const resData=await checkJsonData(json);
        setallRestaurants(resData)
        setfilteredRestaurants(resData)

     }
     catch(error){
      console.log(error);
     }
  }
  return [allRestaurants,filteredRestaurants];
};
export default UseResData;
