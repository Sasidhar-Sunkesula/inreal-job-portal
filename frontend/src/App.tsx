import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ROUTES } from "./constants/routes";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path={ROUTES.Home} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.Login} element={<Login />} />
            <Route path={ROUTES.Signup} element={<Signup />} />
            <Route path={ROUTES.Profile} element={<Profile />} />
            <Route path={ROUTES.Jobs} element={<Jobs />} />
            <Route
              path={ROUTES.Recommendations}
              element={<Recommendations />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
