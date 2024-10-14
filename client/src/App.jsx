import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./helper/RootLayout";
import ErrorPage from "./helper/ErrorPage";
import { lazy, Suspense } from "react";
import Loader from "./helper/Loader";
const Home = lazy(() => import("./components/Home"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const PrivacyPolicy = lazy(() => import("./components/Privacy"));
const Terms = lazy(() => import("./components/Terms"));
const Cookie = lazy(() => import("./components/Cookie"));
const Refund = lazy(() => import("./components/Refund"));
const Contact = lazy(() => import("./components/ContactUs"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Rental = lazy(() => import("./components/Rental"));
const AdminLogin = lazy(() => import("./components/admin/Login.jsx"));
const Dashboard = lazy(() => import("./components/admin/Dashboard.jsx"));
const Utility = lazy(() => import("./components/admin/Utility.jsx"));
const Account = lazy(() => import("./components/admin/Account.jsx"));
const MaintenancePage = lazy(() => import("./helper/PageNotFound.jsx"));
const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/legal/our-services" element={<Home />} />
        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal/terms-and-conditions" element={<Terms />} />
        <Route path="/legal/cookie-policy" element={<Cookie />} />
        <Route path="/legal/refund-policy" element={<Refund />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/myAccount" element={<Account />} />
        <Route path="/utility-payments" element={<Utility />} />
        <Route path="/admin/utility" element={<Utility />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rental-agreement" element={<Rental />} />
        <Route path="*" element={<MaintenancePage/>} />
      </Route>
    )
  );
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default App;
