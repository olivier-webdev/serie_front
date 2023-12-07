import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import UserProvider from "./components/Providers/UserProvider/UserProvider";
import SerieProvider from "./components/Providers/SerieProvider/SerieProvider";

function App() {
  return (
    <div className="d-flex flex-column mh100">
      <UserProvider>
        <SerieProvider>
          <Header />
          <Suspense>
            <Outlet />
          </Suspense>
          <Footer />
        </SerieProvider>
      </UserProvider>
      <ScrollRestoration />
    </div>
  );
}

export default App;
