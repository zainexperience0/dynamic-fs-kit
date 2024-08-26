"use client";

import { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    window.location.href = "/main/allFields";
  });
  return <div>MainPage</div>;
};

export default MainPage;