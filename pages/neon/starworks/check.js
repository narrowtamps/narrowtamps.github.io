

// 1. Import the specific initializeApp function from the CDN
import { initializeApp } from "https://www.gstatic.com";

// 2. Paste your unique configuration here (copied from the console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 3. Initialize Firebase by passing the config object
const app = initializeApp(firebaseConfig);

console.log("Firebase connected!", app);
window.myFunction() = function() {
    // Your JavaScript code goes here
    alert("The script from the external file is running!");
    console.log("Function executed successfully.");
}
