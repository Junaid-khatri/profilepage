import React, { useEffect, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiPencil, mdiCheck } from "@mdi/js";
import "./profile.css";
import pp from "./Assests/background-image.webp";

const Profile = () => {
  const [profile, setprofile] = useState({ name: "", about: "" });
  const editName = useRef(null);
  const editAbout = useRef(null);
  const [nameIcon, setNameIcon] = useState(mdiPencil);
  const [aboutIcon, setAboutIcon] = useState(mdiPencil);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const about = localStorage.getItem("about");
    setprofile({
      name: name || "",
      about: about || "hey guy's i am using nandu's chat application",
    });
  }, []);

  const handleChange = (e, item) => {
    if (item === "name") {
      setprofile((prevState) => ({
        ...prevState,
        name: e.target.value,
      }));
    } else if (item === "about") {
      setprofile((prevState) => ({
        ...prevState,
        about: e.target.value,
      }));
    }
  };

  const edit = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.readOnly = !inputRef.current.readOnly;

      if (inputRef.current.readOnly) {
        inputRef.current.blur();
      } else if (!inputRef.current.readOnly) {
        inputRef.current.focus();
      }

      if (inputRef.current.name === "name") {
        if (nameIcon === mdiPencil) {
          setNameIcon(mdiCheck);
        } else if (nameIcon === mdiCheck) {
          setNameIcon(mdiPencil);
        }
      } else if (inputRef.current.name === "about") {
        if (aboutIcon === mdiPencil) {
          setAboutIcon(mdiCheck);
        } else if (aboutIcon === mdiCheck) {
          setAboutIcon(mdiPencil);
        }
      }
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="pp-pic">
        <img className="profile-pic" src={pp} alt="not-found" />
      </div>
      <div>
        <div className="name-heading">
          <p>Your Name</p>
        </div>
        <div className="name">
          <input
            type="text"
            name="name"
            id="name"
            ref={editName}
            readOnly={true}
            value={profile.name}
            onChange={(event) => handleChange(event, "name")}
          />

          <span>
            <button onClick={() => edit(editName)}>
              <Icon path={nameIcon} size={0.8} />
            </button>
          </span>
        </div>
      </div>
      <br></br>
      <div className="about">
        <p>
          This is not your Username or PIN. This name will be visible to your
          WhatsApp contacts.
        </p>
      </div>
      <div>
        <div className="name-heading">
          <p>About</p>
        </div>
        <div className="name">
          <input
            type="text"
            name="about"
            id="about"
            ref={editAbout}
            readOnly={true}
            value={profile.about}
            onChange={(event) => handleChange(event, "about")}
          />
          <span>
            <button onClick={() => edit(editAbout)}>
              <Icon path={aboutIcon} size={0.8} />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
