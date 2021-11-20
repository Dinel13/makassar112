import React from "react";

export default function DarkModeButton({toggleMode}) {
  return (
    <button onClick={toggleMode} className="flex items-center justify-center">
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className="bg-yellow-200 mr-1 focus:ring-transparent toggle-checkbox absolute block w-6 h-6 rounded-full appearance-none cursor-pointer"
        />
        <label
          htmlFor="toggle"
          onClick={toggleMode}
          className="toggle-label block h-8 -ml-1 -mt-1 rounded-full bg-yellow-400 cursor-pointer"
        ></label>
      </div>
    </button>
  );
}
