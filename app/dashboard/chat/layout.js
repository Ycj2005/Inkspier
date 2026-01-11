import SidebarChat from "./components/sidebar";

export default function chatLayout({ children }) {
  return (
    <div className="h-[92vh] bg-gray-50/50">
      <div className="w-[95%] lg:w-[90%] h-full mx-auto grid grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[30%_70%] bg-white shadow-2xl shadow-gray-200/50 rounded-t-xl overflow-hidden border-x border-t border-gray-100">
        {/* LEFT SIDE: FRIENDS LIST */}
        <SidebarChat />
        {/* RIGHT SIDE: CHAT AREA */}
        <div>{children}</div>
      </div>
    </div>
  );
}
