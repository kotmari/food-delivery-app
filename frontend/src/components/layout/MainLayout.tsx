import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

export const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col bg-bg">
      <Header />
        <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-social-bg/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
