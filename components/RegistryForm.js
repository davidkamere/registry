import { useState} from "react";
import { propertyAtom } from "@/recoil/atoms/propertyAtom"
import { useRecoilValue } from "recoil"

function RegistryForm({registerLand}) {

    // name, location, holder_name, lr_no, holder_id, price

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [holder_name, setHolderName] = useState("");
    const [lr_no, setLrNo] = useState("");
    const [holder_id, setHolderId] = useState(0);
    const [price, setPrice] = useState(0);

    const properties = useRecoilValue(propertyAtom)

    const handleSubmit = (e) => {
        e.preventDefault();
        const check = properties.find(property => property.lr_no === lr_no)
        if(check) {
            alert("Land Registry Number already exists. Please try again.")
            e.target.lr_no.value = ""
            setLrNo("")
            return
        } else {
            registerLand(name, location, holder_name, lr_no, holder_id, price);
        }
        
    }

    console.log(properties)


    return (
        <>
            <p className="text-center mb-10 ">Use the form below to add new land to the registry blockchain:</p>
            <form onSubmit={handleSubmit}>
                {/* Two column grid form */}
                
                <div className="grid grid-cols-2 gap-x-52 gap-y-10">
                    <div>
                        <input type="text" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Size" onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div>
                        <input type="text" id="location" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required/>
                    </div>
                    <div>
                        <input type="text" id="holder_name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Holder Name" onChange={(e) => setHolderName(e.target.value)} required/>
                    </div>
                    <div>
                        <input type="text" id="lr_no" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="LR No" onChange={(e) => setLrNo(e.target.value)} required/>
                    </div>
                    <div>
                        <input type="text" id="holder_id" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Holder ID" onChange={(e) => setHolderId(e.target.value)} required/>
                    </div>
                    <div>
                        <input type="number" id="price" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-black w-64 hover:cursor-pointer  text-white font-bold py-2 px-4 rounded mt-12" >
                        Add to Registry
                    </button>
                </div>
            </form>
        </>
    )
}

export default RegistryForm;