import { Star } from "lucide-react";
import type { FC } from "react";

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  city: string;
  verified?: boolean;
}

const staticReviews: Review[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    rating: 5,
    comment:
      "Got my order from Delhi in just 2 days. Quality is exactly as shown, very happy with the fit.",
    date: "2 days ago",
    city: "Delhi",
    verified: true,
  },
  {
    id: "2",
    name: "Aisha Khan",
    rating: 4,
    comment:
      "Ordered sneakers to Mumbai. Packing was solid and size was perfect. Will try more categories.",
    date: "5 days ago",
    city: "Mumbai",
    verified: true,
  },
  {
    id: "3",
    name: "Simran Kaur",
    rating: 5,
    comment:
      "Loved the kurtis collection. Smooth checkout and quick COD delivery in Bangalore.",
    date: "1 week ago",
    city: "Bangalore",
    verified: true,
  },
  {
    id: "4",
    name: "Mohammed Imran",
    rating: 5,
    comment:
      "Bought electronics from Hyderabad. Prices are fair and support team actually responds fast.",
    date: "1 week ago",
    city: "Hyderabad",
    verified: true,
  },
  {
    id: "5",
    name: "David D’Souza",
    rating: 4,
    comment:
      "Good experience ordering from Chennai. One item was slightly delayed but overall service is solid.",
    date: "2 weeks ago",
    city: "Chennai",
    verified: true,
  },
  {
    id: "6",
    name: "Anjali Sen",
    rating: 5,
    comment:
      "Skincare products reached Kolkata without any damage. Genuine products and nice offers.",
    date: "3 weeks ago",
    city: "Kolkata",
    verified: true,
  },
];

interface CustomerReviewsProps {
  // later you can pass dynamic data here; for now we fall back to static
  reviews?: Review[];
}

const CustomerReviews: FC<CustomerReviewsProps> = ({
  reviews = staticReviews,
}) => {
  const avgRating = 4.8;
  const totalReviewsLabel = "10,000+ reviews"; // static marketing line for now

  return (
    <section className="py-12 bg-linear-to-b from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            What Customers Say
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Trusted by shoppers across Delhi, Mumbai, Kolkata, Hyderabad,
            Chennai & Bangalore
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-base md:text-lg font-semibold ml-1">
              {avgRating.toFixed(1)}/5
            </span>
            <span className="text-xs md:text-sm text-gray-500">
              · {totalReviewsLabel}
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-white rounded-2xl shadow-sm p-5 border border-purple-100 hover:shadow-md hover:-translate-y-1 transition"
            >
              {/* User header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-11 md:h-11 bg-linear-to-br from-blue-300 to-sky-300 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-gray-900">
                    {review.name}
                  </h4>
                  <p className="text-[11px] md:text-xs text-gray-500">
                    {review.city} • {review.date}
                  </p>
                  {review.verified && (
                    <span className="mt-0.5 inline-block text-[10px] md:text-[11px] text-green-600 font-medium">
                      Verified Buyer
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-gray-700 leading-relaxed">
                “{review.comment}”
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-sky-600 text-white px-6 py-2.5 text-sm font-semibold hover:shadow-lg hover:scale-[1.02] transition"
          >
            Read More Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
