import aboutData from "../data/about.json";
import LegalLayout from "./legal/LegalLayout";

export default function About() {
  return (
    <LegalLayout title={aboutData.title}>
      {/* Intro paragraphs */}
      {aboutData.intro.map((paragraph, index) => (
        <p key={index} className="text-gray-700 leading-relaxed mt-2">
          {paragraph}
        </p>
      ))}

      {/* Sections */}
      {aboutData.sections.map((section, index) => (
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
