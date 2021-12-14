import { ethers, Contract, BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import UToken from '../contracts/UToken.json'

const Index = () => {
  const [userAddress, setUserAddress] = useState('')
  const [connected, setConnected] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const getContract = async () => {
    if (window.ethereum) {
      try {
        // this opens Metamask
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        setUserAddress(accounts[0])
        setConnected(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log({ provider })
        const signer = provider.getSigner()
        const signerAddress = await signer.getAddress()
        const uToken = new Contract(UToken.address, UToken.abi, signer)
        console.log({ signerAddress, uToken })
        const balance = await uToken.balanceOf(signerAddress)
        console.log({ balance: BigNumber.from(balance).toString() })
        await uToken.transfer('0x90f79bf6eb2c4f870365e785982e1f101e93b906', 10)
        return { signerAddress, uToken }
      } catch (err) {
        console.log({ err })
        if (err.code === 4001) {
          // User rejected request
        }
        setConnected(false)
        setInitialized(true)
      }
    }
  }

  useEffect(() => {
    getContract()
  }, [])
  return (
    <>
      <h1>EthersJS</h1>
      <pre>
        {JSON.stringify({
          initialized,
          connected,
          userAddress
        })}
      </pre>
    </>
  )
}
export default Index
