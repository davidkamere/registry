import { useEffect, useState } from 'react';

import { connectWallet } from '../utils/connectToMetamask';
import Registry from '../utils/Registry.json'

import Navbar from '@/components/Navbar';
import RegistryForm from '@/components/RegistryForm';
import Listing from '@/components/Listing';

import { propertyAtom } from '@/recoil/atoms/propertyAtom';
import { useSetRecoilState } from 'recoil';




import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Home() {

  const setProperties = useSetRecoilState(propertyAtom);
  const [account, setAccount] = useState(null);

  const [smartContract, setSmartContract] = useState(null);

  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
      connectWallet()
      getAccount()
      loadBlockChainData()

      const updateDetails = () => {
        getAccount()
        loadBlockChainData()
      }

      window.addEventListener('mousemove', updateDetails)

      return () => window.removeEventListener('mousemove', updateDetails)

  }, []);



  const getAccount = async () => {
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
        .catch((err) => {
          console.log(err)
        })

      setAccount(accounts[0])
  }


  const loadBlockChainData = async () => {
    
    const networkId = await web3.eth.net.getId()
    const networkData = Registry.networks[networkId]

    if(networkData) {
        const smartContract = new web3.eth.Contract(Registry.abi, networkData.address)
        setSmartContract(smartContract)

        const propertyCount = await smartContract.methods.propCount().call()

        const propertiesArray = [];
        for (let i = 1; i <= propertyCount; i++) {
          const property = await smartContract.methods.properties(i).call();
          propertiesArray.push(property);
        }
        setProperties(propertiesArray);

        setLoading(false)
        
    } else {
        window.alert('Registry contract not deployed to detected network.')
    }
  }

  
  // Add new land to the blockchain
  const registerLand = (name, location, holder_name, lr_no, holder_id, price) => {
    setLoading(true)
    smartContract.methods.regProperty(name, location, holder_name, lr_no, holder_id, price)
      .send({ from: account })
      .once('receipt', (receipt) => {
        setLoading(false)
        loadBlockChainData()
        setModalIsOpen(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    
  }

  const buyLand = (id, price) => {
    setLoading(true)
    const priceToEth = web3.utils.toWei((Number(price) * 0.0000043).toString(), 'ether')
    
    smartContract.methods.buyProperty(id)
      .send({ from: account, value: priceToEth })
      .once('error', (error) => {
        console.log(error)
        setLoading(false)
      })
      .once('receipt', (receipt) => {
        setLoading(false)
        loadBlockChainData()
      })
    
  }

  const sellLand = (id, price) => {
    setLoading(true)

    // convert to usd then to ETH
    const priceToEth = web3.utils.toWei((Number(price) * 0.0000043).toString(), 'ether')

    smartContract.methods.sellProperty(id, priceToEth)
      .send({ from: account })
      .once('receipt', (receipt) => {
        setLoading(false)
        loadBlockChainData()
      })
    
  }
  

  return (
    <div id="root">
      <Navbar account={account}/>
      {!loading ? (
        <div className="flex flex-col items-center justify-center">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Register Land Modal"
            style={customStyles}
          >
                <div className='flex justify-end text-red-800 hover:cursor-pointer'>
                  <button onClick={() => setModalIsOpen(false)}>
                    <span className='font-bold'>x</span>
                  </button>
                </div>
                <div className='p-10'>
                  <RegistryForm registerLand={registerLand} />
                </div>
            
          </Modal>
          <div className='mt-5'>
            <Listing  account={account} buyLand={buyLand} sellLand={sellLand}/>
            <div className='mt-5 mb-10 flex justify-center'>
              <button className="bg-red-600 text-white font-bold px-4 py-2 rounded-md hover:cursor-pointer" onClick={() => setModalIsOpen(true)}>Register New Land</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col h-screen items-center justify-center -m-24">
            <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;






