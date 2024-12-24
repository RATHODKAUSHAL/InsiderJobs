import React from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate()
  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick={() => navigate('/')} className="cursor-pointer" src={assets.logo} alt="" />
        {user ? (
          <div className="flex items-center gap-3">
            <Link to={'/applications'}>
            Applied Jobs
            </Link>
            <p>|</p>
            <p className="max-sm:hidden">Hii, {user.firstName + " " + user.lastName}</p>
            <UserButton/>
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-sm">
            <button className="text-gray-600">Recruiter Login</button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-9 py-2 rounded-full "
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;