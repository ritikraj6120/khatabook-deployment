# Khatabook

Using Khatabook general users and specially shopkeepers can use Khatabook to maintain their transactions records related to their customers and suppliers

## Live
https://khatabook-app6120.herokuapp.com/

# Features
  - A web app for shopkeepers storing their money transactions regarding their customers and suppliers
  - Users can add,update and delete thier customers/suppliers details
  - Users can add,update and delete thier transactions.
## Customers Section 
  1. Users can see their Net balance in Rupees
  2. Users can see how much they will get or how much they will have to  give to their customers/individual customers.
  3. Users can see tansactions related to individual customers and can also download individual reports.
  4. Users can download reports of their transactions realted to customers and individual customers in pdf format.
  5. Users can send notification to customers if they have not given the money to user(loan, debt, credit, money payable) through whatsapp api.

## Suppliers Section
  1. Users can see their Total Purchase in Rupees.
  2. User can see how much they have paid in Advance or how much they will Give.
  3. Users can see how much they have paid in Advance or how much they will Give for individual suppliers.
  4. Users can download reports of their transactions realted to suppliers and individual suppliers in pdf format.

## Notes Section
  1. Users can add,delete and edit their notes.
  2. Users can mark notes as important/Completed.

# Run Locally
Clone the project
```
git clone https://github.com/ritikraj6120/khatabook-deployment
```
```
cd khatabook-deployment
```
Install dependencies
```
npm install
```
Change directory to client
```
cd client
```
Install dependencies
```
npm install
```
Start server in main folder
```
node app.js
```
Start client in client folder
```
cd client
npm run start
```
your application will start on port 3000.

## Environment Variables
To run this project, you will need to add your mongodb config of databse like this to your .env file and secret key for jwt

`JWT_SECRET=`

`MONGO_URI=`
## Tech Stack
**React** for frontend

**Node.js,mongoDB** for backend

## Authors
- [@Ritik Raj](https://github.com/ritikraj6120)



 

