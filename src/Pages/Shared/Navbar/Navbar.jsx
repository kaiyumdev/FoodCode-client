import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import profile from "../../../assets/others/profile.png";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Control menu toggle

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navOptions = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/contact-us">Contact Us</Link></li>
      <li><Link to="/menu">Our Menu</Link></li>
      <li><Link to="/order/salads">Order Food</Link></li>
      {user && (isAdmin ? <li><Link to="/dashboard/adminHome">Dashboard</Link></li> : <li><Link to="/dashboard/userHome">Dashboard</Link></li>)}
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-opacity-30 max-w-full bg-black text-white px-4 md:px-8 lg:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          {isDropdownOpen && ( // Only show if isDropdownOpen is true
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
              {navOptions}
              <li>
                <Link to="/dashboard/cart">
                  <button className="btn flex items-center">
                    <FaShoppingCart className="mr-2" />
                    <div className="badge badge-secondary">+{cart.length}</div>
                  </button>
                </Link>
              </li>
              {user ? (
                <button onClick={handleLogOut} className="btn">Log Out</button>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">FoodCode</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="hidden lg:flex navbar-end list-none gap-5 mx-5">
        <li>
          <Link to="/dashboard/cart">
            <button className="btn flex items-center">
              <FaShoppingCart className="mr-2" />
              <div className="badge badge-secondary">+{cart.length}</div>
            </button>
          </Link>
        </li>
        {user ? (
          <>
            <button onClick={handleLogOut} className="btn btn-ghost">Log Out</button>
            {user?.photoURL ? (
              <img className="w-10 h-10 rounded-full cursor-pointer" src={user.photoURL} alt="User Profile" />
            ) : (
              <img className="w-10 h-10 rounded-full cursor-pointer" src={profile} alt="User Profile" />
            )}
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </div>
    </div>
  );
};

export default NavBar;
