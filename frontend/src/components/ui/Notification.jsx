import React from "react";

const Notification = ({ invite, onAccept, onReject }) => {
  return (
    <div className="fixed bottom-5 right-5 w-80 p-4 bg-white shadow-lg rounded-lg transform transition-all duration-500 ease-in-out animate-slide-in">
      <h3 className="font-semibold text-gray-800">{invite.senderName} invited you to a match!</h3>
      <p className="text-gray-600">Match Amount: {invite.matchCoins} coins</p>
      <div className="flex justify-end mt-4 space-x-3">
        <button onClick={onReject} className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition duration-200">
          Reject
        </button>
        <button onClick={onAccept} className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200">
          Accept
        </button>
      </div>
    </div>
  );
};

export default Notification;
