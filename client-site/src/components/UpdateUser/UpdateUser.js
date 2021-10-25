import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleName = (e) => {
    const updatedName = e.target.value;
    const updateUser = { name: updatedName, email: user.email };
    setUser(updateUser);
  };
  const handleEmail = (e) => {
    const updatedEmail = e.target.value;
    const updateUser = { name: user.name, email: updatedEmail };
    setUser(updateUser);
  };

  const handleUpdateUser = (e) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("User updated successfully!");
          setUser({});
        }
      });

    e.preventDefault();
  };
  return (
    <div>
      <h2>Update User: {user.name}</h2>
      <p>
        <small>{id}</small>
      </p>
      <form onSubmit={handleUpdateUser}>
        <input onChange={handleName} type="text" value={user.name || ""} />
        <input onChange={handleEmail} type="email" value={user.email || ""} />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
