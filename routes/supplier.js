const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Suppliers = require('../models/Suppliers');
const SupplierTransactions = require('../models/SupplierTransactions')
const SupplierNetBalance = require('../models/SupplierNetBalance');
const { body, validationResult } = require('express-validator');

// Route 0" Get single suppliers using : GET "/api/supplier/getSingleSupplier". login required
router.get('/getSingleSupplierTransactions/:id', fetchuser, async (req, res) => {
	try {

		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		const getSingleSupplier = await SupplierTransactions.find({ supplier: req.params.id });
		res.status(200).json(getSingleSupplier);

	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})



// ROUTE 1: Get All the Suppliers using: GET "/api/supplier/getsuppliers". Login required
router.get('/getsuppliers', fetchuser, async (req, res) => {
	try {
		const suppliers = await Suppliers.find({ user: req.user.id }).select('-user -date');
		res.json(suppliers)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE 2: Add a new Supplier using: GET "/api/supplier/addsuppliers". Login required

router.post('/addsupplier', fetchuser, async (req, res) => {
	try {
		const { name, phone } = req.body;
		// If there are errors, return Bad request and the errors
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ errors: errors.array() });
		// }
		const supplier = new Suppliers({
			name, phone, user: req.user.id
		})
		const rep = await Suppliers.findOne({ phone });
		if (!rep) {
			const savedsupplier = await supplier.save()
			res.status(200).json(savedsupplier)
		}
		else {
			res.status(409).json({ "danger": "supplier already exist" })
		}

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE 3: Update an existing supplier using: PUT "/api/supplier/updatesupplier". Login required

router.put('/updatesupplier/:id', fetchuser, async (req, res) => {
	const { name, phone } = req.body;
	try {
		// Create a newsupplier object
		const newsupplier = {};
		if (name) { newsupplier.name = name };
		if (phone) { newsupplier.phone = phone };

		// Find the supplier to be updated and update it
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		const rep = await Suppliers.findOne({ phone });
		console.log(rep)
		if (rep) {
			console.log("no")
			return res.status(409).json({ "danger": "Supplier with that Phone number  already exist" })
		}
		console.log("hi ram ram ram ram ram ram ram")
		const updatesupplier = await Suppliers.findByIdAndUpdate(req.params.id, { $set: newsupplier }, { new: true })
		res.status(200).json(updatesupplier);
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})



// ROUTE 4: Delete an existing Note using: DELETE "/api/supplier/deletesuppliers". Login required
router.delete('/deletesupplier/:id', fetchuser, async (req, res) => {
	try {
		let id = req.params.id;
		// Find the supplier to be delete and delete it
		let supplier = await Suppliers.findById(id);
		if (!supplier) { return res.status(404).send("Not Found") }

		// Allow deletion only if user owns this supplier
		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		let deletedsupplier = await Suppliers.findByIdAndDelete(id);
		await SupplierTransactions.deleteMany({ supplier: id });
		await SupplierNetBalance.deleteMany({ supplier: id });
		res.json({ "Success": "supplier has been deleted", supplier: deletedsupplier });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// Route 5 Get single supplier using : get "/api/supplier/getSinglesupplier". login required
router.get('/getSingleSupplierDetail/:id', fetchuser, async (req, res) => {
	try {
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		const getSingleSupplier = supplier;
		res.status(200).json(getSingleSupplier);

	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// Route 6:fetch transaction  using: get "/api/supplier/getSupplierTransactions/". Login required
router.get('/getsupplierTransactions/:id', fetchuser, async (req, res) => {
	try {
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not much Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		let supplierTransactions = await SupplierTransactions.find({ supplier: req.params.id });
		return res.status(200).json(supplierTransactions);

	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// Route 7:add a transaction  using: post "/api/supplier/addSupplierTransaction/". Login required
router.post('/addSupplierTransaction/:id', fetchuser, async (req, res) => {
	try {

		let supplier = await Suppliers.findById(req.params.id);

		if (!supplier) { return res.status(404).send("Supplier Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}


		console.log(req.body)
		const { purchase_singleSupplier, payment_singleSupplier, billDetails, billNo, date } = req.body;

		//////////////////////////////////////////hello
		try {

			let purchase = 0, payment = 0;
			payment += payment_singleSupplier;
			purchase += purchase_singleSupplier;

			const newSupplierNetBalance = new SupplierNetBalance({
				user: req.user.id, purchase, payment, supplier: req.params.id
			})
			const rep = await SupplierNetBalance.findOne({ supplier: req.params.id });
			if (!rep) {
				let doc = await newSupplierNetBalance.save();
			}
			else {
				let ans = await SupplierNetBalance.findOne({ supplier: req.params.id });
				purchase += ans.purchase;
				payment += ans.payment;
				// console.log(purchase);
				// console.log(payment);
				let doc = await SupplierNetBalance.findOneAndUpdate({ supplier: req.params.id }, { $set: { purchase: purchase, payment: payment } }, { new: true });
			}
		}
		catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
		///////////////////////////////////////////////////////////////////////////
		let newtransaction = {
			payment_singleSupplier: payment_singleSupplier,
			purchase_singleSupplier: purchase_singleSupplier
		};
		if (billNo !== null)
			newtransaction.billNo = billNo;
		if (billDetails !== null)
			newtransaction.billDetails = billDetails;
		let newSuppliertransaction = new SupplierTransactions({
			...newtransaction, supplier: req.params.id, date: date
		})

		try {
			let doc = await newSuppliertransaction.save();
			res.status(200).json(doc);

		}
		catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// // ROUTE 8: Update an existing supplierTransaction  using: PUT "/api/supplier/updatetransactions". Login required

router.put('/updateSupplierTransaction/:id', fetchuser, async (req, res) => {
	const { purchase_singleSupplier, payment_singleSupplier, billdetails, billNo, date } = req.body;
	try {
		// Create a newNote object
		const newSupplierTransaction = {};
		// console.log(req.body)
		if (purchase_singleSupplier) { newSupplierTransaction.purchase_singleSupplier = purchase_singleSupplier };
		if (payment_singleSupplier) { newSupplierTransaction.payment_singleSupplier = payment_singleSupplier };
		if (billdetails) { newSupplierTransaction.billdetails = billdetails };
		if (billNo) { newSupplierTransaction.billNo = billNo };
		if (date) { newSupplierTransaction.date = date };
		// console.log("hi")
		let currSupplierTransaction = await SupplierTransactions.findById(req.params.id);
		const supltoken = req.header('supplier-token');
		// console.log("supply token is")
		// console.log(supltoken)
		// console.log("here")
		let currSupplierBalance = await SupplierNetBalance.findOne({ supplier: supltoken });

		if (payment_singleSupplier > 0) {
			// console.log("mai mai")
			// console.log(currSupplierBalance)
			let res = currSupplierBalance.payment;
			// console.log("lo lo");
			res -= currSupplierTransaction.payment_singleSupplier;
			res += payment_singleSupplier;
			res = parseInt(res);
			try {
				await SupplierNetBalance.findOneAndUpdate({ supplier: supltoken }, { $set: { payment: res } }, { new: true });
			}
			catch (err) {
				console.log(err);
			}
		}
		else {
			let res = currSupplierBalance.purchase;
			res -= currSupplierTransaction.purchase_singleSupplier;
			res += purchase_singleSupplier;
			res = parseInt(res);
			try {
				await SupplierNetBalance.findOneAndUpdate({ supplier: supltoken }, { $set: { purchase: res } }, { new: true });
			}
			catch (err) {
				console.log(err);
			}

		}

		const updateSupplierTransaction = await SupplierTransactions.findByIdAndUpdate(req.params.id, { $set: newSupplierTransaction }, { new: true })
		res.status(200).json(updateSupplierTransaction);
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})
// Route 9 fetch balance of each supplier

router.get('/getSupplierBalance', fetchuser, async (req, res) => {
	try {
		let doc = await SupplierNetBalance.find({ user: req.user.id });
		return res.status(200).json(doc);
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

module.exports = router
