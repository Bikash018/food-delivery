import { IMG_CDN_URL } from "../constants";
const RestaurantCard=(props)=>{
    return (
        <div className="card">
        <img
        src={
          IMG_CDN_URL+
          props.cloudinaryImageId
        }
        />
            <h2>{props.name}</h2>
            <h4>{props.cuisines.join(",")}</h4>
            <h4>{props.area}</h4>
            <span>
                <h4><i className="fa-solid fa-star"></i> {props.avgRating}</h4>
                <h4>{props.lastMileTravelString}</h4>
                <h4>{props.costForTwoString}</h4>
            </span>
        </div>
    );
}
export default RestaurantCard