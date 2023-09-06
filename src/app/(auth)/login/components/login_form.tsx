"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; //importing google icon from react-icons
import { useRouter } from "next/navigation"; //importing useRouter from next/navigation, used to navigate between pages
import { signIn } from "next-auth/react"; //importing signIn from next-auth/react,used to sign in
import Link from "next/link"; //importing Link from next/link,used to link pages
import loginStyles from "../page.module.css"; //importing loginStyles from page.module.css,used to style the page
import Image from "next/image"; //importing Image from next/image,used to add images
import { useForm, SubmitHandler } from "react-hook-form"; //importing useForm and SubmitHandler from react-hook-form,used to handle form
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"; //importing AppRouterInstance from next/dist/shared/lib/app-router-context,used to handle router
import { zodResolver } from "@hookform/resolvers/zod"; //importing zodResolver from @hookform/resolvers/zod,used to validate form
import * as z from "zod"; //importing as z from zod,used to validate form

//here we are defining loginSchema
const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must atleast 8 characters long" }),
});

//here we are defining FormData
type FormData = z.infer<typeof loginSchema>;

//here we are defining STATUS_INCORRECT_LOGIN_CREDENTIALS
const STATUS_INCORRECT_LOGIN_CREDENTIALS = 401;

//here we are defining Login Component
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });
  //here we are defining router
  const router: AppRouterInstance = useRouter();
  //here we are defining showPassword and setShowPassword using useState
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //here we are defining handleSigninGoogle
  const handleSigninGoog = async () => {
    const googres = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });
    console.log(googres);
  };

  //here we are defining onLogIn for handling login
  const onLogIn: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("signing in", data);
      // const res = await signIn('credentials', { email, password, redirect: true, callbackUrl: '/feeds' })
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });

      console.log("response received");

      /* if error occured */
      if (res?.error) {
        /* if the status code matches with the incorrect login credentials status */
        if (res.status === STATUS_INCORRECT_LOGIN_CREDENTIALS) {
          console.log("The email or the password is incorrect.");
          setError("root", {
            type: "custom",
            message: "The email or the password is incorrect.",
          });
          return;
        }
        throw res.error;
      }

      console.log("log in successfull");
      router.push(res?.url as string);
      return;
    } catch (error) {
      setError("root", {
        type: "custom",
        message: "Error occured. Please try again later.",
      });
      console.log(error || "error unknown");
    }
  };
//here we are returning the login page, which contains login form
  return (
    <div className={loginStyles.wrapper}>
      <div className={loginStyles.imgBox}>
        <Image loading="lazy" src="/ncpr.jpg" alt="backgroundImage" fill />
      </div>

      <div className={loginStyles.loginBox}>
        <div className={loginStyles.formBox}>
          <h2>Login</h2>

          <form onSubmit={handleSubmit(onLogIn)}>
            {errors && (
              <h3 className={loginStyles.incorrectAlert}>
                {errors.email?.message ||
                  errors.password?.message ||
                  errors.root?.message}
              </h3>
            )}
            <input
              placeholder="Email Address"
              className={loginStyles.inputBx}
              type="text"
              {...register("email", { required: true })}
            />

            <br />

            <input
              placeholder="Password"
              className={loginStyles.inputBx}
              type={showPassword ? "text" : "password"}
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password must contain atleast 8 characters.",
                },
              })}
            />

            <br />
            <div className={loginStyles.chkCtn}>
              <div className={loginStyles.showCtn}>
                <input
                  type="checkbox"
                  id="show_password"
                  className={loginStyles.check}
                  onChange={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
                <label htmlFor="show_password">Show Password</label>
              </div>

              <div className={loginStyles.remCtn}>
                <Link className={loginStyles.forget} href="/reset-password">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <br />

            <button className={loginStyles.Sbtn}>Sign In</button>

            <br />
            <div className={loginStyles.dText}>
              <>Don&apos;t have an account?&nbsp; </>
              <Link href="/sign_up"> Sign Up</Link>
            </div>

            <div className={loginStyles.AbtnCtn}>
              <button
                type="button"
                className={loginStyles.Abtn}
                onClick={handleSigninGoog}
              >
                Continue with google &nbsp;{" "}
                <FcGoogle className={loginStyles.icon} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
