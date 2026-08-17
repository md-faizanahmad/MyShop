// // components/order/OrderBreadcrumb.tsx
// import { Link } from "react-router-dom";

// interface Props {
//   orderId: string;
//   createdAt: string;
// }

// export default function OrderBreadcrumb({ orderId, createdAt }: Props) {
//   return (
//     <div className="w-full border-b border-gray-200 bg-white">
//       <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-xs sm:text-sm">
//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-1 text-gray-600">
//           <Link to="/" className="hover:text-blue-600">
//             Home
//           </Link>
//           <span>/</span>

//           <Link to="/profile" className="hover:text-blue-600">
//             My Profile
//           </Link>
//           <span>/</span>

//           <Link to="/orders" className="hover:text-blue-600">
//             My Orders
//           </Link>
//           <span>/</span>

//           <span className="font-bold text-gray-900 truncate">{orderId}</span>
//         </nav>

//         {/* Separator */}
//         <span className="hidden sm:inline text-gray-400 px-2">—</span>

//         {/* Date & Time */}
//         <span className="text-gray-500 whitespace-nowrap">
//           {new Date(createdAt).toLocaleDateString("en-IN", {
//             day: "numeric",
//             month: "short",
//             year: "numeric",
//             hour: "numeric",
//             minute: "2-digit",
//           })}
//         </span>
//       </div>
//     </div>
//   );
// }

//////////////////////17-08
// components/order/OrderBreadcrumb.tsx
import { Link } from "react-router-dom";

interface Props {
  orderId: string;
  createdAt: string;
}

export default function OrderBreadcrumb({ orderId, createdAt }: Props) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = new Date(createdAt).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-5 lg:px-6">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <nav aria-label="Breadcrumb" className="min-w-0 overflow-hidden">
            <ol className="flex min-w-0 items-center gap-1.5 text-xs sm:text-sm">
              <li className="shrink-0">
                <Link
                  to="/"
                  className="text-slate-500 transition-colors hover:text-sky-600"
                >
                  Home
                </Link>
              </li>

              <li aria-hidden="true" className="text-slate-300">
                /
              </li>

              <li className="shrink-0">
                <Link
                  to="/orders"
                  className="text-slate-500 transition-colors hover:text-sky-600"
                >
                  My Orders
                </Link>
              </li>

              <li aria-hidden="true" className="text-slate-300">
                /
              </li>

              <li
                aria-current="page"
                className="min-w-0 truncate font-medium text-slate-900"
                title={orderId}
              >
                Order #{orderId}
              </li>
            </ol>
          </nav>

          <time
            dateTime={createdAt}
            className="shrink-0 text-xs text-slate-500 sm:text-sm"
          >
            {formattedDate} · {formattedTime}
          </time>
        </div>
      </div>
    </header>
  );
}
