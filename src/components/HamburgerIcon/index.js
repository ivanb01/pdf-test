import React, { useState } from "react";
import Close from "@mui/icons-material/Close";
import Menu from "@mui/icons-material/Menu";

const HamburgerIcon = ({ open = false }) => {
  const [active, setActive] = useState(open);
  return (
    <div onClick={() => setActive(!active)} className="cursor-pointer">
      {active ? <Close className="text-white" /> : <Menu className="text-white" />}
    </div>
  );
};

export default HamburgerIcon;
