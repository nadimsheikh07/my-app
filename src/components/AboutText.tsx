import { useAbout } from "../context/AboutContext";
import AboutText2 from "./AboutText2";

export default function AboutText() {
    const { about } = useAbout();

    return (
        <div>
            <p>{about}</p>

            <AboutText2 />
        </div>
    )
}