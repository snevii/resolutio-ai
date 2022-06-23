import React from "react";
import ComingSoon from "../components/ComingSoon";
import Meta from "../components/seo/Meta";
import { createDispute } from "../Integration/Implementations/DisputePool";
const wallet = () => {
  return (
    <>
      <Meta title="Wallet" />
      <ComingSoon
      createDispute = {createDispute} />
    </>
  );
};

export default wallet;
