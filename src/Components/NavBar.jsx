import React from "react";

function NavBar()
{
    return(
      <>
        <nav className="container h-auto w-full bg-black-100 text-white flex justify-around text-lg p-2">
        <div class="relative group inline-block">
          <span
            className="hover:text-blue-200 "
          >
            <h1 className="shadow-slate-500 font-bold"> SIMPLY</h1>
          </span>
         
        </div>
        <div className="flex gap-8">
          <span className="hover:text-blue-200">Home</span>
          <span className="hover:text-blue-200">Task</span>
        </div>
      </nav>
      </>
    );

}
export default NavBar;