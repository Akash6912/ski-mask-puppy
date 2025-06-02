
document.getElementById("addToWalletBtn").addEventListener("click", async () => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask is not installed. Please install it to use this feature.");
    return;
  }

  const tokenAddress = "0x2fF5bE03a5456aB99836cc2caA4Ae0d158680581"; // 🔁 Replace this
  const tokenSymbol = "Skipuppy";                    // 🔁 Replace if needed
  const tokenDecimals = 18;
  const tokenImage = "https://yourdomain.com/assets/token-icon.png"; // Optional
  const baseChainParams = {
    chainId: "0x2105", // Base Mainnet = 8453 = 0x2105
    chainName: "Base",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorerUrls: ["https://basescan.org"]
  };

  try {
    // Switch to Base
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: baseChainParams.chainId }],
    });
  } catch (switchError) {
    // If the chain hasn't been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [baseChainParams],
        });
      } catch (addError) {
        console.error("Failed to add Base network:", addError);
        return;
      }
    } else {
      console.error("Failed to switch network:", switchError);
      return;
    }
  }

  // Add Token
  try {
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage
        },
      },
    });

    if (wasAdded) {
      console.log("Token added to wallet!");
    } else {
      console.log("User rejected token addition.");
    }
  } catch (error) {
    console.error("Error adding token:", error);
  }
});





const track = document.getElementById("carouselTrack");
const items = track.querySelectorAll(".carousel-item");
let index = 0;

function autoSlide() {
  if (window.innerWidth < 768) {
    index = (index + 1) % items.length;
    const offset = -index * track.clientWidth;
    track.style.transform = `translateX(${offset}px)`;
  } else {
    track.style.transform = "none";
  }
}

setInterval(autoSlide, 2000);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    track.style.transform = "none";
  }
});



function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("open");
}

// Smooth scroll (optional if not using scroll-behavior CSS)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});