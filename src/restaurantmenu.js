import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constants";
 
const RestaurantMenu = () => {
    const {resId} = useParams();
    const [restaurant, setrestaurant] = useState(null);
    const [menuItems, setmenuItems] = useState([]);

useEffect(()=>{
    getRestaurantInfo();
},[])

async function getRestaurantInfo(){
    try{
        const response = await fetch(swiggy_menu_api_URL  + resId)
        const json =await response.json();
        
        const restaurantData = json?.data?.cards?.map(x => x.card)?.
        find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;

        setrestaurant(restaurantData);
        
        const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
        groupedCard?.cardGroupMap?.REGULAR?.
        cards?.map(x => x.card?.card)?.
        filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
        map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];

        const uniqueMenuItems = [];
        menuItemsData.forEach((item) => {
            if(!uniqueMenuItems.find((x)=> x.id ===item.id)){
                uniqueMenuItems.push(item);
            }
        });

        setmenuItems(uniqueMenuItems);

    }
    catch(error){
        setmenuItems([])
        setrestaurant(null)
        console.log(error);
    }
  }
    return  (
        <div className="restaurant-menu">
            <div className="restaurant-summary">
                <img className="restaurant-img"
                src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
                alt={restaurant?.name}
                />
                <div className="restaurant-summary-datails">


                <h2 className="restaurant-title">{restaurant?.name}</h2>
          <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div className="restaurant-rating" style={
            (restaurant?.avgRating) < 4
              ? { backgroundColor: "var(--light-red)" }
              : (restaurant?.avgRating) === "--"
              ? { backgroundColor: "white", color: "black" }
              : { color: "white" }
          }>
            <i className="fa-solid fa-star"></i>
              <span>{restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">
              {menuItems.length} ITEMS
            </p>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn"> ADD +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
