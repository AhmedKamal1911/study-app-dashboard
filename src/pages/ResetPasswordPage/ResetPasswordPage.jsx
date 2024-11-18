import axios from "axios";
import { useEffect, useState } from "react";

const ResetPasswordPage = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const verifyResetPasswordToken = async () => {
      setIsLoading(true);
      try {
        await axios.get("/verify-token");
        setIsValidToken(true);
      } catch (error) {
        setIsValidToken(false);
      } finally {
        setIsLoading(false);
      }
    };
    verifyResetPasswordToken();
  }, []);
  return (
    <div>
      ResetPasswordPage
      {isLoading
        ? "spinner"
        : isValidToken
        ? "Reset password form"
        : "invalid token"}
    </div>
  );
};

export default ResetPasswordPage;
