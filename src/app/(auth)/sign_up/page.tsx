import SignUpForm from "./components/SignUpForm"
import signupStyles from "./page.module.css";
import type { Metadata } from "next";

//metadata for the page for SEO
export const metadata:Metadata = {
  title: "Sign Up | TrekDiaries",
  description: "Sign up page of TrekDiaries"
}

//here the function is exported and this is used to display the sign up page
export default function Page() {
  return (
    <div className={signupStyles.app}>
      <SignUpForm />
    </div>
  );
}