import { User2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../../useContext";
import Profile from "../userCard/profile";
import { useState, useRef, useEffect } from "react";

export default function User() {
    const navigate = useNavigate();
    const { isLoggedIn } = useUser();
    const [showProfile, setShowProfile] = useState(false);
    const userContainerRef = useRef(null);
    
    function handleClick() {
        if (isLoggedIn()) {
            setShowProfile(!showProfile); // Toggle para mostrar/ocultar el perfil
        } else {
            navigate("/login");
        }
    }

    function handleCloseProfile() {
        setShowProfile(false);
    }
    
    return (
        <div className="user-container" onClick={handleClick} ref={userContainerRef}>
            <User2Icon />
            {showProfile && <Profile closeProfile={handleCloseProfile} />}
        </div>
    );
}