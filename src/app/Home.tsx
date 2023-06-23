import { Background, Parallax } from "react-parallax";

export default function Home() {
  return (
    <div className="App">
        <Parallax strength={300} style={{ height: "100vh" }}>
            <Background>
                <div id="landing">
                    <div>
                        <img 
                        alt="Demo of a rider and driver app"
                        src={`${window.location.origin}/landing.png`} />
                        <div id="text">
                            <h1>Coming January 2024...</h1>
                            <a href="https://forms.gle/FpnCU8gzT6UgDnJa6">Join Waitlist</a>
                        </div>
                    </div>
                </div>
            </Background>
        </Parallax>
        <div style={{ padding: "1em" }}>
            <div className="content">
                <div>
                    <span>Copyright © 2023 Elytra LLC. All rights reserved.</span>
                    <a href="support">Support</a>
                </div>
            </div>
        </div>
    </div>
  );

}

