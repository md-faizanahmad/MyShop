// src/components/shared/PincodeChecker.tsx

import { useState } from "react";
import axios from "axios";
import PincodeInput from "./PincodeInput";
import PincodeResult from "./PincodeResult";

export default function PincodeChecker() {
  // you can use productId if needed
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    block: string;
    district: string;
    state: string;
    eta: string;
  } | null>(null);
  const [error, setError] = useState("");

  const check = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const { data } = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      const po = data[0];

      if (po.Status === "Success" && po.PostOffice?.length > 0) {
        const office =
          po.PostOffice.find((o: any) => o.Block && o.Block !== "NA") ||
          po.PostOffice[0];

        const block =
          office.Block === "NA" ? office.Name.split(" (")[0] : office.Block;
        const district = office.District.replace(/\([^)]*\)/g, "").trim();

        setResult({
          block,
          district,
          state: office.State,
          eta: getETA(office.State),
        });
      } else {
        setError("Service not available");
      }
    } catch {
      setError("Try again");
    } finally {
      setLoading(false);
    }
  };

  const getETA = (state: string): string => {
    if (["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu"].includes(state))
      return "2–4 days";
    if (["Bihar", "UP", "MP", "Rajasthan"].includes(state)) return "4–7 days";
    return "5–8 days";
  };

  return (
    <div>
      <p className="text-gray-600 mb-2">Check delivery availability</p>
      <PincodeInput
        value={pincode}
        onChange={setPincode}
        loading={loading}
        onCheck={check}
      />
      <PincodeResult result={result} error={error} />
    </div>
  );
}
