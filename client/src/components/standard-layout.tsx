import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const StandardLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-between">
        <div className="w-full min-h-screen flex flex-col items-center justify-center mt-14">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default StandardLayout;
