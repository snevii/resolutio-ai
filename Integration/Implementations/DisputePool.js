import { ethers } from "ethers";
import {
    disputePoolAddress
} from '../config'
import dispute from '../Artifacts/contracts/DisputePool.sol/Disputepool.json'

async function createDispute(url) {
    //Get the global metamask ethereum object from the browser
    const { ethereum } = window;

    //if none is found, it means that a user does not  
    if (!ethereum) {
      return;
    }

    //Get wallet provider and signer
    const provider = await new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const price = "60"

    //contract initialization: create an instance of the contract
    const disputePoolContract = new ethers.Contract(disputePoolAddress, dispute.abi, signer);

    //set the amount of Matic to be coolected
    const stake = ethers.utils.parseUnits(price, "ether");

    //call to the smartContract
    const createDisputeTx = await disputePoolContract.createDispute(url, { value: stake });
    //Wait for transcation to be mined
    await createDisputeTx.wait();
  }

  export {createDispute}
