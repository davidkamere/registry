import { useState } from "react"

import { propertyAtom } from "@/recoil/atoms/propertyAtom"
import { useRecoilValue } from "recoil"


const Sell = ({sellLand, propId, propPrice}) => {
    const handleSale = (e) => {
        e.preventDefault()
        sellLand(propId, propPrice)
    }

    return (
        <div className="bg-red-600 text-black font-bold px-4 py-2 rounded-md hover:cursor-pointer" onClick={handleSale}>
            Sell
        </div>
    )
}

const Listing = ({account, buyLand, sellLand}) => {

    const properties = useRecoilValue(propertyAtom)
    const [loading, setLoading] = useState(false);

 
    return (
        <div>
            <div className="py-14 tracking-wide">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-white">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="bg-black text-xs text-[#aaeec4] uppercase dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Land Registry Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Size
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Land Owner Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price (kshs)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  
                                </th>
                               
                            </tr>
                        </thead>
                        <tbody >
                            {properties.map((property, index) => (
                                <tr key={property.id} className="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {property.lr_no}
                                    </th>
                                    <td className="px-6 py-4">
                                        {property.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {property.location}
                                    </td>
                                    <td className="px-6 py-4">
                                        {property._addr}
                                    </td>
                                    <td className="px-6 py-4">
                                        {property.price.toString()} 
                                    </td>
                                    {
                                        !property.sold && account !== property._addr ? (
                                            <td className="px-6 py-4">
                                                <button className="bg-black w-full text-white font-bold px-4 py-2 rounded-md hover:cursor-pointer"
                                                        onClick={(e) => {
                                                            setLoading(true)
                                                            buyLand(property.id, property.price)
                                                            setTimeout(() => {
                                                                setLoading(false);
                                                            }, 2000);
                                                        }
                                                        }                                
                                                        >{loading ? "Loading..." : "Buy"}
                                                </button>
                                            </td>
                                        ) : (
                                            <td className="px-6 py-4 text-red-400">
                                                {account === property._addr ? "You own this property" : "Sold"}
                                            </td>
                                        )
                                   
                                    }
                                 

                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Listing