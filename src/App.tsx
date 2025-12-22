// src / App.tsx;
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/products/ProductDetails";
import CartPage from "./pages/cart/CartPage";

// import LoadingScreen from "./components/LoadingScreen";

// User Pages (No Dashboard Layout)
import ProfilePage from "./user-dashboard/ProfilePage";
import OrdersPage from "./user-dashboard/OrderPage";
import WishlistPage from "./user-dashboard/WishlistPage";
import AddressesPage from "./user-dashboard/AddressPage";

// Other Pages
import OrderSuccess from "./pages/OrderSuccess";
// import Checkout from "./pages/Checkout";
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
import LoginWithOTP from "./components/auth/LoginWithOTP";
import ScrollToTop from "./helper/ScrollToTop";
import AuthInitializer from "./auth/AuthInitializer";
import AllProductsPage from "./pages/allProductpage";
import CheckoutPage from "./pages/checkout/checkoutPage";
// import { useAuthStore } from "./store/useAuthStore";
// import TestModeBanner from "./components/TestModeBanner";

// ------------------ MAIN APP CONTENT ------------------
function AppContent() {
  // const restoring = useAuthStore((s) => s.initializing);

  // if (restoring) return <LoadingScreen />;

  return (
    <>
      <ScrollToTop />
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
            <Route path="/products" element={<AllProductsPage />} />

            {/* // Category listing (main) */}
            {/* Category listing (main) */}
            <Route
              path="/category/:categorySlug"
              element={<CategoryProducts />}
            />

            {/* Category + subcategory listing */}
            <Route
              path="/category/:categorySlug/sub/:subSlug"
              element={<CategoryProducts />}
            />

            {/* Product details inside category */}
            <Route
              path="/category/:categorySlug/product/:productSlug"
              element={<ProductDetails />}
            />

            <Route path="/search" element={<SearchResults />} />
            <Route path="/order-success" element={<OrderSuccess />} />

            {/*------- Auth------ */}
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
                  <CheckoutPage />
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
    <Router>
      <AuthInitializer />
      <AppContent />
    </Router>
  );
}
// src / App.tsx;

//// update with zustand
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Header from "./components/Header/Header";
// import Footer from "./components/Footer";
// import ScrollToTop from "./helper/ScrollToTop";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import AuthInitializer from "./auth/AuthInitializer";
// import LoadingScreen from "./components/LoadingScreen";

// import { useAuthStore } from "./store/useAuthStore";

// import Home from "./pages/Home";
// import Login from "./components/auth/Login";
// import LoginWithOTP from "./components/auth/LoginWithOTP";
// import SignUp from "./components/auth/SignUp";

// import CategoryProducts from "./pages/CategoryProducts";
// import ProductDetails from "./pages/products/ProductDetails";
// import CartPage from "./pages/cart/CartPage";

// import ProfilePage from "./user-dashboard/ProfilePage";
// import OrdersPage from "./user-dashboard/OrderPage";
// import WishlistPage from "./user-dashboard/WishlistPage";
// import AddressesPage from "./user-dashboard/AddressPage";

// import OrderSuccess from "./pages/OrderSuccess";
// import Checkout from "./pages/Checkout";
// import OrderDetails from "./pages/OrderDetails";
// import SearchResults from "./pages/order/SearchResults";

// import Contact from "./pages/legal/Contact";
// import Terms from "./pages/legal/Terms";
// import Privacy from "./pages/legal/Privacy";
// import Shipping from "./pages/legal/Shipping";
// import Refund from "./pages/legal/Refund";
// import About from "./pages/About";
// import NotFound from "./NotFound";

// function AppContent() {
//   const initializing = useAuthStore((s) => s.initializing);

//   if (initializing) return <LoadingScreen />;

//   return (
//     <>
//       <ScrollToTop />
//       <Header />

//       <main className="min-h-screen bg-gray-50 pt-4">
//         <Routes>
//           <Route path="/" element={<Home />} />

//           <Route
//             path="/category/:categorySlug"
//             element={<CategoryProducts />}
//           />
//           <Route
//             path="/category/:categorySlug/sub/:subSlug"
//             element={<CategoryProducts />}
//           />
//           <Route
//             path="/category/:categorySlug/product/:productSlug"
//             element={<ProductDetails />}
//           />

//           <Route path="/search" element={<SearchResults />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/login-otp" element={<LoginWithOTP />} />
//           <Route path="/signup" element={<SignUp />} />

//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/orders"
//             element={
//               <ProtectedRoute>
//                 <OrdersPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/wishlist"
//             element={
//               <ProtectedRoute>
//                 <WishlistPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/cart"
//             element={
//               <ProtectedRoute>
//                 <CartPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/addresses"
//             element={
//               <ProtectedRoute>
//                 <AddressesPage />
//               </ProtectedRoute>
//             }
//           />

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

//           <Route path="/order-success" element={<OrderSuccess />} />

//           <Route path="/about-us" element={<About />} />
//           <Route path="/contact-us" element={<Contact />} />
//           <Route path="/terms-condition" element={<Terms />} />
//           <Route path="/privacy-policy" element={<Privacy />} />
//           <Route path="/shipping-policy" element={<Shipping />} />
//           <Route path="/cancellations-refunds" element={<Refund />} />

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>

//       <Footer />
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AuthInitializer />
//       <AppContent />
//     </Router>
//   );
// }
