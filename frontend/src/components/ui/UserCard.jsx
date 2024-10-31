import React from "react";
import { UserRoundPlus } from "lucide-react";

const UserCard = ({ btnClick }) => {
  return (
    <>
      <div id="list" className="">
        <div id="list-item" className="p-2 flex justify-between items-center hover:bg-slate-100">
          <div className="flex flex-row items-center gap-x-2">
            <div className="bg-slate-200 w-16 h-16 rounded-full border border-black">
              <img className="object-cover rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s" alt="user-profile" />
            </div>
            <div>
              <p className="font-medium text-lg">Rushikesh Wani</p>
              <p className="text-sm truncate">Hometown, area,</p>
            </div>
          </div>
          <div>
            <button
              onClick={btnClick} // Open modal on click
              className="flex flex-row items-center justify-center gap-x-1 px-3 py-1 rounded-xl font-medium bg-blue-600 text-white"
            >
              <UserRoundPlus />
              Invite
            </button>
          </div>
        </div>
        <hr className="border-gray-300"></hr>
      </div>
    </>
  );
};

export default UserCard;
