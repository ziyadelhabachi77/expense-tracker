import { PanelLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../features/Header";
import SideBar from "../features/SideBar";

function AppLayout() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );

  const [isSideBarOpen, setIsSideBarOpen] = useState(!isMobile);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const handler = (e) => {
      setIsMobile(e.matches);
      setIsSideBarOpen(!e.matches);
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-color-main relative">
      {isMobile && isSideBarOpen && (
        <div
          onClick={() => setIsSideBarOpen(false)}
          className="fixed inset-0 backdrop-blur-xs bg-black/40 z-30"
        />
      )}

      {/* sidebar */}
      <div
        className={`
          bg-white ring ring-gray-200 shadow z-40 transition-all duration-300

          ${
            isMobile
              ? `
            fixed top-0 left-0 bottom-0 w-64
            ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}
          `
              : `
            relative
            ${isSideBarOpen ? "w-64" : "w-20"}
          `
          }
        `}
      >
        <SideBar
          isOpen={isSideBarOpen}
          isMobile={isMobile}
          setCloseSidebar={() => setIsSideBarOpen(false)}
        />
        <PanelLeft
          size={19}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="text-gray-500 absolute -right-8 top-4 cursor-pointer bg-white rounded-md shadow p-1 w-7 h-7"
        />
      </div>

      {/* content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white w-full z-10 sticky top-0 ring ring-gray-300 shadow min-h-14">
          <Header />
        </div>
        <main className="flex-1 overflow-y-auto p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
