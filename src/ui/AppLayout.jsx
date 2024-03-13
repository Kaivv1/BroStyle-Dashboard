import { Outlet } from "react-router-dom";
import ContentContainer from "./ContentContainer";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr] text-gray-900 dark:text-gray-300">
      <Header />
      <Sidebar />
      <Main>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </Main>
    </div>
  );
}

export default AppLayout;
