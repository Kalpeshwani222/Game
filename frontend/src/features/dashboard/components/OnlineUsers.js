import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doLogout } from "utils/localStorageOperations";
import { Modal, UserCard } from "components/ui";
import { useGetUsers } from "../hooks/useGetUsers";

const OnlineUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data } = useGetUsers();

  const handleClick = () => {
    doLogout(() => {
      navigate("/");
    });
  };
  //   const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [selectedUser, setSelectedUser] = useState(null);

  // Open modal with user data or close by setting selectedUser to null
  const handleUserClick = (user) => {
    setSelectedUser(user);
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

      {selectedUser && <Modal toggleModal={() => setSelectedUser(null)} userInfo={selectedUser} />}
    </>
  );
};

export default OnlineUsers;
