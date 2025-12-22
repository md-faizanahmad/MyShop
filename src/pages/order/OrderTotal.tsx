// components/order/OrderTotal.tsx

interface Props {
  itemsTotal: number; // MRP / original total
  totalAmount: number; // Final paid amount
}

export default function OrderTotal({ itemsTotal, totalAmount }: Props) {
  const discount = Math.max(itemsTotal - totalAmount, 0);

  return (
    <div className="w-full bg-white border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm sm:text-base font-medium text-gray-900">
          Price Details
        </h3>
      </div>

      {/* Price rows */}
      <div className="px-4 py-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Items Total</span>
          <span>₹{itemsTotal.toLocaleString("en-IN")}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount.toLocaleString("en-IN")}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span>Delivery Charges</span>
          <span className="text-green-600">FREE</span>
        </div>

        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-medium text-gray-900">
          <span>Total Amount Paid</span>
          <span>₹{totalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}
