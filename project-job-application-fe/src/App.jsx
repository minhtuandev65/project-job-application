// redux store
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import { store } from "./store/store";
import { Loading } from "./components";
import { Admin, Clients } from "./templates";
import { LoginPage, ManageCandidateProfileAdminPage } from "./pages";

// Pages

function AppEffects() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  }, [location, navigate]);
  return null;
}
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppEffects />
        <Loading />
        <Routes>
          {/* Admin */}
          <Route path="/admin" element={<Admin />}>
            <Route
              path="managecandidateprofile"
              element={<ManageCandidateProfileAdminPage />}
            />
          </Route>
          {/* Client */}
          <Route path="/" element={<Clients />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
