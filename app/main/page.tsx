"use client";

import { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    window.location.href = "/main/table";
  });
  return <div>MainPage</div>;
};

export default MainPage;