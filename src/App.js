import Main from "./components/Main";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import './app.css'

function App() {
  const apikey = process.env.REACT_APP_WEATHER_API;

const firebaseConfig = {
  apiKey: "AIzaSyA9YT6EYfvT1koswtRycIaqaNwOZR4HV0o",
  authDomain: "forecastmyweather.firebaseapp.com",
  projectId: "forecastmyweather",
  storageBucket: "forecastmyweather.appspot.com",
  messagingSenderId: "929514078164",
  appId: "1:929514078164:web:369933ea4d69809a166041",
  measurementId: "G-H8VPX3097C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  return (
    <div className="App">
      <Main apikey={apikey}/>
    </div>
  );
}

export default App;
