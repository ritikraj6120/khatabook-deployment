import jsPDF from "jspdf";
import "jspdf-autotable";


// define a generatePDF function that accepts a customers argument
const generatePDF = (singleSupplier, SingleSupplierTransaction) => {
	// initialize jsPDF
	const doc = new jsPDF();

	// define the columns we want and their titles
	const tableColumn = ["Date", "Purchase", "Payment"];
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
	for (let i = 0; i < SingleSupplierTransaction.length; i++) {
		const supplierData = [];
		supplierData.push(formatdate(SingleSupplierTransaction[i].date));
		if (SingleSupplierTransaction[i].purchase_singleSupplier > 0)
			supplierData.push(SingleSupplierTransaction[i].purchase_singleSupplier);
		else
			supplierData.push(null);
		if (SingleSupplierTransaction[i].payment_singleSupplier > 0)
			supplierData.push(SingleSupplierTransaction[i].payment_singleSupplier);
		else
			supplierData.push(null);
		//   customers.forEach(customer => { 
		//     const customerData = [
		//       customer.title,
		//       customer.name,
		//       customer.lendamount,
		// 	  customer.takeamount
		//     ];
		// push each tickcet's info into a row
		tableRows.push(supplierData);
	};


	// startY is basically margin-top
	doc.autoTable(tableColumn, tableRows, { startY: 35, theme: 'grid' });
	const date = Date().split(" ");
	// we use a date string to generate our filename.
	const dateStr = date[2] + "." + date[1] + "." + date[3];
	// customer name and margin-left + margin-top
	doc.text(` ${singleSupplier.name} Statement`, 68, 15);
	doc.setFontSize(12);
	doc.setFont('Times', 'normal');
	doc.text(`Phone Number: ${singleSupplier.phone}`, 70, 22)
	doc.text(`(As of Today - ${date[2]} ${date[1]} ${date[3]})`, 70, 29);
	// we define the name of our PDF file.
	// PAGE NUMBERING
	// Add Page number at bottom-right
	// Get the number of pages
	const pageCount = doc.internal.getNumberOfPages();

	// For each page, print the page number and the total pages
	for (var i = 1; i <= pageCount; i++) {
		// Go to page i
		doc.setPage(i);
		//Print Page 1 of 4 for example
		doc.text('Page ' + String(i) + ' of ' + String(pageCount), 210 - 20, 297 - 30, null, null, "right");
	}
	doc.save(`khatabook-Supplier-transactions-${dateStr}.pdf`);
};

export default generatePDF;