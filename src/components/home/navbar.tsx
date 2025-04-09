import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  function getInitials(name?: string | null): string {
    if (!name) return "";

    const words = name.trim().split(" ");
    const initials = words
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");

    return initials;
  }

  const userInitials = session ? getInitials(session.user?.name) : "";

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 1000,
        padding: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <nav style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <div className="flex items-center mr-4">
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">
            {session ? session.user?.name : "Usuario"}
          </h1>
        </div>
        <div className="relative inline-flex items-center justify-center mr-2.5 w-10 h-10 overflow-hidden shadow-2xl bg-red-500 rounded-full dark:bg-gray-600">
          <span className="font-bold text-yellow-50 dark:text-gray-300">{userInitials}</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
