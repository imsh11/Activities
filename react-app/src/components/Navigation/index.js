import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			<div className='nav-homeBtn'>
			<span className="main-page-tooltip">{"Home"}</span>
				<NavLink exact to="/">
				<i class="fa-solid fa-house fa-lg" style={{color: "#f2780c"}}></i>
				</NavLink>
			</div>
			{isLoaded && (
				<div className='nav-right'>
					<div className='nav-listBtn'>
							{/* <span className="main-page-tooltip">{"Place List"}</span> */}
						{/* <button > */}
							<NavLink exact to='/user/placeList'>
							<i class="fa-solid fa-list fa-lg" style={{color: "#f2780c"}}></i>
							</NavLink>
						{/* </button> */}
					</div>
					<div className='nav-cartBtn'>
					{/* <span className="main-page-tooltip">{"Cart"}</span> */}
						{/* <button className=''> */}
							<NavLink exact to='/user/cart'>
								<i class="fa-solid fa-cart-shopping fa-lg" style={{color: "#f2780c"}}></i>
							</NavLink>
						{/* </button> */}
					</div>
					<div className='nav-profile'>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;
