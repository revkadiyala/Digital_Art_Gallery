import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get data from localStorage
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      <Header />
      <h3>User Profile</h3>
      {userData ? (
        <div>
          <p>
            <strong>Name:</strong> {userData.user_FullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.user_Email}
          </p>
          <p>
            <strong>Mobile:</strong> {userData.mobile_no}
          </p>
          <p>
            <strong>Country Code:</strong> {userData.country_code}
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </>
  );
}
