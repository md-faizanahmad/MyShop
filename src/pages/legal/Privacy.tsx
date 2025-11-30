import LegalLayout from "./LegalLayout";
import privacyData from "../../data/privacy.json";

export default function Privacy() {
  return (
    <LegalLayout title={privacyData.title}>
      <p className="text-gray-700 leading-relaxed">{privacyData.intro}</p>

      {privacyData.sections.map((section, index) => (
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
