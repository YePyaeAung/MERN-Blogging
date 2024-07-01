import ReactDOM from "react-dom/client";
import App from "./MainRoute.jsx";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888/api";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
