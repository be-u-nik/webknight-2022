import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Verifyemail() {
  const navigate = useNavigate();
  //   toast.success("Email verified successfully");
  const { id } = useParams();
  //   const promise =
  //   toast.promise(
  //     axios.get("http://localhost:8000/api/users/confirmation/" + id),
  //     {
  //       pending: "Verifying email...",
  //       success: "Redirecting to login page",
  //       error: "Link expired",
  //     }
  //   );
  useEffect(() => {
    async function verify() {
      await axios
        .get("http://localhost:8000/api/users/confirmation/" + id)
        .then((res) => {
          toast.info("Verifying email...", {
            toastId: "verifyemail",
          });
          setTimeout(() => {
            toast.success("Redirecting to login page", {
              toastId: "redirecting",
            });
          }, 1000);

          setTimeout(() => {
            navigate("/login");
          }, 7000);
        });
    }
    verify();
    return () => {};
  }, []);

  return (
    <div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Verifyemail;
