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
        margin-top: auto;
        width: 100%;
    }

    .site-footer p {
        margin: 0; /* Removes default gap between 1st and 2nd line */
        font-size: 0.9rem;
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
        color: darkred; /* Keeping your theme consistent */
    }
`;

document.head.appendChild(style);
document.getElementById('footer-placeholder').innerHTML = `
<footer class="site-footer" style="margin-top: 50px; text-align: center;">
    <p></p>
    &copy; 2026 The Narrow Tamps. All rights reserved.
    <div class="footer-links">
        <a href="../pages/campaigns.html">Campaigns</a>
            <a href="../pages/socials.html">Socials</a>
            <a href="../index.html">Main</a>
            <a href="../fish.html">Fish</a>
       <p><br></p>     
    </div>
</footer>`;
