import React from "react";

function NavBar()
{
    return(
      <>
        <nav className="2xl:container 2xl:h-auto 2xl:w-full  aspect-auto bg-black-100 text-white flex justify-around 2xl:text-lg 2xl:p-2   sm:w-full ">
        <div class="relative group inline-block">
          <span
            className="hover:text-blue-200 "
          >
            <h1 className="shadow-slate-500 font-bold hover:animate-bounce"> SIMPLY</h1>
          </span>
         
        </div>
        <div className="flex gap-8">
          <span className="hover:text-blue-200 hover:animate-bounce">Home</span>
          <span className="hover:text-blue-200 hover:animate-bounce">Task</span>
        </div>
      </nav>
      </>
    );

}
export default NavBar;