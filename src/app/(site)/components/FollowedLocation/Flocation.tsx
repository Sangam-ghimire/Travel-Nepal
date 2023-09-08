'use client';

import { useRouter } from "next/navigation";
import locateStyle from "./flocation.module.css";
import {GrMapLocation} from "react-icons/gr"

//this is the component for the followed location
export default function Flocation({ id, address }: { id: string, address: string }) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/location/${ id }`)
    } 

    //here we are rendering the followed location
    return(
        <div className={locateStyle.followloc} onClick={ handleClick }>

           <GrMapLocation /> { address }
        </div>
    );
}