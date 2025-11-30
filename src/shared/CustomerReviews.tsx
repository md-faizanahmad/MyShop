import { Star } from "lucide-react";
import type { FC } from "react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    comment:
      "Amazing quality! Got my order in just 2 days. The fabric is so soft!",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "2",
    name: "Rahul Verma",
    rating: 5,
    comment: "Best online shopping experience in India. Prices are unbeatable!",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "3",
    name: "Ananya Singh",
    rating: 5,
    comment:
      "Loved the collection! Will definitely order again. Customer support was super helpful.",
    date: "3 days ago",
    verified: true,
  },
];

const CustomerReviews: FC = () => {
  return (
    <section className="py-16 bg-linear-to-b from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join 1.2M+ happy shoppers across India
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-7 h-7 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-2xl font-bold ml-2">4.9/5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  {review.verified && (
                    <span className="text-xs text-green-600 font-medium">
                      Verified Buyer
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 italic leading-relaxed">
                "{review.comment}"
              </p>
              <p className="text-sm text-gray-500 mt-4">{review.date}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition">
            Read All 50,000+ Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
