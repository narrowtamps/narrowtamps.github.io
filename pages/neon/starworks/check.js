

// 1. Import the specific initializeApp function from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";


// 2. Paste your unique configuration here (copied from the console)

  const firebaseConfig = {
    apiKey: "AIzaSyC5Xbq3md9TsNkAviKPv1Rw5W0zu0sd1ns",
    authDomain: "starfight-37ba5.firebaseapp.com",
    databaseURL: "https://starfight-37ba5-default-rtdb.firebaseio.com",
    projectId: "starfight-37ba5",
    storageBucket: "starfight-37ba5.firebasestorage.app",
    messagingSenderId: "317349343613",
    appId: "1:317349343613:web:bf8556967437162db49c14",
    measurementId: "G-NSGC4YKT65"
  };

// 3. Initialize Firebase by passing the config object
const app = initializeApp(firebaseConfig);

console.log("Firebase connected!", app);

