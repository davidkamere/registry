
import { propertyAtom } from "@/recoil/atoms/propertyAtom"
import { useRecoilValue } from "recoil"

const Listing = () => {

    const properties = useRecoilValue(propertyAtom)

    return (
        <div>
            <div className="px-10 py-14 tracking-wide">
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
                                    Buy
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sell
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {properties.map((property, index) => (
                                <tr class="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {property.lr_no}
                                    </th>
                                    <td class="px-6 py-4">
                                        {property.size}
                                    </td>
                                    <td class="px-6 py-4">
                                        {property.location}
                                    </td>
                                    <td class="px-6 py-4">
                                        {property._addr}
                                    </td>
                                    <td class="px-6 py-4">
                                        {property.price.toString()} 
                                    </td>
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