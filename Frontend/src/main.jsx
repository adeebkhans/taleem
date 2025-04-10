import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; 
import App from "./App";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";

const GOOGLE_CLIENT_ID = "678533641856-aksvoa7gnm9ifnum89vr0nk39v9adaqp.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
    <Provider store={store}>
    <App />
  </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
