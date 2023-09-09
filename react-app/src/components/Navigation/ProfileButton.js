import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {/* <button onClick={openMenu}> */}
      <i class="fa-solid fa-circle-user fa-lg"
      style={{color: "#f2780c"}} onClick={openMenu}></i>
      {/* </button> */}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="profile-btn-content">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <NavLink exact to="/user/cart">
              <i class="fa-solid fa-cart-plus fa-sm" style={{color: "#f2780c"}}></i>
              </NavLink>
            </li>
            <li>
              <button className="button1" onClick={handleLogout}>Log Out</button>
            </li>
          </div>
          </>
        ) : (
          <>
            <div className="profile-btn-content">
              <div className="open-modal-login">
                <OpenModalButton
                  buttonText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>

                <OpenModalButton
                  buttonText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
