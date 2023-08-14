import Web3 from 'web3'


export const connectWallet = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.web3.eth.getAccounts();
            const account = accounts[0];
            console.log(account);
        } catch (error) {
            console.error('Error:', error);
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        const accounts = await window.web3.eth.getAccounts();
        const account = accounts[0];
        console.log(account);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

