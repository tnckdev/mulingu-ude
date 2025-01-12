import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

const StandardLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center pt-14">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default StandardLayout;
