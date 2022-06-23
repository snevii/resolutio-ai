import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { COMING_SOON_TEXT } from "../constants/strings";
import comingSoonImage from "../public/coming_soon.svg";
import { ethers } from "ethers";
import {
    disputePoolAddress
} from '../Integration/config'
import dispute from '../Integration/Artifacts/contracts/DisputePool.sol/Disputepool.json'

const ComingSoon = (createDispute) => {

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

  return (
    <Box
      sx={{ mx: "auto", mb: "2rem", textAlign: "center", maxWidth: "500px" }}
    >
      <h1>{COMING_SOON_TEXT}</h1>
      <button onClick={() => createDispute("url")}>x</button>
      <Image src={comingSoonImage} alt="coming Soon Image" />
    </Box>
  );
};

export default ComingSoon;
