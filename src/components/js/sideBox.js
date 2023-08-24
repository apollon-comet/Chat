import React, { useEffect, useState } from "react";
import "../css/sideBox.css";
// import Avatar from '@mui/material/Avatar';
import { collection, db, onSnapshot, orderBy, query } from "../../firebase";
import AddNewChat from "./addNewChat";
import ChatRoom from "./chatRoom";
import { useStateValue } from "./stateProvider";

function SideBox() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  const capitalize = (str) =>
    str && str[0].toUpperCase() + str.slice(1).toLowerCase();

  useEffect(() => {
    const roomInAscOrder = query(
      collection(db, "chatRooms"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(roomInAscOrder, (snapshots) =>
      setRooms(
        snapshots.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sideBox">
      <header className="sideBox_header">
        {/* <Avatar src={} variant="rounded" /> */}
        <div className="chatRoomInfo">
          <h1>
            {user.uid === "pulI8nprxOV7BMWnHQcMls1pMWN2"
              ? "Guest"
              : capitalize(user.displayName)}
          </h1>
        </div>
      </header>
      <AddNewChat />
      <div className="sideBox_chatRoom">
        <div className="chatRoomBox">
          {rooms.map((room) => (
            <ChatRoom
              key={room.id}
              id={room.id}
              name={room.data.name}
              uid={room.data.uid}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBox;
