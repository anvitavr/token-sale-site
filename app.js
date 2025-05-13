
const saleAddress = "YOUR_SALE_CONTRACT_ADDRESS"; // Your sale contracts address
const saleAbi = [ // Your sale contract's ABI
  "function buyTokens() payable",
  "function rate() view returns (uint256)"
];

let provider, signer, contract;

async function connectWallet() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(saleAddress, saleAbi, signer);
    alert("Wallet connected!");
  } else {
    alert("Please install MetaMask.");
  }
}

async function buyTokens() {
  const ethAmount = document.getElementById("ethAmount").value;
  const tx = await contract.buyTokens({ value: ethers.parseEther(ethAmount) });
  await tx.wait();
  alert("Tokens purchased!");
}