import { useState } from "react";
import Navbar from "../components/Navbar";
import placeholder from "../assets/profile-placeholder.png";

function Profile() {
  const [editable, seteditable] = useState(false);
  const username = "zero";
  const email = "zero@zero.com";
  return (
    <div>
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
            {editable ? (
              <button
                onClick={() => {
                  seteditable(false);
                }}
                className="mt-2 h-[48px] px-[10px] py-[5px] rounded-[4px] text-[12px] lg:text-[18px] font-bold leading-[25px] bg-[#B1EAC1]"
              >
                save changes
              </button>
            ) : (
              <button
                onClick={() => {
                  seteditable(true);
                }}
                className="mt-2 h-[48px] px-[10px] py-[5px] rounded-[4px] text-[12px] lg:text-[18px] font-bold bg-[#B1EAC1]"
              >
                edit profile
              </button>
            )}
          </div>
          <form
            method="post"
            className="flex flex-col items-center justify-start w-full md:w-3/4 px-5"
          >
            <div className="flex flex-col w-full mb-2 max-w-[800px] md:pl-5 text-left self-end">
              <label htmlFor="name">Name</label>
              {editable ? (
                <input
                  type="text"
                  value={username}
                  className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
                />
              ) : (
                <input
                  type="text"
                  value={username}
                  disabled
                  className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2"
                />
              )}
            </div>
            <div className="flex flex-col w-full mb-2 max-w-[800px] md:pl-5 text-left self-end">
              <label htmlFor="name">Email</label>
              <input
                type="text"
                value={email}
                disabled
                className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2"
              />
            </div>
            {editable && (
              <div className="flex flex-col w-full mb-2 max-w-[800px] md:pl-5 text-left self-end">
                <label htmlFor="name">New Password</label>
                <input
                  type="text"
                  placeholder="New Password"
                  className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
                />
              </div>
            )}
            {editable && (
              <div className="flex flex-col w-full mb-2 max-w-[800px] md:pl-5 text-left self-end">
                <label htmlFor="name">Confirm New Password</label>
                <input
                  type="text"
                  placeholder="Confirm New Password"
                  className="px-[12px] py-0 md:px-5 text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
                />
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Profile;
