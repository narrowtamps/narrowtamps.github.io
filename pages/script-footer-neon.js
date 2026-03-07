// 1. Create a style element to hold your global CSS
const style = document.createElement('style');






style.textContent = `
   
    @import url(\'https://fonts.googleapis.com/css2?family=Audiowide&family=Orbitron:wght@400..900&family=Outfit:wght@100..900&family=Pixelify+Sans:wght@400..700&family=Sixtyfour+Convergence&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Tilt+Neon&display=swap');

    
@font-palette-values --vapor {
  font-family: "Sixtyfour Convergence";
  override-colors:
    0 #27F5D3,
    1 #BE27F5,
    2 #F5A927;
   
}
.vapor {
  font-palette: --vapor;
}

    
.sixtyfour-convergence-vapor {
  font-family: "Sixtyfour Convergence", sans-serif;
  
  font-weight: 300;
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

    .big-footer {
        text-align: center;
        padding: 10px 0; /* Use a smaller, uniform padding */
        bottom:0;
    }
    .site-footer{
        
        
    
        margin: 0;
        /*font-size: 0.9rem;*/
        
        position: absolute; 
        bottom:0; 
        width: 100%; 
        z-index: 9999; 
        animation: flicker2 .15s infinite;
    }
    .site-footer a, .site-footer a {
    padding: 0 5vw 0 5px;
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
.foot-format-size{
        font-size: clamp(14px, .7rem, 18px);
        
}
.foot-format-color{

        color: cyan; 
        
}
.foot-format-font{

        font-family: "Sixtyfour Convergence", "Courier New", sans-serif;
         font-palette: --vapor;
        font-variation-settings:
            "BLED" 75,
            "SCAN" 50,
            "XELA" 75,
            "YELA" 75;
}
    .footer-links a {
        display: inline-block !important;
        text-decoration: none;
        padding: 0px 10px 0px 5px;
        
}
@media (max-width: 768px) {
 .footer-links a {
 font-size: clamp(16px, 1.5rem, 22px);
 padding: 0 0 0 5px;
 }
}


`;

document.head.appendChild(style);


var footOne = `

<footer class="site-footer big-footer">

    
    <div class="footer-links">
        <a href="https://www.narrowtamps.com/index.html">Home</a>
        <a href="https://www.narrowtamps.com/pages/campaigns.html">Campaigns</a>
        <a href="https://www.narrowtamps.com/pages/socials.html">Socials</a>
            <a href="https://www.narrowtamps.com/about.html">About</a>
            <!--<a href="https://www.narrowtamps.com/fish.html">Fish</a>-->
            `   
var footTwo = 
`    </div>
    <p>&copy; 2026 The Narrow Tamps. All rights reserved.</p>
   
</footer>`;
document.getElementById('footer-placeholder').innerHTML = footOne + footTwo;

function updateFooter(size, color, family, link, name) {
   if(link) {
      var linkRef = '<a href="' + link + '">';
   }
   else {
      var linkRef = '';
   }
   if(name) {
         var nameRef = name + '</a>;'
      }
      else{
         var nameRef = '';
      }

      document.getElementById('footer-placeholder').innerHTML = footOne +linkRef+nameRef+ footTwo;
    const footer = document.getElementById('footer-placeholder');
    const links = footer.querySelectorAll('a');
    
    if (size) { 
        var sizeFoot = size;
        
    } else {
        // Corrected: Removed the 'font-size:' prefix
        var sizeFoot = 'clamp(14px, .7rem, 18px)';
    }
    footer.style.fontSize = sizeFoot;
    links.forEach(a => a.style.setProperty('font-size', sizeFoot, 'important'));

    if (color) {
        var colFoot = color;
       
    } else {
        var colFoot = 'Cyan';
    }
   footer.style.color = colFoot;
   links.forEach(a => a.style.setProperty('color', colFoot, 'important'));

    if (family) {
       footer.style.fontFamily = family;
       links.forEach(a => a.style.setProperty('font-family', family, 'important'));
    } else {
       footer.style.fontFamily = 'Sixtyfour Convergence';
       links.forEach(a => a.style.setProperty('font-family', 'Sixtyfour Convergence', 'important'));
       footer.style.fontPalette = '--vapor';
       links.forEach(a => a.style.setProperty('font-palette', '--vapor', 'important'));
       footer.style.fontVariationSettings = '"BLED" 75, "SCAN" 50, "XELA" 75, "YELA" 75';
       links.forEach(a => a.style.setProperty('font-variation-settings', '"BLED" 75, "SCAN" 50, "XELA" 75, "YELA" 75', 'important'));
    }
}

