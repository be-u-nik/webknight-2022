// import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Verifyemail() {
  const navigate = useNavigate();
  //   toast.success("Email verified successfully");
  //   const { id } = useParams();
  //   const promise =
  //   toast.promise(
  //     axios.get("http://localhost:8000/api/users/confirmation/" + id),
  //     {
  //       pending: "Verifying email...",
  //       success: "Redirecting to login page",
  //       error: "Link expired",
  //     }
  //   );
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
  return (
    <div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Verifyemail;
