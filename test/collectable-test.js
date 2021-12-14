const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Collectable', function () {
  it('create a new collectable contract', async function () {
    const UCollectable = await ethers.getContractFactory('UCollectable')
    const token = await UCollectable.deploy()
    await token.deployed()
    /*
    expect(await token.totalSupply()).to.equal(10000)

    const mintingTx = await token.mintNewTokens(20)

    // wait until the transaction is mined
    await mintingTx.wait()

    expect(await token.totalSupply()).to.equal(10000 + 20)
    expect(await token.name()).to.equal('U-Token')*/
  })
})
