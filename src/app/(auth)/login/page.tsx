import loginStyles from "./page.module.css"; //importing loginStyles from page.module.css,used to style the page
import { Metadata } from "next"; //importing metadata from next,used to add metadata to the page
import Login from "./components/login_form"; //importing Login from components/login_form,used to add login form to the page

//here we are defining metadata for the page
export const metadata: Metadata = {
  title: 'Login | TrekDiaries',
  description: 'Login page of TrekDiaries',
}

//here we are defining Page Component
export default function Page() {
  return (
    <div className={loginStyles.app}>
      <Login />
    </div>
  );
}