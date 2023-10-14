import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import food from "../images/shahipaneer.jpeg"
const About = () => {
    const [show, setshow] = useState(false) ;
    return (
       <div className="about-container-main">
            <div className="about-profile-container">
                {
                    show ? (
                        <>
                            <Link to={"/about"}>
                                <button
                                className="about-profile-button"
                                onClick={()=> setshow(false)}
                                >
                                    Hide my Profile
                                </button>
                            </Link>
                            <Outlet/>
                        </>
                    ) : (
                        <Link to={"profile"}>
                            <button
                            className="about-profile-button"
                            onClick={()=> setshow(true)}
                            >
                                Show my profile
                            </button>
                        </Link>
                    )
                }
            </div>
            <div className="about-container">
                <div className="about-left">
                    <h1>Welcome to <br/>the World of<br/>
                    <span>Tasty and Fresh Food</span>
                    </h1>
                    <h4>
                        "Better you will feel if you eat a Eats<span>Easy</span> healthy
                        meal"
                    </h4>
                </div>
                <div className="about-right">
                    <img src={food} alt="Food Image"/>
                </div>

            </div>
       </div>
    );
};
export default About;
