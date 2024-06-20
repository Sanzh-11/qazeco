import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className="p-4 border-bottom h-full flex items-center bg-y shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
