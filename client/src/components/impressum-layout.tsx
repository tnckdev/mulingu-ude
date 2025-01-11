import { Outlet } from "react-router";
import Footer from "@/components/footer";

const ImpressumLayout = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between w-full">
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ImpressumLayout;
