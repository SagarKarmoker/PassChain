import {React, useState} from "react";
import {
  ConnectWallet,
  useConnectionStatus
} from "@thirdweb-dev/react";


function Navbar() {

  const connectionStatus = useConnectionStatus();

  return (
    <>
      <nav className="text-center font-bold text-2xl flex justify-between pt-4">
        Password Manager by Web 3.0

        <ConnectWallet
          theme={"dark"}
          modalSize={"wide"}
        />

      </nav>
    </>
  );
}

export default Navbar;
