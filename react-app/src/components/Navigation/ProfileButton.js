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
            <div className="profile-user-content">
              <li>{user.username}</li>
            </div>
            {/* <li>{user.email}</li> */}
            <div className="profile-cart">
              <li>
                <button>
                  <NavLink exact to="/user/cart">
                  <i class="fa-solid fa-cart-plus fa-sm" style={{color: "#f2780c"}}></i>
                  </NavLink>
                </button>
              </li>
            </div>
            <div>
              <li>
                <button>
                  <NavLink exact to="/user/userPage">
                    <div style={{paddingBottom: '0px'}}>My Page</div>
                  </NavLink>
                </button>
              </li>
            </div>
            <div>
              <li>
                <button className="button1" onClick={handleLogout}>Log Out</button>
              </li>
            </div>
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
              <dvi>
                <OpenModalButton
                  buttonText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </dvi>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
