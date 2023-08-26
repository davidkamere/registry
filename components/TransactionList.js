

import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const TransactionList = ({transactions, account}) => {

    const properties = transactions


    // convert unix to time
    const convertToTime = (unixTimestamp) => {
        // Convert Unix timestamp to milliseconds
        const timestampInMilliseconds = Number(unixTimestamp) * 1000;

        // Create a Date object using the timestamp in milliseconds
        const dateObject = new Date(timestampInMilliseconds);

        // Extract date and time components
        const time = dateObject.toTimeString();

        return time
    }

    // convert unix to date
    const convertToDate = (unixTimestamp) => {
        // Convert Unix timestamp to milliseconds
        const timestampInMilliseconds = Number(unixTimestamp) * 1000;

        // Create a Date object using the timestamp in milliseconds
        const dateObject = new Date(timestampInMilliseconds);

        // Extract date and time components
        const date = dateObject.toDateString();
   
        return date
    }

    const downloadAsPDF = async () => {
        const pdf = new jsPDF("p", "pt", "letter");
        
        const table = document.querySelector(".transaction-table");
        
        const canvas = await html2canvas(table);
        const imgData = canvas.toDataURL("image/jpeg"); // Using JPEG for better compression
        const imgWidth = 610; // A4 page width in mm (approximately)
        const pageHeight = imgWidth * 1.414; // A4 page height in mm (aspect ratio)
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let position = 0;
        
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        position -= pageHeight;
        
        while (position > -canvas.height) {
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          position -= pageHeight;
        }
        
        pdf.save("transaction_list.pdf");
    };

    return (
        <div className="p-5">
            <div className=" py-14 tracking-wide">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-white">
                    <table className="transaction-table w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="bg-black text-xs text-[#aaeec4] uppercase dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Transaction Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction(From Address)
                                </th>
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
                                    Price
                                </th>
                                
                               
                                
                               
                            </tr>
                        </thead>
                        <tbody >
                            {properties.map((property, index) => (
                                <tr key={property.id} className="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {convertToDate(property.timestamp) }
                                    </td>
                                    <td className="px-6 py-4">
                                        {convertToTime(property.timestamp)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {property._addr}
                                    </td>
                                    <th  className="px-6 py-4">
                                        {property.lr_no}
                                    </th>
                                    <td className="px-6 py-4">
                                        {property.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {property.location}
                                    </td>
                                    <td className="px-6 py-4">
                                        {property.price.toString()} 
                                    </td>
                                
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                </div>
            </div>
            {/* Download as PDF */}
            <div className="flex justify-center">
                <button className="bg-red-500 text-white px-4 py-3 rounded-md hover:cursor-pointer" onClick={downloadAsPDF}>Download as PDF</button>
            </div>
        </div>
    )
}

export default TransactionList