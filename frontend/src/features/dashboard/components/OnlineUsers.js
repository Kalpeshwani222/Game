import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doLogout } from "utils/localStorageOperations";
import { Modal, Notification, UserCard } from "components/ui";
import { useGetUsers } from "../hooks/useGetUsers";
import useSocket from "hooks/useSocket";
import initializeSocket from "utils/socketConn";
import { acceptInvitation } from "../apis/accept-invite";

const notificationSound = new Audio("/ring.wav");

const OnlineUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useGetUsers();

  //   const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [selectedUser, setSelectedUser] = useState(null);
  const [invite, setInvite] = useState(null);

  // Open modal with user data or close by setting selectedUser to null
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const socket = initializeSocket();
    // Listen for the "new-invite" event
    socket?.on("new-invite", (inviteData) => {
      console.log("New invite received:", inviteData);
      setInvite(inviteData);
      notificationSound.play().catch((error) => {
        console.error("Error playing notification sound:", error);
      });
    });

    //listen for the start game event
    socket?.on("start-game", (data) => {
      console.log("Game starting:", data);
      // Navigate to game screen or set up game board as needed
      // navigate(`/game?opponentId=${opponentId}&coins=${totalCoins}`);
      navigate(`/match/${data.gameId}`);
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off("new-invite"); // Remove the listener
        socket.disconnect();
      }
    };
  }, []);

  const handleAccept = (inviteID) => {
    // Handle accept action here (emit an event back)
    acceptInvitation(inviteID);

    setInvite(null);
  };

  const handleReject = () => {
    // Handle reject action here (emit an event back)
    setInvite(null);
  };

  return (
    <>
      <div className="p-4 border">
        <div id="search-bar" className="my-2">
          <input className="bg-slate-100 w-full px-4 py-2 rounded-full focus:outline-none" placeholder="Search for the player..." />
        </div>

        {data?.map((user) => (
          <UserCard key={user._id} btnClick={() => handleUserClick(user)} info={user} />
        ))}
      </div>
      {invite && <Notification invite={invite} onAccept={() => handleAccept(invite?.inviteId)} onReject={handleReject} />}

      {selectedUser && <Modal toggleModal={() => setSelectedUser(null)} userInfo={selectedUser} />}
    </>
  );
};

export default OnlineUsers;
