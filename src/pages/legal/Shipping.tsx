import LegalLayout from "./LegalLayout";
import shippingData from "@/data/shipping.json";

export default function Shipping() {
  return (
    <LegalLayout title={shippingData.title}>
      <div className="mx-auto max-w-4xl  sm:px-6">
        {/* Intro Section */}
        {shippingData.intro && (
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            {shippingData.intro}
          </p>
        )}

        {/* Dynamic Policy Sections */}
        <div className="mt-10 space-y-10">
          {shippingData.sections.map((section, index) => (
            <section key={index} className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {section.heading}
              </h2>

              <div className="space-y-3">
                {section.content.map((line, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-slate-600 sm:text-base"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </LegalLayout>
  );
}
