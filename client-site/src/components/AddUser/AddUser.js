import React, { useRef } from "react";

const AddUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Successfully added new user");
          e.target.reset();
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      <h2>Please Add An User</h2>
      <form onSubmit={handleAddUser}>
        <input ref={nameRef} type="text" placeholder="user name" />
        <input ref={emailRef} type="text" placeholder="user email" />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddUser;
