"use client";

import Nav from "./Components/nav";
import { useState, useEffect} from "react";

export default function Home() {
  let [season, setSeason] = useState("Spring");
  let [photoSol, setPhotoSol] = useState(0);

  let [seconds, setSeconds] = useState(new Date().getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(new Date().getSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds >= 0 && seconds < 15) {
      setSeason("Spring");
    } else if (seconds >= 15 && seconds < 30) {
      setSeason("Summer");
    } else if (seconds >= 30 && seconds < 45) {
      setSeason("Fall");
    } else {
      setSeason("Winter");
    }
    setPhotoSol((prevPhotoSol) => prevPhotoSol + 1);
  }, [seconds]);

  return (
    <main>
      <div id="root">
        <Nav season={season} photoSol={photoSol}/>
      </div>
    </main>
  );
}
