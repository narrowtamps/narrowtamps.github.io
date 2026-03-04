

// 1. Import the specific initializeApp function from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";


// 2. Paste your unique configuration here (copied from the console)
const firebaseConfig = {
  apiKey: "AIzaSyB86jNHj0pT_GmxZ-3mPOXOJiRr-QLEqSA",
  authDomain: "test-608eb.firebaseapp.com",
  projectId: "test-608eb",
  storageBucket: "test-608eb.firebasestorage.app",
  messagingSenderId: "649362329355",
  appId: "1:649362329355:web:cbac23cadf9e25e7f35c0e"
};

// 3. Initialize Firebase by passing the config object
const app = initializeApp(firebaseConfig);

console.log("Firebase connected!", app);

