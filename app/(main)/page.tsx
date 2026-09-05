import { redirect } from "next/navigation";
import React from "react";

const HomePage = () => {
  redirect("/login");
};

export default HomePage;
