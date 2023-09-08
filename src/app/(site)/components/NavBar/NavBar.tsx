"use client";
import React, { useEffect, useState } from "react";
import navStyles from "./navbar.module.css";
import SearchInput from "../SearchInput/SearchInput";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaHiking } from "react-icons/fa";
import ProfilePicture from "./components/profilePicture";
import { useSession } from "next-auth/react";

//this is the navbar component
export default function NavBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() { //if the user is not authenticated then we are redirecting the user to the login page
      router.push("/login");
    },
  });
  const [name, setName] = useState("");

  //here we are setting the name of the user
  useEffect(() => {
    if (session.status === "authenticated") {
      setName((session.data?.user?.name as string).slice(0, 1).toUpperCase());
    }
  }, [session]);

  //here we are handling the sign out process
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/login" });
    router.push(data.url);
  };

  //here we are rendering the navbar
  return (
    <div className={navStyles.wrapper}>
      <div className={navStyles.Bar}>
        <div className={navStyles.BarLeft}>
          <h1
            onClick={() => {
              router.push("/");
            }}
            className={navStyles.logo}
          >
            <FaHiking className={navStyles.icon} />D
          </h1>
        </div>
        <div className={navStyles.BarCenter}>
          <SearchInput />
        </div>
        {/* <div className={navStyles.dp} ref={dropRef}> */}
        <div className={navStyles.dp} onClick={() => setOpen((open) => !open)}>
          <ProfilePicture userFirst={name} />
        </div>
        {open && (
          <div className={navStyles.drop}>
            <ul>
              <li className={navStyles.dropdownItem}>
                <CgProfile />
                <>{(session.data?.user?.name as string)}</>
              </li>
              <li className={navStyles.dropdownItem} onClick={handleSignOut}>
                <FiLogOut />
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
