const Customer = require('../models/Customer');

async function getAllCustomer(req, res) {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function addCustomer(req, res) {
  const { customerFullName, customerBalance } = req.body;

  // Validasyon
  if (
    !customerFullName?.trim() ||
    customerBalance === undefined ||
    isNaN(customerBalance) ||
    Number(customerBalance) < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Veriler hatalı veya bakiye negatif olamaz"
    });
  }

  try {
    const newCustomer = new Customer({
      customerFullName: customerFullName.trim(),
      customerBalance: Number(customerBalance)
    });

    await newCustomer.save();

    res.status(201).json({
      success: true,
      message: "Kullanıcı Ekleme Başarılı",
      data: newCustomer
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updateCustomer(req, res) {
  const id = req.params.id;
  const { customerFullName, customerBalance } = req.body;

  try {
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ success: false, message: "ID bulunamadı" });

    if (customerFullName?.trim()) customer.customerFullName = customerFullName.trim();
    if (customerBalance !== undefined) {
      if (isNaN(customerBalance) || Number(customerBalance) < 0) {
        return res.status(400).json({
          success: false,
          message: "Bakiye negatif olamaz"
        });
      }
      customer.customerBalance = Number(customerBalance);
    }

    await customer.save();
    res.json({ success: true, data: customer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteCustomer(req, res) {
  const id = req.params.id;

  try {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) return res.status(404).json({ message: "ID is not found" });

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
