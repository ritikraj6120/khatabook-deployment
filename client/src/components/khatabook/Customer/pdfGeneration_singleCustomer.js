import jsPDF from "jspdf";
import "jspdf-autotable";


// define a generatePDF function that accepts a customers argument
const generatePDF = (singleCustomer, SingleCustomerTransaction) => {
	// initialize jsPDF
	const doc = new jsPDF();

	// define the columns we want and their titles
	const tableColumn = ["Date", "Debit(-)", "Credit(+)"];
	// define an empty array of rows
	const tableRows = [];

	const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

	const formatdate = (d) => {
		d = new Date(d);
		let localdate = d.toLocaleTimeString("en-IN");
		if (localdate.length < 11)
			localdate = "0" + localdate
		let x = localdate.substr(0, 5);
		let y = localdate.substr(9, 2).toUpperCase();
		return d.getDate() + ' ' + month[d.getMonth()] + ('' + d.getFullYear()).slice(2) + ' ' + x + ' ' + y;
	}

	// for each customer pass all its data into an array
	for (let i = 0; i < SingleCustomerTransaction.length; i++) {
		const customerData = [];
		customerData.push(formatdate(SingleCustomerTransaction[i].date));
		if (SingleCustomerTransaction[i].lendamount_singleCustomer > 0)
			customerData.push(SingleCustomerTransaction[i].lendamount_singleCustomer);
		else
			customerData.push(null);
		if (SingleCustomerTransaction[i].takeamount_singleCustomer > 0)
			customerData.push(SingleCustomerTransaction[i].takeamount_singleCustomer);
		else
			customerData.push(null);
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
	doc.autoTable(tableColumn, tableRows, { startY: 35 });
	const date = Date().split(" ");
	// we use a date string to generate our filename.
	const dateStr = date[2] + "." + date[1] + "." + date[3];
	// customer name and margin-left + margin-top
	doc.text(` ${singleCustomer.name} Statement`, 68, 15);
	doc.setFontSize(12);
	doc.setFont('Times','normal');
	doc.text(`Phone Number: ${singleCustomer.phone}`, 70, 22)
	doc.text(`(As of Today - ${date[2]} ${date[1]} ${date[3]})`, 70, 29);
	// we define the name of our PDF file.
	doc.save(`khatabook-Customer-transactions-${dateStr}.pdf`);
};

export default generatePDF;