import React, { useEffect } from "react";
import Header from "../../components/Header";
import { getApihandler } from "../../Apihandler";

export default function MyArts() {
  useEffect(() => {
    getMyArts();
  }, []);
  const getMyArts = async () => {
    const res = await getApihandler("/");
  };
  return (
    <>
      <Header />
      <h1>My Art</h1>
    </>
  );
}
