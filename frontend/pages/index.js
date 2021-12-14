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
      <header class='text-gray-600 body-font'>
        <div class='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <a class='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              class='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
              viewBox='0 0 24 24'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
            </svg>
            <span class='ml-3 text-xl'>Tailblocks</span>
          </a>
          <nav class='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
            <a class='mr-5 hover:text-gray-900'>First Link</a>
            <a class='mr-5 hover:text-gray-900'>Second Link</a>
            <a class='mr-5 hover:text-gray-900'>Third Link</a>
            <a class='mr-5 hover:text-gray-900'>Fourth Link</a>
          </nav>
          <button class='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
            Button
            <svg
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              class='w-4 h-4 ml-1'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </button>
        </div>
      </header>

      <h1 className='m-8 text-2xl font-extrabold'>U.Crypto</h1>
      <pre className='m-4 p-2 shadow-lg rounded-md bg-gray-50'>
        {JSON.stringify(
          {
            initialized,
            connected,
            userAddress
          },
          null,
          2
        )}
      </pre>
    </>
  )
}
export default Index
