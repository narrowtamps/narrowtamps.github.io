// 1. Create a style element to hold your global CSS
const style = document.createElement('style');
style.textContent = `
    @import url(\'https://fonts.googleapis.com\');
    @import url(\'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Sixtyfour+Convergence&family=Tilt+Neon&display=swap');

@font-palette-values --vapor {
  font-family: "Sixtyfour Convergence", sans-serif;
  override-colors:
    0 #27F5D3,
    1 #BE27F5,
    2 #F5A927;
   
}
.vapor {
  font-palette: --vapor;
}

    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-height: 100dvh; 
        margin: 0;
    }

    
.sixtyfour-convergence-vapor {
  font-family: "Sixtyfour Convergence", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-palette: --vapor;
  font-variation-settings:
    "BLED" 75,
    "SCAN" 50,
    "XELA" 75,
    "YELA" 75;
}

    #footer-placeholder {
        margin-top: auto; /* This pushes footer to bottom */
        width: 100%;
    }

    .site-footer {
        text-align: center;
        padding: 20px 0; /* Use a smaller, uniform padding */
    }

    .site-footer p {
        margin: 0;
        font-size: 0.9rem;
        color: cyan; 
         font-palette: --vapor;
        font-variation-settings:
            "BLED" 75,
            "SCAN" 50,
            "XELA" 75,
            "YELA" 75;
        position: absolute; 
        bottom:0; 
        width: 100%; 
        z-index: 9999; 
        animation: flicker2 .15s infinite;
    }
    /* Glowing text effect */
.crt .terminal-content {
    text-shadow: 0 0 5px #00ff00, 0 0 2px #00ff00, 0 0 1px #00ff00; /* Subtle glow */
}

/* Scan lines effect using ::before pseudo-element */
.crt::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(to bottom, rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
    background-size: 100% 2px; /* Controls the height of the scan lines */
    z-index: 2;
    pointer-events: none; /* Allows interaction with content underneath */
}

/* Flicker effect using ::after pseudo-element and animation */
.crt::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    animation: flicker 0.15s infinite; /* Rapid, infinite flicker animation */
}

/* Keyframes for the random flicker animation */
@keyframes flicker {
    0%, 100% { opacity: 1; }
    5% { opacity: 0.8; }
    10% { opacity: 1; }
    15% { opacity: 0.95; }
    20% { opacity: 1; }
    25% { opacity: 0.9; }
    30% { opacity: 1; }
    35% { opacity: 0.97; }
    40% { opacity: 1; }
    45% { opacity: 0.9; }
    50% { opacity: 1; }
    55% { opacity: 0.85; }
    60% { opacity: 1; }
    65% { opacity: 0.92; }
    70% { opacity: 1; }
    75% { opacity: 0.98; }
    80% { opacity: 1; }
    85% { opacity: 0.87; }
    90% { opacity: 1; }
    95% { opacity: 0.93; }
}
        @keyframes flicker2 {
    0%, 100% { opacity: 1; }
    5% { opacity: 0.99; }
    10% { opacity: 1; }
    15% { opacity: 0.98; }
    20% { opacity: 99; }
    25% { opacity: 1; }
    30% { opacity: 1; }
    35% { opacity: 0.97; }
    40% { opacity: 0.98; }
    45% { opacity: 0.95; }
    50% { opacity: 0.98; }
    55% { opacity: 0.97; }
    60% { opacity: .8; }
    65% { opacity: 0.99; }
    70% { opacity: 1; }
    75% { opacity: 1; }
    80% { opacity: .97; }
    85% { opacity: 1; }
    90% { opacity: 1; }
    95% { opacity: 0.99; }
}


    .footer-links {
        display: flex;
        justify-content: center;
         
         
    }

    .footer-links a {
        display: inline-block !important;
        text-decoration: none;
        padding: 5px 10px;
        font-size: .9rem;
        color: cyan; /* Bright green text */
        font-family: "Courier New", monospace; /* Classic monospace font */
        font-palette: --vapor;
      font-variation-settings:
        "BLED" 75,
        "SCAN" 50,
        "XELA" 75,
        "YELA" 75;
    
   
}


`;

document.head.appendChild(style);

document.getElementById('footer-placeholder').innerHTML = `
<footer class="site-footer">
    
    <div class="footer-links">
        <a href="https://www.narrowtamps.com/index.html">Home</a>
        <a href="https://www.narrowtamps.com/pages/campaigns.html">Campaigns</a>
        <a href="https://www.narrowtamps.com/pages/socials.html">Socials</a>
            <a href="https://www.narrowtamps.com/about.html">About</a>
            <a href="https://www.narrowtamps.com/fish.html">Fish</a>
    </div>
    <p>&copy; 2026 The Narrow Tamps. All rights reserved.</p>
    
</footer>`;

