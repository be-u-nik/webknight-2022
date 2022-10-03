import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();

  const formData = {};
  const [password, setpassword] = useState("");
  async function handleOnSubmit(e) {
    e.preventDefault();
    Array.from(e.currentTarget.elements).forEach((field) => {
      console.log(field.name);
      if (!field.value && field.name) {
        if (field.name === "confirmPassword")
          toast.error("Please fill confirm password");
        else toast.error("Please Fill " + field.name);
        return;
      } else if (field.name) {
        if (field.name === "password") setpassword(field.value);
        if (field.name === "confirmPassword" && field.value !== password)
          toast.error("passwords do not match");
        else formData[field.name] = field.value;
      }
    });
    console.log(formData);

    // const resolveAfter3Sec = new Promise((resolve, reject) => {
    //   setTimeout(resolve, 3000);
    // });
    // await toast.promise(resolveAfter3Sec, {
    //   pending: "Validating",
    //   success: "Logging in",
    //   error: "Invalid Credentials",
    // });
    // navigate("/otp");
    // await fetch("/", {
    //   method: "post",
    //   body: JSON.stringify(formData),
    // });
  }
  return (
    <div className="shadow rounded-sm px-12 py-8 sm:w-[600px] md:w-[600px] flex flex-col">
      <ToastContainer position="top-center" autoClose={5000} />
      <h1 className="pb-8 md:pb-16 text-center">SignUp to Refer&Earn</h1>
      <form
        method="post"
        onSubmit={handleOnSubmit}
        className="flex flex-col items-center justify-start w-full"
      >
        <div className="flex flex-col w-full mb-2 max-w-[1200px] md:pl-5 text-left self-end">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your Full Name"
            className="mt-2 w-full px-[12px] py-0 md:px-5 h-[48px] text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
          />
        </div>
        <div className="flex flex-col w-full mb-2 max-w-[1200px] md:pl-5 text-left self-end">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="mt-2 w-full px-[12px] py-0 md:px-5 h-[48px] text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
          />
        </div>
        <div className="mt-2 flex flex-col w-full mb-2 max-w-[1200px] md:pl-5 text-left self-end">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="mt-2 w-full px-[12px] py-0 md:px-5 h-[48px] text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
          />
        </div>
        <div className="mt-2 flex flex-col w-full mb-2 max-w-[1200px] md:pl-5 text-left self-end">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="mt-2 w-full px-[12px] py-0 md:px-5 h-[48px] text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
          />
        </div>
        <div className="flex flex-col md:flex-row md:justify-between w-full">
          <button
            onClick={() => {
              //   navigate("/rewards");
            }}
            type="submit"
            className="order-1 md:order-2 w-full md:max-w-[200px] mt-2 h-[48px] px-[10px] py-[5px] rounded-[4px] text-[12px] lg:text-[18px] font-bold bg-[#B1EAC1] hover:bg-[#58d17a]"
          >
            SignUp
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="order-2 md:order-1 w-full md:max-w-[200px] mt-2 h-[48px] px-[10px] py-[5px] rounded-[4px] text-[12px] lg:text-[18px] font-bold text-blue-600  hover:bg-[#f3f4f6]"
          >
            <Link to="/login">Login</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
