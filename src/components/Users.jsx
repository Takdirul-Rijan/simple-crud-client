import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);

  // console.log(initialUsers);

  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);

    const newUsers = { name, email };

    // save this user data to the database (via server)

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUsers),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After saving user", data);
        if (data.insertedId) {
          newUsers._id = data.insertedId;
          setUsers([...users, newUsers]);
          alert("Users added successfully");
          e.target.reset();
        }
      });
  };

  const handleDeleteUser = (id) => {
    console.log("Delet a user", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after delete", data);
        if (data.deletedCount) {
          alert("Deleted successfully");
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };
  return (
    <div>
      <h3>Users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <p>---------------------</p>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name}: {user.email}
            <Link to={`/users/${user._id}`}>Details</Link>
            <Link to={`/update/${user._id}`}>Edit</Link>
            <button onClick={() => handleDeleteUser(user._id)}>❎</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
