import { NavLink } from "react-router";

const Footer = () => {
  return (
    <div className="w-full p-4 border-t">
      <div className="w-full flex justify-between items-center">
        <p>Copyright © 2025 Mulingu. All rights reserved.</p>
        <NavLink to={"/impressum"}>
          <p className="text-foreground">Impressum</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
