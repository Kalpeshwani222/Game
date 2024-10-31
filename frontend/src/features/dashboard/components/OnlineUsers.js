import React from "react";
import { useNavigate } from "react-router-dom";
import { doLogout } from "utils/localStorageOperations";
import { UserCard } from "components/ui";

const OnlineUsers = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    doLogout(() => {
      navigate("/");
    });
  };

  return (
    <>
      {/* <button type="button" onClick={handleClick}>
        Logout
      </button> */}

      <div className="p-4 border">
        <div id="search-bar" className="text-center">
          <input className="bg-slate-100 w-full px-4 py-2 rounded-full focus:outline-none" placeholder="search for the player..." />
        </div>

        <UserCard />
        <UserCard />
      </div>
    </>
  );
};

export default OnlineUsers;
