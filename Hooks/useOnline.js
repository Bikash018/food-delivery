import { useEffect, useState } from "react";

const useOnline = ()=>{
    const [isonline, setisonline] = useState(true);
    useEffect(()=>{
    const onlinefunc =() =>{setisonline(true)}
    const offlinefunc=()=>{setisonline(false)}

    window.addEventListener("online",onlinefunc);
    window.addEventListener("offline",offlinefunc);
    
    return ()=> {
        window.removeEventListener("online", onlinefunc);
        window.removeEventListener("offline", offlinefunc);
    };
    },[]);

    return isonline;
}

export default useOnline;