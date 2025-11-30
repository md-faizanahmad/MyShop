import LegalLayout from "./LegalLayout";
import termsData from "../../data/terms.json";

export default function Terms() {
  return (
    <LegalLayout title={termsData.title}>
      {termsData.sections.map((section, index) => (
        <div key={index} className="mt-3">
          <h2 className="text-lg font-semibold text-gray-900">
            {section.heading}
          </h2>
          {section.content.map((paragraph, i) => (
            <p key={i} className="text-gray-700 mt-2 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </LegalLayout>
  );
}
