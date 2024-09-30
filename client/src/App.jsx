import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./helper/RootLayout";
import ErrorPage from "./helper/ErrorPage";
import Home from "./components/Home";

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/about-us" element={<Home />} />
        <Route path="/contact-us" element={<Home />} />
        <Route path="/our-services" element={<Home />} />
      </Route>
    )
  );
  return <RouterProvider router={routes} />;
};

export default App;
