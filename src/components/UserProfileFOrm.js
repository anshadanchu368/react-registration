import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfileFOrm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");

  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setUser(response.data.user);
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      if (image) {
        formData.append("image", image);
      }
      formData.append("address", address);

      await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {user && (
        <>
        <h2>User Profile</h2>
      <img src={user.image} alt="AVatar" />
      <p>Name:{user.name}</p>
      <p>Password:{user.password}</p>
      <p>Address:{user.address}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <textarea
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <button type="submit">Update Profile</button>
      </form>
        
        </>
      )}
    </div>
  );
};

export default UserProfileFOrm;
