import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Lore from "./pages/Lore";
import Terminal from "./pages/Terminal";

function App() {
    // Accessibility states
    const [brightness, setBrightness] = useState(() => 
        parseInt(localStorage.getItem("global_brightness") || "100")
    );
    const [fontSize, setFontSize] = useState(() => 
        parseInt(localStorage.getItem("global_font_size") || "16")
    );
    const [panelOpen, setPanelOpen] = useState(false);

    // Apply brightness to the document root
    useEffect(() => {
        document.documentElement.style.filter = `brightness(${brightness}%)`;
        localStorage.setItem("global_brightness", brightness.toString());
    }, [brightness]);

    // Apply font size to the document root
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`;
        localStorage.setItem("global_font_size", fontSize.toString());
    }, [fontSize]);

    const handleReset = () => {
        setBrightness(100);
        setFontSize(16);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/lore/:id" element={<Lore />} />
                <Route path="/terminal" element={<Terminal />} />
            </Routes>

            {/* Accessibility floating trigger button */}
            <button 
                className="accessibility-btn" 
                onClick={() => setPanelOpen(!panelOpen)}
                title="Ajustes de Accesibilidad"
            >
                ♿
            </button>

            {/* Accessibility adjusting panel */}
            {panelOpen && (
                <div className="accessibility-panel">
                    <div className="acc-title">
                        <span>⚙ ACCESIBILIDAD</span>
                    </div>

                    {/* Brightness Section */}
                    <div className="acc-group">
                        <div className="acc-label-row">
                            <span>Brillo del Portal</span>
                            <span className="acc-val-display">{brightness}%</span>
                        </div>
                        <div className="acc-slider-row">
                            <button 
                                className="acc-btn-adjust" 
                                onClick={() => setBrightness(prev => Math.max(50, prev - 10))}
                            >
                                -
                            </button>
                            <input 
                                type="range" 
                                min="50" 
                                max="150" 
                                value={brightness} 
                                onChange={(e) => setBrightness(parseInt(e.target.value))} 
                                className="acc-slider"
                            />
                            <button 
                                className="acc-btn-adjust" 
                                onClick={() => setBrightness(prev => Math.min(150, prev + 10))}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Font Size Section */}
                    <div className="acc-group">
                        <div className="acc-label-row">
                            <span>Tamaño de Letra</span>
                            <span className="acc-val-display">{fontSize}px</span>
                        </div>
                        <div className="acc-slider-row">
                            <button 
                                className="acc-btn-adjust" 
                                onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
                            >
                                -
                            </button>
                            <input 
                                type="range" 
                                min="12" 
                                max="24" 
                                value={fontSize} 
                                onChange={(e) => setFontSize(parseInt(e.target.value))} 
                                className="acc-slider"
                            />
                            <button 
                                className="acc-btn-adjust" 
                                onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button className="acc-reset-btn" onClick={handleReset}>
                        Restablecer Valores
                    </button>
                </div>
            )}
        </BrowserRouter>
    );
}

export default App;