import { ethers } from 'ethers';

export async function connectToArbitrum() {
    // @ts-ignore
    if (window.ethereum) {
      try {
        // @ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return signer;
      } catch (error) {
        console.error(error);
        return null;
      }
    } else {
      console.error('No Ethereum provider detected');
      return null;
    }
  }
  