import React from "react";
import TopBar from './containers/TopBar';
import Projects from './containers/Projects'
import "./App.css";

function App() {
    return (
        <div>
            <div className="top-bar">
                <TopBar />
            </div>
            <div className="projects-main">
                <Projects />
            </div>
        </div>
    );
}

export default App;
