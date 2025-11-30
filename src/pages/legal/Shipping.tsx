import LegalLayout from "./LegalLayout";
import shippingData from "../../data/shipping.json";

export default function Shipping() {
  return (
    <LegalLayout title={shippingData.title}>
      <p className="text-gray-700 leading-relaxed">{shippingData.intro}</p>

      {shippingData.sections.map((section, index) => (
        <div key={index} className="mt-3">
          <h2 className="text-lg font-semibold text-gray-900">
            {section.heading}
          </h2>

          {section.content.map((line, i) => (
            <p key={i} className="text-gray-700 mt-2 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      ))}
    </LegalLayout>
  );
}
