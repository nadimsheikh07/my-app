import { useAbout } from "../context/AboutContext"

export default function AboutText2() {
    const { about } = useAbout();

    return (
        <div>
            <p>{about}</p>
        </div>
    )
}