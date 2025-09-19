const express = require('express');
const router = express.Router();
const {
  getAllCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

router.get('/', getAllCustomer);
router.post('/addcustomer', addCustomer);
router.put('/updatecustomer/:id', updateCustomer);
router.delete('/deletecustomer/:id', deleteCustomer);

module.exports = router;
