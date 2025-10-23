import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClassesPage from "./pages/ClassesPage";
import ContactPage from "./pages/ContactPage";
import LocationPage from "./pages/LocationPage";
import LocationStudioOne from "./pages/LocationStudioOne";
import NavBar from "./components/NavBar";
import HomeFooter from "./components/HomeFooter";
import StudioPolicies from "./pages/StudioPolicies";
import PackagesPage from "./pages/PackagesPage";
import MoveControl from "./classes-subpages/MoveControl";
import MoveBurn from "./classes-subpages/MoveBurn";
import MoveJump from "./classes-subpages/MoveJump";
import MoveChair from "./classes-subpages/MoveChair";
import IntroCheckout from "./packages-subpages/IntroCheckout";
import DropInCheckout from "./packages-subpages/DropInCheckout";
import FourClassesCheckout from "./packages-subpages/FourClassesCheckout";
import ClassesBundleCheckout from "./packages-subpages/25ClassesCheckout";
import TimetablePage from "./pages/TimetablePage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminBookingsPage from "./pages/admin/AdminBookingsPage";
import AdminClientsPage from "./pages/admin/AdminClientsPage";
import AdminServicesPage from "./pages/admin/AdminServicesPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminLogin from "./pages/admin/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      {/* Client-side routes with navbar and footer */}
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        {/* Classes pages */}
        <Route path="/classes" element={<ClassesPage />}></Route>
        <Route path="/movecontrol" element={<MoveControl />}></Route>
        <Route path="/moveburn" element={<MoveBurn />}></Route>
        <Route path="/movejump" element={<MoveJump />}></Route>
        <Route path="/movechair" element={<MoveChair />}></Route>
        {/* Classes pages end */}

        {/* Packages pages */}
        <Route path="/packages" element={<PackagesPage />}></Route>
        <Route path="/checkout-intro" element={<IntroCheckout />}></Route>
        <Route path="/checkout-dropin" element={<DropInCheckout />}></Route>
        <Route
          path="/checkout-fourclasses"
          element={<FourClassesCheckout />}
        ></Route>
        <Route
          path="/checkout-25classes"
          element={<ClassesBundleCheckout />}
        ></Route>

        {/* Packages pages end */}
        <Route path="/timetable" element={<TimetablePage />}></Route>

        {/* Location, Contact, and Policies */}
        <Route path="/location" element={<LocationPage />}></Route>
        <Route path="/move-studio-1" element={<LocationStudioOne />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/studio-policies" element={<StudioPolicies />}></Route>
        <Route path="/admin-login" element={<AdminLogin />}></Route>
      </Routes>
      <HomeFooter />

      {/* Admin routes - completely independent */}
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="clients" element={<AdminClientsPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
