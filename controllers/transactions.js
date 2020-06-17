const Transactions = require("../models/Transaction");

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transaction = await Transactions.find();

    return res.status(200).json({
      success: true,
      count: transaction.length,
      data: transaction,
    });
  } catch (err) {
    return res.send(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Add transactions
// @route POST /api/v1/transactions
// @access Public
exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transactions.create(req.body);

    return res.status(201).json({
      succes: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        succes: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        succes: false,
        error: "Server Error",
      });
    }
  }
};

// @desc Delete transactions
// @route   DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transactions.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      error: "Server Error",
    });
  }
};
