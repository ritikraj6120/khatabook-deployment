import jsPDF from "jspdf";
import "jspdf-autotable";


// define a generatePDF function that accepts a customers argument
const generatePDF = (customers, customerBalance) => {
	// initialize jsPDF
	const doc = new jsPDF();

	// define the columns we want and their titles
	const tableColumn = ["ID","Title", "Name", "Phone", "You'll Get", "You'll Give"];
	// define an empty array of rows
	const tableRows = [];

	// for each customer pass all its data into an array
	for (let i = 0; i < customers.length; i++) {
		const customerData = [];
		customerData.push(i+1);
		customerData.push(customers[i].title);
		customerData.push(customers[i].name);
		customerData.push(customers[i].phone);
		const result = customerBalance.filter(item => item.customer === customers[i]._id);
		if (result.length === 0) {
			customerData.push(0);
			customerData.push(0);
		}
		else {
			let x = 0;
			x = result[0].amounttoget - result[0].amounttogive;
			if (x >= 0) {
				customerData.push(x);
				customerData.push(0);
			}
			else {
				customerData.push(0);
				customerData.push(-x);

			}
		}



		//   customers.forEach(customer => { 
		//     const customerData = [
		//       customer.title,
		//       customer.name,
		//       customer.lendamount,
		// 	  customer.takeamount
		//     ];
		// push each tickcet's info into a row
		tableRows.push(customerData);
	};


	// startY is basically margin-top
	doc.autoTable(tableColumn, tableRows, { startY: 26 });
	const date = Date().split(" ");
	// we use a date string to generate our filename.
	const dateStr = date[1] + "_" + date[2] + "_" + date[3];
	// customer title. and margin-top + margin-left
	doc.text("Customers list Report", 70, 15);
	doc.setFontSize(12);
	doc.setFont('normal',);
	doc.text(`(As of Today - ${date[2]} ${date[1]} ${date[3]})`,70,22);
	// we define the name of our PDF file.
	doc.save(`Customer_report_${dateStr}.pdf`);
};

export default generatePDF;