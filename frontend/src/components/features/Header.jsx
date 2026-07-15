import { ChevronDown, Mail, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetUser } from "../../hooks";

const avatarColors = [
  "#16332D",
  "#1D4ED8",
  "#7C2D12",
  "#6D28D9",
  "#0F766E",
  "#BE123C",
  "#92400E",
  "#374151",
];

function getInitials(name = "") {
  const cleanName = name.trim();

  if (!cleanName) return "US";

  return cleanName.slice(0, 2).toUpperCase();
}

function getAvatarColor(name = "") {
  const colorIndex = name
    .split("")
    .reduce((total, letter) => total + letter.charCodeAt(0), 0);

  return avatarColors[colorIndex % avatarColors.length];
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);
  const { data: user, isLoading } = useGetUser();

  const userName = user?.name || "User";
  const userEmail = user?.email || "No email available";
  const initials = getInitials(userName);
  const avatarColor = getAvatarColor(userName);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex min-h-14 relative items-center justify-end px-7">
      <div className="relative" ref={profileRef}>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition hover:bg-gray-100"
          aria-label="Open account menu"
          aria-expanded={isOpen}
        >
          <span
            style={{ backgroundColor: avatarColor }}
            className="inline-flex size-9 items-center justify-center rounded-full text-sm font-semibold text-white"
          >
            {isLoading ? "" : initials}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 z-30 w-72 rounded-md bg-white p-4 shadow-lg ring ring-gray-300">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
              <span
                style={{ backgroundColor: avatarColor }}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white"
              >
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">
                  {userName}
                </p>
                <p className="truncate text-sm text-gray-500">{userEmail}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                  <User size={16} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Name
                  </p>
                  <p className="truncate text-gray-800">{userName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                  <Mail size={16} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Email
                  </p>
                  <p className="truncate text-gray-800">{userEmail}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
