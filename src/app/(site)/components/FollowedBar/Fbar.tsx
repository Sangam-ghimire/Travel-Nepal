"use client"
import followStyle from "./fbar.module.css";
import Flocation from "../FollowedLocation/Flocation";
import {ImLocation2} from "react-icons/im";
import { Location } from "../../layout";

//this is the component for the followed bar
export default function Fbar({ locations }: { locations: Array<Location> }) {
    return(
        <div className={followStyle.followbar}>
            <h2>Followed Locations <ImLocation2 className={followStyle.locicon}/></h2>
            <div className={followStyle.followLocation}>
            {
                //here we are mapping the locations and displaying them
                locations.map((location) => (
                    <Flocation
                        key={ location._id }
                        id={ location._id }
                        address={ location.address }
                    />
                ))
            }
            </div>
        </div>
    );
}