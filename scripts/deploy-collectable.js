const fs = require('fs')

const main = async () => {
  const [owner] = await ethers.getSigners()
  console.log(`Deploying contracts with the account: ${owner.address}`)

  const balance = await owner.getBalance()
  console.log(`Deploying contracts with the account: ${balance.toString()}`)

  const UCollectable = await ethers.getContractFactory('UCollectable')
  const uCollectable = await UCollectable.deploy()
  console.log(`Token contract address: ${uCollectable.address}`)

  const data = {
    address: uCollectable.address,
    abi: JSON.parse(uCollectable.interface.format('json'))
  }
  fs.writeFileSync(
    './frontend/contracts/UCollectable.json',
    JSON.stringify(data, null, 2)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
