import { LogOut, Wallet } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../../config/app";
import { NAV_LINKS } from "../../config/NavLinks";
import { useLogout } from "../../hooks";

function SideBar({ isOpen, isMobile, setCloseSidebar }) {
  const navigate = useNavigate();
  const { logoutMutation } = useLogout();

  // handle log out user
  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        navigate("/welcome", { replace: true });
      },
    });
  };

  return (
    <aside className="w-full h-full overflow-hidden">
      <div className="p-6">
        <Link
          to="/"
          className={`relative flex h-10 items-center color-text-main font-bold text-2xl transition-all duration-300 ease-in-out ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          {/* Name */}
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              isOpen
                ? "max-w-48 translate-x-0 opacity-100"
                : "max-w-0 -translate-x-2 opacity-0"
            }`}
          >
            {APP_CONFIG.name}
          </span>

          {/* Icon */}
          <span
            className={`absolute transition-all duration-300 ease-in-out ${
              isOpen
                ? "scale-75 rotate-12 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            }`}
          >
            <Wallet size={35} />
          </span>
        </Link>
      </div>
      <div className="h-full relative flex flex-col justify-between">
        <nav className="py-5 px-2 space-y-1 mt-4">
          {NAV_LINKS.map(({ label, Icon }, index) => (
            <NavLink
              key={index}
              to={`/${label}`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-[#F3F4F5] color-text-main border-r-3 border-green-900 "
                    : "bg-white text-gray-500 items-center hover:bg-[#F3F4F5]"
                } capitalize font-semibold flex items-center gap-2 h-13 pl-4 rounded`
              }
              onClick={() => {
                if (isMobile) setCloseSidebar();
              }}
              end
            >
              <span>
                <Icon size={20} />
              </span>
              <span
                className={`overflow-hidden whitespace-nowrap transition-opacity duration-200 ${
                  isOpen ? "opacity-100 ml-2" : "opacity-0 ml-0"
                }`}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </nav>
        <div className="text-sm py-3 border-t border-gray-400/80 hover:text-black absolute bottom-20 left-0 right-0 text-gray-700 my-auto">
          <span
            onClick={handleLogout}
            className="flex items-center justify-center relative cursor-pointer hover:text-red-500"
          >
            <LogOut
              size={19}
              className={`${!isOpen ? "absolute left-7" : ""} mr-2`}
            />

            <span
              className={`transition-[opacity,transform,margin] duration-300 delay-75 overflow-hidden whitespace-nowrap ${
                isOpen ? "opacity-100 ml-1" : "opacity-0 -translate-x-2"
              }`}
            >
              Sign out
            </span>
          </span>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
