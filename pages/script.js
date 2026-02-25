// 1. Create a style element to hold your global CSS
const style = document.createElement('style');
style.textContent = `
    /* These styles apply to every page that loads this script */
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

    .site-footer {
        text-align: center;
        padding: 20px 0;
        border-top: 1px solid GreenYellow;
        color: GreenYellow;
    }

    .footer-links {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 10px;
    }

    .footer-links a {
        display: inline-block !important;
        text-decoration: none;
        color: GreenYellow;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);
document.getElementById('footer-placeholder').innerHTML = `
<footer class="site-footer" style="margin-top: 50px; text-align: center;">
    <p>&copy; 2026 The Narrow Tamps. All rights reserved.</p>
    <div class="footer-links">
        <a href="../pages/campaigns.html">Campaigns</a>
            <a href="../pages/socials.html">Socials</a>
            <a href="../index.html">Main</a>
            <a href="../fish.html">Fish</a>
    </div>
</footer>`;
