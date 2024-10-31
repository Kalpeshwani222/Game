import React from "react";

const UserCard = () => {
  return (
    <>
      <div id="list">
        <div className="p-4 flex justify-between items-center">
          <div className="flex flex-row gap-x-4">
            <div className="w-14 rounded-full border border-black">
              <img className="rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s" alt="User-profile" />
            </div>
            <div className="">
              <p className="font-medium text-lg">Rushikesh Wani</p>
              <p>Hometown, area, name-6629 29</p>
            </div>
          </div>
          <div>
            <button className="px-4 py-1 rounded-xl font-medium bg-blue-600 text-white">Invite</button>
          </div>
        </div>
        <hr className="border-gray-300"></hr>
      </div>
    </>
  );
};

export default UserCard;
