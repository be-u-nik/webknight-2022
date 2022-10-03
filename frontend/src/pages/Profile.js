import { useState } from "react";
import Navbar from "../components/Navbar";
import placeholder from "../assets/profile-placeholder.png";
import { ToastContainer, toast } from "react-toastify";

function Profile() {
  const [editable, seteditable] = useState(false);
  const [username, setusername] = useState("zero");
  const email = "zero@zero.com";
  // const [password, setpassword] = useState("");
  const formData = {};
  async function handleOnSubmit(e) {
    e.preventDefault();
    Array.from(e.currentTarget.elements).forEach((field) => {
      console.log(field.name + "---" + field.value);
      if (!field.value && field.name) {
        if (field.name === "name") formData[field.name] = username;
      } else if (field.name) formData[field.name] = field.value;
      // else if (field.name) {
      //   if (field.name === "password") {
      //     setpassword(field.value);
      //     console.log(password);
      //     formData[field.name] = field.value;
      //   } else if (
      //     field.name === "confirmPassword" &&
      //     field.value !== password
      //   ) {
      //     toast.error("passwords do not match");
      //   } else formData[field.name] = field.value;
      // }
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
    <div>
      <ToastContainer position="top-center" autoClose={5000} />

      <Navbar />
      <section className="pt-5 md:pt-20 md:px-20 text-center max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start mt-5 md:mt-20">
          <div>
            <div className="rounded-full h-[124px] w-[124px] md:h-[256px] md:w-[256px] md:mb-5">
              <img
                className="shadow rounded-full"
                src={placeholder}
                alt="profile"
                height={448}
                width={448}
              />
            </div>
          </div>
          <form
            method="post"
            onSubmit={handleOnSubmit}
            className="flex flex-col items-center justify-start w-full md:w-3/4 px-5"
          >
            <div className="flex flex-col w-full mb-2 max-w-[800px] md:pl-5 text-left self-end">
              <label htmlFor="name">Name</label>
              {editable ? (
                <input
                  type="text"
                  name="name"
                  className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
                />
              ) : (
                <input
                  type="text"
                  name="name"
                  placeholder={username}
                  disabled
                  className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2"
                />
              )}
            </div>
            <div className="flex flex-col w-full mb-2 max-w-[800px] md:pl-5 text-left self-end">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                disabled
                className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2"
              />
            </div>

            <div className="flex flex-col w-full mb-2 max-w-[800px] md:pl-5 text-left self-end">
              {editable && <label htmlFor="password">New Password</label>}
              {editable ? (
                <input
                  type="text"
                  name="password"
                  placeholder="New Password"
                  className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
                />
              ) : (
                <input
                  type="text"
                  name="password"
                  placeholder="New Password"
                  className="hidden px-[12px] py-0 md:px-5 text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
                />
              )}
            </div>
            <div className="flex flex-col w-full mb-2 max-w-[800px] md:pl-5 text-left self-end">
              {editable && (
                <label htmlFor="confirmPassword">Confirm New Password</label>
              )}
              {editable ? (
                <input
                  type="text"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
                />
              ) : (
                <input
                  type="text"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="hidden px-[12px] py-0 md:px-5 text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
                />
              )}
            </div>
            {editable ? (
              <button
                onClick={(e) => {
                  seteditable(false);
                }}
                type="submit"
                className="mt-2 h-[48px] px-[10px] py-[5px] rounded-[4px] text-[12px] lg:text-[18px] font-bold leading-[25px] bg-[#B1EAC1]"
              >
                save changes
              </button>
            ) : (
              <button
                onClick={(e) => {
                  seteditable(true);
                  e.preventDefault();
                }}
                className="mt-2 h-[48px] px-[10px] py-[5px] rounded-[4px] text-[12px] lg:text-[18px] font-bold bg-[#B1EAC1]"
              >
                edit profile
              </button>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Profile;
