
import { HomeIcon } from '@heroicons/react/24/solid' 
import Link from 'next/link'


const Navbar = ({account}) => {
  
    return (
        <div className="flex justify-between items-center px-5 py-5  text-white font-semibold rounded m-6">
           
           {/* <div className="text-black">ETH Acc: <span className="">{account}</span></div> */}
            <div> 
                <Link href='/'>
                    <HomeIcon className="h-8 w-8 text-black hover:cursor-pointer"/>
                </Link>
            </div>
     
           <div >
                <div className='flex flex-row gap-x-10'>
                    {/* <Link href='/listing'><div className="transition ease-in-out delay-150 text-[#aaeec4] border border-black p-4 bg-black rounded font-bold hover:cursor-pointer">Current Listing</div></Link> */}
                    <Link href='/transactions'><div className="transition ease-in-out delay-150 text-[#aaeec4] border border-black p-4 bg-black rounded  font-bold hover:cursor-pointer">Transaction History</div></Link>
                </div>
                
           </div>
        </div>
    )
}

export default Navbar