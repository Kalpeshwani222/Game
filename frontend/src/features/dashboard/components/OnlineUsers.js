import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doLogout } from "utils/localStorageOperations";
import { Modal, UserCard } from "components/ui";

const OnlineUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    doLogout(() => {
      navigate("/");
    });
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div className="p-4 border">
        <div id="search-bar" className="my-2">
          <input className="bg-slate-100 w-full px-4 py-2 rounded-full focus:outline-none" placeholder="Search for the player..." />
        </div>

        <UserCard btnClick={toggleModal} />
        <UserCard />
      </div>

      {isModalOpen && <Modal toggleModal={toggleModal} />}
    </>
  );
};

export default OnlineUsers;
