import { useAbout } from "../context/AboutContext";
import AboutText2 from "./AboutText2";

export default function AboutText() {
    const { about, name } = useAbout();

    return (
        <div>
            <p>{about} {name}</p>

            <AboutText2 />
        </div>
    )
}