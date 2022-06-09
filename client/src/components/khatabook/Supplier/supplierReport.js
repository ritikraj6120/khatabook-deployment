import jsPDF from "jspdf";
import "jspdf-autotable";


// define a generatePDF function that accepts a suppliers argument
const generatePDF = (suppliers,supplierBalance) => {
	// initialize jsPDF
	const doc = new jsPDF();

	// define the columns we want and their titles
	const tableColumn = ["Title", "Name","Phone", "You'll Give", "Advance"];
	// define an empty array of rows
	const tableRows = [];

	// for each ticket pass all its data into an array

	// for each customer pass all its data into an array
	for (let i = 0; i < suppliers.length; i++) {
		const supplierData = [];
		supplierData.push(suppliers[i].title);
		supplierData.push(suppliers[i].name);
		supplierData.push(suppliers[i].phone);
		let remaining = supplierBalance[i].purchase - supplierBalance[i].payment
		if (remaining > 0) {
			supplierData.push(remaining);
			supplierData.push(0);
		}
		else if(remaining < 0) {
			supplierData.push(0);
			supplierData.push(-remaining);
		}
		else{
			supplierData.push(0);
			supplierData.push(0);
		}


		//   suppliers.forEach(customer => { 
		//     const SupplierData = [
		//       customer.title,
		//       customer.name,
		//       customer.payment,
		// 	  customer.purchase
		//     ];
		// push each tickcet's info into a row
		tableRows.push(supplierData);
		// };

		// suppliers.forEach(ticket => {
		// 	const ticketData = [
		// 		ticket.title,
		// 		ticket.name,
		// 		ticket.amount,
		// 	];
		// 	// push each tickcet's info into a row
		// 	tableRows.push(ticketData);
	};


	// startY is basically margin-top
	doc.autoTable(tableColumn, tableRows, { startY: 20 });
	const date = Date().split(" ");
	// we use a date string to generate our filename.
	const dateStr = date[1] + "_" + date[2] + "_" + date[3];
	// ticket title. and margin-top + margin-left
	doc.text("Suppliers List Report ", 70, 15);
	// we define the name of our PDF file.
	doc.save(`Supplier_report_${dateStr}.pdf`);
};

export default generatePDF;