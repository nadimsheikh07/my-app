import { useAbout } from "../context/AboutContext"

export default function AboutText2() {
    const { about, name, SetName } = useAbout();

    return (
        <div>
            <p>{about} {name}</p>
            <input onChange={(e) => SetName(e.target.value)} value={name} />
        </div>
    )
}