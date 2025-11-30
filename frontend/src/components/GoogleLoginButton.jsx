import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function GoogleLoginButton({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={async (cred) => {
        try {
          const token = cred.credential;
          const googleUser = jwtDecode(token);

          const res = await axios.post(
            "http://localhost:5000/api/auth/google",
            { token }
          );

          const { jwtToken, user } = res.data;

          localStorage.setItem("jsp_token", jwtToken);
          localStorage.setItem("jsp_user", JSON.stringify(user));

          onSuccess && onSuccess({ token: jwtToken, user });
        } catch (err) {
          alert("Google login failed");
        }
      }}
      onError={() => alert("Google login failed")}
    />
  );
}
