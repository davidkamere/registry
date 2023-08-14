import { contractAddress, ethEndpoint } from "../../constants/ethConstants";
import { ethers } from "ethers";



export default async function handler(req, res) {
    if (req.method === 'GET') {
        let provider =  new ethers.JsonRpcProvider(ethEndpoint);
        let signer = await provider.getSigner()

        const abi = [
            "function buyProperty(uint256 _propertyId) public payable",
            "function sellProperty(uint256 _propertyId) public view",
            "function regProperty(string memory name, string memory location, string memory holder_name, string memory lr_no, uint holder_id, uint price) public"
        ];

        const smartContract =  new ethers.Contract(contractAddress, abi, signer);

        // smartContract.regProperty('test', 'everywhere', 'kamere', 'lr_no', 1, 100000000000)
        
        res.status(200).json(smartContract);
    } else {
        res.status(400).json({ error: "Invalid request method." });
    }
}