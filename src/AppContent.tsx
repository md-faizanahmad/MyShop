// import { type JSX } from "react";
// import { Routes, Route, Outlet } from "react-router-dom";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Login from "./components/auth/Login";
// import SignUp from "./components/auth/SignUp";
// import CategoryProducts from "./pages/CategoryProducts";
// import ProductDetails from "./pages/products/ProductDetails";
// import CartPage from "./pages/cart/CartPage";
// import LoadingScreen from "./components/LoadingScreen";
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
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import LoginWithOTP from "./components/auth/LoginWithOTP";
// import ScrollToTop from "./helper/ScrollToTop";
// import { useAuthStore } from "./store/useAuthStore";
// import { useAuthCheck } from "./hooks/useAuthCheck";

// /**
//  * AppContent: the route tree and layout.
//  * - Uses useAuthCheck() to ensure restoreSession runs.
//  * - Reads auth state from useAuthStore.
//  */
// export default function AppContent(): JSX.Element {
//   // ensure session restore is triggered
//   useAuthCheck();

//   const user = useAuthStore((s) => s.user);
//   const restoring = useAuthStore((s) => s.restoring);
//   const authLoading = restoring; // keep previous naming

//   if (authLoading) return <LoadingScreen />;

//   // build a minimal "safeUser" for compatibility with components expecting isLoggedIn
//   const safeUser = user
//     ? { isLoggedIn: true, name: user.name }
//     : { isLoggedIn: false };
//   // If some components read useAuth() or expect a global "safeUser" prop,
//   // prefer to update those components to use useAuthStore directly.
//   console.info(safeUser);
//   return (
//     <>
//       <ScrollToTop />
//       <Header />
//       <Outlet />
//       <main className="min-h-screen bg-gray-50">
//         <div className="pt-3 md:pt-2">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/category/:categorySlug"
//               element={<CategoryProducts />}
//             />
//             <Route
//               path="/category/:categorySlug/sub/:subSlug"
//               element={<CategoryProducts />}
//             />
//             <Route
//               path="/category/:categorySlug/product/:productSlug"
//               element={<ProductDetails />}
//             />
//             <Route path="/search" element={<SearchResults />} />
//             <Route path="/order-success" element={<OrderSuccess />} />

//             <Route path="/login" element={<Login />} />
//             <Route path="/login-otp" element={<LoginWithOTP />} />
//             <Route path="/signup" element={<SignUp />} />

//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <ProfilePage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/orders"
//               element={
//                 <ProtectedRoute>
//                   <OrdersPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/wishlist"
//               element={
//                 <ProtectedRoute>
//                   <WishlistPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/cart"
//               element={
//                 <ProtectedRoute>
//                   <CartPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/addresses"
//               element={
//                 <ProtectedRoute>
//                   <AddressesPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/checkout"
//               element={
//                 <ProtectedRoute>
//                   <Checkout />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/order/:orderId"
//               element={
//                 <ProtectedRoute>
//                   <OrderDetails />
//                 </ProtectedRoute>
//               }
//             />

//             <Route path="/about-us" element={<About />} />
//             <Route path="/contact-us" element={<Contact />} />
//             <Route path="/terms-condition" element={<Terms />} />
//             <Route path="/privacy-policy" element={<Privacy />} />
//             <Route path="/shipping-policy" element={<Shipping />} />
//             <Route path="/cancellations-refunds" element={<Refund />} />

//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }
