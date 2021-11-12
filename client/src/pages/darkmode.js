import React from 'react'
import { useState } from 'react';
export default function DarkMode() {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode(darkMode ? false : true);

    return (
        <div style={{ marginTop: "10px" }}>
            <div data-theme={darkMode ? "dark" : "light"} >
                <label class="theme-switch" for="checkbox">
                    <input type="checkbox" id="checkbox" onChange={toggleDarkMode} />
                    <div class="slider round"></div>
                </label>

            </div>
        </div>
    )
}
