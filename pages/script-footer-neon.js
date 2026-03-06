// 1. Create a style element to hold your global CSS
const style = document.createElement('style');
style.textContent = `
    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-height: 100dvh; 
        margin: 0;
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
    }


    .footer-links {
        display: flex;
        justify-content: center;
         color: #00ff00; /* Bright green text */
    
    font-family: "Courier New", monospace; /* Classic monospace font */
         
    }

    .footer-links a {
        display: inline-block !important;
        text-decoration: none;
        padding: 5px 10px;
        font-size: .9rem;
        color: darkred; /* Keeping your theme consistent */
  
   
    color: #00ff00; /* Bright green text */
    
    font-family: "Courier New", monospace; /* Classic monospace font */
    
   
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

