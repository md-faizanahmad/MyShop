// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import { AuthProvider } from "./context/AuthContext";
// import { useAuth } from "./context/Auth";
// import { StoreProvider } from "./context/StoreProvider";
// import { useStore } from "./context/useStore";

// import Header from "./components/Header/Header";
// import Footer from "./components/Footer";
// // import TopAnnouncementBar from "./components/TopAnnountment";

// import Home from "./pages/Home";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import CategoryProducts from "./pages/CategoryProducts";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart"; // ✅ IMPORTANT

// // Dashboard
// import DashboardLayout from "./user-dashboard/DashboardLayout";
// import DashboardHome from "./user-dashboard/DashboardHome";
// import ProfilePage from "./user-dashboard/ProfilePage";
// import OrdersPage from "./user-dashboard/OrderPage";
// import WishlistPage from "./user-dashboard/WishlistPage";
// import AddressesPage from "./user-dashboard/AddressPage";

// import LoadingScreen from "./components/LoadingScreen";

// // Legal pages
// import Contact from "./pages/legal/Contact";
// import Terms from "./pages/legal/Terms";
// import Privacy from "./pages/legal/Privacy";
// import Shipping from "./pages/legal/Shipping";
// import Refund from "./pages/legal/Refund";

// import type { JSX } from "react";
// import OrderSuccess from "./pages/OrderSuccess";
// import Checkout from "./pages/Checkout";
// import OrderDetails from "./pages/OrderDetails";

// // ------------------ PROTECTED ROUTE ------------------
// function ProtectedRoute({ children }: { children: JSX.Element }) {
//   const { user, loading } = useAuth();

//   if (loading) return null;

//   if (!user?.isLoggedIn) return <Navigate to="/login" replace />;

//   return children;
// }

// // ------------------ MAIN APP CONTENT ------------------
// function AppContent() {
//   const { user, loading } = useAuth();
//   const { wishlistCount, cartCount } = useStore();

//   if (loading) return <LoadingScreen />;

//   const safeUser = user
//     ? { isLoggedIn: true, name: user.name }
//     : { isLoggedIn: false };

//   return (
//     <>
//       {/* <TopAnnouncementBar /> */}

//       <Header
//         brand={{ name: "AZ-Store", link: "/" }}
//         user={safeUser}
//         cartCount={cartCount}
//         wishlistCount={wishlistCount}
//       />

//       <div className="pt-16">
//         <Routes>
//           {/* PUBLIC */}
//           <Route path="/" element={<Home />} />
//           <Route path="/category/:categoryId" element={<CategoryProducts />} />
//           <Route path="/product/:productId" element={<ProductDetails />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/order-success" element={<OrderSuccess />} />

//           {/* CHECKOUT (PROTECTED) */}
//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoute>
//                 <Checkout />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/order/:orderId"
//             element={
//               <ProtectedRoute>
//                 <OrderDetails />
//               </ProtectedRoute>
//             }
//           />

//           {/* AUTH */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />

//           {/* DASHBOARD */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <DashboardLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<DashboardHome />} />
//             <Route path="profile" element={<ProfilePage />} />
//             <Route path="orders" element={<OrdersPage />} />
//             <Route path="wishlist" element={<WishlistPage />} />
//             <Route path="addresses" element={<AddressesPage />} />
//           </Route>

//           {/* LEGAL */}
//           <Route path="/contact-us" element={<Contact />} />
//           <Route path="/terms-condition" element={<Terms />} />
//           <Route path="/privacy-policy" element={<Privacy />} />
//           <Route path="/shipping-policy" element={<Shipping />} />
//           <Route path="/cancellations-refunds" element={<Refund />} />
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// }

// // ------------------ ROOT APP ------------------
// export default function App() {
//   return (
//     <Router future={{ v7_startTransition: true }}>
//       <AuthProvider>
//         <StoreProvider>
//           <AppContent />
//         </StoreProvider>
//       </AuthProvider>
//     </Router>
//   );
// }
/////////////////////////////////////////////// without user dashboard

// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/Auth";
import { StoreProvider } from "./context/StoreProvider";
// import { useStore } from "./context/useStore";

import Header from "./components/Header/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/products/ProductDetails";
import CartPage from "./pages/cart/CartPage";

import LoadingScreen from "./components/LoadingScreen";

// User Pages (No Dashboard Layout)
import ProfilePage from "./user-dashboard/ProfilePage";
import OrdersPage from "./user-dashboard/OrderPage";
import WishlistPage from "./user-dashboard/WishlistPage";
import AddressesPage from "./user-dashboard/AddressPage";

// Other Pages
import OrderSuccess from "./pages/OrderSuccess";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import SearchResults from "./pages/order/SearchResults";

// Legal Pages
import Contact from "./pages/legal/Contact";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Shipping from "./pages/legal/Shipping";
import Refund from "./pages/legal/Refund";
import About from "./pages/About";
import NotFound from "./NotFound";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuthCheck } from "./hooks/useAuthCheck";
import LoginWithOTP from "./components/auth/LoginWithOTP";
// import TestModeBanner from "./components/TestModeBanner";

// ------------------ MAIN APP CONTENT ------------------
function AppContent() {
  const { user, loading: authLoading } = useAuth();
  // const { wishlistCount, cartCount } = useStore();
  useAuthCheck();
  if (authLoading) return <LoadingScreen />;

  const safeUser = user
    ? { isLoggedIn: true, name: user.name }
    : { isLoggedIn: false };
  console.log(safeUser);
  return (
    <>
      {/* <TestModeBanner /> */}
      {/* Header with Search, Navbar, Cart, etc. */}
      <Header />
      <Outlet />
      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        <div className="pt-3 md:pt-2">
          {/* Matches header height */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<CategoryProducts />} />

            {/* SEO Product Page */}
            <Route
              path="/category/:categorySlug/:productSlug"
              element={<ProductDetails />}
            />

            <Route path="/search" element={<SearchResults />} />
            <Route path="/order-success" element={<OrderSuccess />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/login-otp" element={<LoginWithOTP />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected User Pages */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/addresses"
              element={
                <ProtectedRoute>
                  <AddressesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:orderId"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />

            {/* Legal & Info */}
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/terms-condition" element={<Terms />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/shipping-policy" element={<Shipping />} />
            <Route path="/cancellations-refunds" element={<Refund />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </>
  );
}

// ------------------ ROOT APP ------------------
export default function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <AuthProvider>
        <StoreProvider>
          <AppContent />
        </StoreProvider>
      </AuthProvider>
    </Router>
  );
}
