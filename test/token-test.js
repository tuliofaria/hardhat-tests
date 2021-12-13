const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  it("create a new token", async function () {
    const UToken = await ethers.getContractFactory("UToken");
    const token = await UToken.deploy(10000);
    await token.deployed();

    expect(await token.totalSupply()).to.equal(10000);

    const mintingTx = await token.mintNewTokens(20);

    // wait until the transaction is mined
    await mintingTx.wait();

    expect(await token.totalSupply()).to.equal(10000 + 20);
    expect(await token.name()).to.equal("U-Token");
  });

  it("allows only Admin to mint new tokens", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const UToken = await ethers.getContractFactory("UToken", owner);
    const token = await UToken.deploy(10000);
    await token.deployed();

    await expect(token.connect(addr1).mintNewTokens(20)).to.be.revertedWith(
      "You need to be the Owner."
    );
  });
});
