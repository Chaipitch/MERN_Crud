import React from "react";
import { useSelector } from "react-redux";

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
      className="border-2 p-4 rounded-md mb-4"
    >
      <h4 className="font-bold text-lg">
        Note From {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p className="mt-2">{note.text}</p>
      <div className="text-xs mt-2">
        {new Date(note.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default NoteItem;
