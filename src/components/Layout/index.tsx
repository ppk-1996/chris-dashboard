import React from "react";

import Nav from "../Navigation";

const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div>
    <Nav />
    {children}
  </div>
);

export default Wrapper;
