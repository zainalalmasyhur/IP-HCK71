import { Outlet } from "react-router-dom";

import Navbar from "../components/Public/NavbarComponent";
import Footer from "../components/Public/Footer";

export default function RootLayout() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </>
  );
}
