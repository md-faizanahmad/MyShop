import { Link } from "react-router-dom";
// import facebookImg from "../assets/facebook.svg";
import { ChartAreaIcon, Facebook, Instagram, Twitter } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* BRAND */}
        <div>
          <h3 className="text-xl font-bold text-white">MyAZStore</h3>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            Your trusted online marketplace. Quality products, fast delivery,
            and a smooth shopping experience.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="hover:text-white transition text-gray-400">
              <Facebook size={20} className="text-blue-400" />
              {/* <img src={facebookImg} /> */}
            </a>
            <a href="#" className="hover:text-white transition text-gray-400">
              <Instagram size={20} className="text-pink-300" />
            </a>
            <a href="#" className="hover:text-white transition text-gray-400">
              <Twitter size={20} className="text-blue-400" />
            </a>
            <a href="#" className="hover:text-white transition text-gray-400">
              <ChartAreaIcon size={20} className="text-green-600" />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-white transition text-gray-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="hover:text-white transition text-gray-400"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="hover:text-white transition text-gray-400"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Our Policies
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-white transition text-gray-400"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-condition"
                className="hover:text-white transition text-gray-400"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/shipping-policy"
                className="hover:text-white transition text-gray-400"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                to="/cancellations-refunds"
                className="hover:text-white transition text-gray-400"
              >
                Cancellation & Refund
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://mdfaizanahmad.vercel.app"
          target="_blank"
          className="text-white font-medium hover:underline"
        >
          mdfaizanahmad
        </a>{" "}
        — All rights reserved.
      </div>
    </footer>
  );
}
