import { Outlet } from "react-router";
import Footer from "./footer";

const ImpressumLayout = () => {
  return (
    <>
      <div className="border-l border-r flex flex-col items-center justify-between w-full">
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ImpressumLayout;
