const fs = require('fs')

const main = async () => {
  const [owner] = await ethers.getSigners()
  console.log(`Deploying contracts with the account: ${owner.address}`)

  const balance = await owner.getBalance()
  console.log(`Deploying contracts with the account: ${balance.toString()}`)

  const Token = await ethers.getContractFactory('UToken')
  const token = await Token.deploy(10000)
  console.log(`Token contract address: ${token.address}`)

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format('json'))
  }
  fs.writeFileSync(
    './frontend/contracts/UToken.json',
    JSON.stringify(data, null, 2)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
