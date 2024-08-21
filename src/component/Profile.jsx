import React, { useEffect, useRef, useState } from "react";
import Icon from '@mdi/react';
import { mdiPencil, mdiCheck } from '@mdi/js';
import "./profile.css";

const Profile = () => {
  const [profile, setprofile] = useState({ name: "", about: "" });
  const [icon,setIcon] = useState(mdiPencil);
  const editName = useRef(null);
  const editAbout = useRef(null);
  

  useEffect(() => {
    const name = localStorage.getItem("name");
    const about = localStorage.getItem("about");
    setprofile({ name: name || "", about: about || "hey guy's i am using nandu's chat application" });
  }, []);

  const handleChange = (e, item) => {
    if (item === "name") {
      console.log("updating name");
      setprofile((prevState) => ({
        ...prevState,
        name: e.target.value,
      }));
    } else if (item === "about") {
      console.log("updating about");
      setprofile((prevState) => ({
        ...prevState,
        about: e.target.value,
      }));
    }
  };

  const edit = (inputRef) =>{
    console.log("button clicked");
    
    if(inputRef.current){
        inputRef.current.readOnly = !inputRef.current.readOnly;
        if(icon ===mdiPencil){
            setIcon(mdiCheck);
        }
        else if(icon ===mdiCheck){
            setIcon(mdiPencil)
        }
    }
  };

  return (
    <div className="profilecontainer">
      <div className="first">
        <h2>Profile</h2>
      </div>
      <div className="profilepic">
        <img src="/Assets/background-image.webp" alt="Profile Background" />
      </div>
      <div className="detailcontainer">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          ref={editName}
          readOnly={true}
          value={profile.name}
          onChange={(event) => handleChange(event, "name")}
        />
         <button onClick={()=>edit(editName)}><Icon path={icon} size={0.8} /></button>
         
      </div>
      <div className="infocontainer">
        <p>
          This Name is not your name or pin. This name will be visible to your
          chatApp friends.
        </p>
      </div>
      <div className="detailcontainer">
        <label htmlFor="about">About</label>
        <input
          type="text"
          name="about"
          id="about"
          ref={editAbout}
          readOnly={true}
          value={profile.about}
          onChange={(event) => handleChange(event, "about")}
        />
        <button onClick={()=>edit(editAbout)}><Icon path={mdiPencil} size={0.8} /></button>
         
      </div>
      <div className="infocontainer">
        <p>This detail will be visible to your chatApp friends.</p>
      </div>
    </div>
  );
};

export default Profile;
