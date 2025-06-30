'use client'
import UserContext from "../../context/user";
import { useContext } from "react";


export default function AboutMe() {
    const { pages } = useContext(UserContext);
    console.log("About Me Page Loaded", pages);
    return (
        <main>
            <h1>About Me</h1>
            <p>This is the About Me page. Here you can find information about my background, skills, and experiences.</p>
        </main>
    );
}