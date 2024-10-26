import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="p-4">
        <div id="search-bar" className="">
          <input className="bg-slate-100 w-full px-4 py-2 rounded-full focus:outline-none" placeholder="search for the player..." />
        </div>
        <div id="list" className="">
          <div id="list-item" className="p-4 flex justify-between items-center">
            <div className="flex flex-row items-center gap-x-4">
              <div className="bg-slate-200 w-16 h-16 rounded-full border border-black">
                <img className="object-cover rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s" alt="user-profile" />
              </div>
              <div className="">
                <p className="font-medium text-lg">Rushikesh Wani</p>
                <p className="text-sm">Hometown, area,</p>
              </div>
            </div>
            <div>
              <button className="px-4 py-1 rounded-xl font-medium bg-blue-600 text-white">Invite</button>
            </div>
          </div>
          <hr className="border-gray-300"></hr>
          <div id="list-item" className="p-4 flex justify-between items-center">
            <div className="flex flex-row items-center gap-x-4">
              <div className="bg-slate-200 w-16 h-16 rounded-full border border-black">
                <img className="object-cover rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s" alt="User-profile" />
              </div>
              <div className="">
                <p className="font-medium text-lg">Rushikesh Wani</p>
                <p className="text-sm">Hometown, area,</p>
              </div>
            </div>
            <div>
              <button className="px-4 py-1 rounded-xl font-medium bg-blue-600 text-white">Invite</button>
            </div>
          </div>
          <hr className="border-gray-300"></hr>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
