import React from "react";

const Header = (props: any) => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex items-center justify-center bg-gradient-to-r from-blue-400 to-gray-600">
      <h1 className="text-white text-xl font-bold">{props.title}</h1>
    </nav>
  );
};

export default Header;
