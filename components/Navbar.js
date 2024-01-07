import { React} from "react";
import {
  ConnectWallet,
} from "@thirdweb-dev/react";
import Image from "next/image";

function Navbar() {

  return (
    <>
      <nav className="text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Title */}
                <div className="flex items-center">
                    <Image
                        src="/logo.png"
                        width={60}
                        height={60}
                        alt="Logo"
                    />
                    <span className="ml-3 text-2xl font-bold text-black">PassChain</span>
                </div>

                {/* Decentralized Password Manager Text */}
                <div className="hidden md:block">
                    <p className="text-xl text-black">The Decentralized Password Manager</p>
                </div>

                {/* Connect Wallet Button */}
                <div>
                    <ConnectWallet
                        theme="dark"
                        modalSize="wide"
                        modalTitleIconUrl=""
                    />
                </div>
            </div>
        </nav>
    </>
  );
}

export default Navbar;
