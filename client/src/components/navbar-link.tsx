import { Link } from "react-router";


const NavbarLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link
      to={to}
      className="flex items-center transition-colors hover:underline hover:decoration-foreground"
    >
      <p className="font-medium text-sm text-foreground">{text}</p>
    </Link>
  );
};

export default NavbarLink;
