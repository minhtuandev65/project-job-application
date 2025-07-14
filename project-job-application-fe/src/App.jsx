// redux store
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Loading from "./components/Loading/Loading";
import LoginPage from "./pages/LoginPage/LoginPage";
import LoginTemplate from "./template/LoginTemplate/LoginTemplate";
import RegisterTemplate from "./template/RegisterTemplate/RegisterTemplate";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetYourPassword from "./pages/ResetYourPassword/ResetYourPassword";
import AccountVerification from "./pages/VerifyEmail/AccountVerification";
import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import EmployeePage from "./pages/EmployeePage/EmployeePage";
import ManageUserPage from "./pages/Admin/ManageUsersAdmin/ManageUsersAdminPage/ManageUsersAdminPage";
import ManageCandidateProfileAdminPage from "./pages/Admin/ManageCandidateProfileAdmin/ManageCandidateProfileAdminPage/ManageCandidateProfileAdminPage";
import ManageCandidateProfileDetailAdminPage from "./pages/Admin/ManageCandidateProfileAdmin/ManageCandidateProfileDetailAdminPage/ManageCandidateProfileDetailAdminPage";
import ManageUsersDetailAdminPage from "./pages/Admin/ManageUsersAdmin/ManageUsersDetailAdminPage/ManageUsersDetailAdminPage";
import MyProfilePage from "./pages/MyProfilePage/MyProfilePage";
import ManagePostAdminPage from "./pages/Admin/ManageCompanyAdmin/ManageCompanyAdminPage/ManageCompanyAdminPage";
import ManageCompanyDetailAdminPage from "./pages/Admin/ManageCompanyAdmin/ManageCompanyDetailAdminPage/ManageCompanyDetailAdminPage";

import CandidateProfileDetailPage from "./pages/EmployeePage/candidateProfile/CandidateProfileDetailPage/CandidateProfileDetailPage";
import SearchPage from "./pages/Search/SearchPage";
import CompanyList from "./pages/EmployeePage/CompanyList/CompanyList";
import CandidateProfilePage from "./pages/EmployeePage/candidateProfile/candidateProfilePage/candidateProfilePage";

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
          {/* Login routes */}
          <Route path="/login" element={<LoginTemplate />}>
            <Route index element={<LoginPage />} />
          </Route>
          {/* Register routes */}
          <Route path="/register" element={<RegisterTemplate />}>
            <Route index element={<RegisterPage />} />
          </Route>
          {/* Xác thực routes */}
          <Route path="/account" element={<RegisterTemplate />}>
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="resetPassword" element={<ResetYourPassword />} />
            <Route path="verification" element={<AccountVerification />} />
          </Route>
          <Route path="/home" element={<HomeTemplate />}>
            <Route index element={<EmployeePage />} />
            <Route path="me" element={<MyProfilePage />} />
            <Route
              path="company/:companyId/detail"
              element={<ManageCompanyDetailAdminPage />}
            />
            <Route path="candidateProfile" element={<CandidateProfilePage />} />
            <Route
              path="candidatePrifile/:candidateProfileId/detail"
              element={<CandidateProfileDetailPage />}
            />
            <Route path="search" element={<SearchPage />} />
            <Route path="companyList" element={<CompanyList />} />
          </Route>
          <Route path="/admin" element={<HomeTemplate />}>
            <Route path="manageUser" element={<ManageUserPage />} />
            <Route
              path="user/:userId/detail"
              element={<ManageUsersDetailAdminPage />}
            />
            <Route
              path="manageCandidateProfile"
              element={<ManageCandidateProfileAdminPage />}
            />
            <Route
              path="manageCandidateProfile/:candidateProfileId/detail"
              element={<ManageCandidateProfileDetailAdminPage />}
            />
            <Route path="manageCompany" element={<ManagePostAdminPage />} />
            <Route
              path="manageCompany/:companyId/detail"
              element={<ManageCompanyDetailAdminPage />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
