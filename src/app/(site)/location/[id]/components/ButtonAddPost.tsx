"use client"
import { useRouter } from "next/navigation";
import locateStyle from "../page.module.css"

//this is the component for the add post button
export default function ButtonAddPost({ locationID }: { locationID: string }) {
    const router = useRouter();

    /* HandleADDPOST redirects to the addpost page */
    const handleADDPOST = () => {
        router.push(`/location/${ locationID }/addpost`);
    };

    return(
        <button onClick={handleADDPOST} className={locateStyle.addpstbtn}>
          + ADD POST
        </button>
    )
}