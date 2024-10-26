import { Bitcoin, CoinsIcon, UserRoundPlus } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doLogout } from "utils/localStorageOperations";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const handleClick = () => {
    doLogout(() => {
      navigate("/");
    });
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen); // Open/close modal

  return (
    <>
      <div className="p-4">
        {/* Search Bar */}
        <div id="search-bar" className="my-2">
          <input className="bg-slate-100 w-full px-4 py-2 rounded-full focus:outline-none" placeholder="Search for the player..." />
        </div>

        {/* List Item */}
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
                onClick={toggleModal} // Open modal on click
                className="flex flex-row items-center justify-center gap-x-1 px-3 py-1 rounded-xl font-medium bg-blue-600 text-white"
              >
                <UserRoundPlus />
                Invite
              </button>
            </div>
          </div>
          <hr className="border-gray-300"></hr>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed p-5 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Invite User</h2>
            <p>Coins</p>
            <div className="my-2 flex flex-wrap gap-2">
              <Link className="w-fit border focus:border-blue-800 px-3 py-1 rounded-full flex flex-row items-center justify-center gap-x-1 bg-slate-100">
                <CoinsIcon className="fill-yellow-500" />
                200
              </Link>
              <Link className="w-fit border focus:border-blue-800 px-3 py-1 rounded-full flex flex-row items-center justify-center gap-x-1 bg-slate-100">
                <CoinsIcon className="fill-yellow-500" />
                300
              </Link>
              <Link className="w-fit border focus:border-blue-800 px-3 py-1 rounded-full flex flex-row items-center justify-center gap-x-1 bg-slate-100">
                <CoinsIcon className="fill-yellow-500" />
                500
              </Link>
            </div>
            <p>Match with:</p>
            <input value={"Rushikesh Wani"} type="text" placeholder="Enter player name" className="w-full px-4 py-2 mb-4 bg-slate-100 rounded-md focus:outline-none" />
            <div className="flex justify-end gap-2">
              <button
                onClick={toggleModal} // Close modal
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
