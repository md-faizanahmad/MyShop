////////////////////// Refactor with design

import { useSignup } from "../../hooks/useSignup";
import SignupForm from "./SignupForm";

export default function SignUp() {
  const signup = useSignup();

  return <SignupForm {...signup} />;
}
