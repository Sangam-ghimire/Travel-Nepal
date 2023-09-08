"use client"
import verifystyles from "./page.module.css"
import Image from "next/image";
import axios from "axios";
import { GoVerified } from "react-icons/go"
import { useRouter, usePathname } from "next/navigation"

//this is the page where the user is redirected after clicking the link in the email
export default function UserVerifyPage() {
    return (
        <div>
        <VerifyMail/>
        </div>
    )
}

//here we are verifying the user and sending the user to the login page
function VerifyMail() {
    const router: any = useRouter();
    const pathname: any = usePathname();
    let split_id = pathname.split('/');
    const required_id: any = split_id[2];
    //here we are sending the id to the backend to verify the user
    const handleClick = async (e: React.MouseEvent) =>{
        e.preventDefault();
        console.log("count")
        try {
            const { data } = await axios.post('/api/verify_email',{ required_id })
            console.log(data)
            if(data)
            {
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    //here we are rendering the verify page
    return(
        <div className={verifystyles.wrapper}>
            <Image className={verifystyles.img} src="/ncpr.jpg" alt="backgroundImage" fill  />
        <form className={verifystyles.verifiedBox}>
        //here we are displaying the verify page
        <GoVerified className={verifystyles.icon}/>
            <h1>Verify Your Email Address !!</h1>
            <h2>Thank you for signing up with Trek Diaries!</h2>
            <p>As an extra security precaution, please verify your email address to continue signing up</p>
            <button className={verifystyles.buttonVerify} onClick = {(e)=>{handleClick(e)}}> Verify and Continue </button>
        </form>
        </div>
    )
}

