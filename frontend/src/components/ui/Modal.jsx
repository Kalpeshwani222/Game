import React from "react";
import { Link } from "react-router-dom";
import { CoinsIcon } from "lucide-react";
import { sendInvitation } from "features/dashboard/apis/send-invitation";

const Modal = ({ toggleModal, userInfo }) => {
  return (
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
        <input value={userInfo.firstName + " " + userInfo.lastName} type="text" placeholder="Enter player name" className="w-full px-4 py-2 mb-4 bg-slate-100 rounded-md focus:outline-none" />
        <div className="flex justify-end gap-2">
          <button
            onClick={toggleModal} // Close modal
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={() => sendInvitation(userInfo._id, 500)}>
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
