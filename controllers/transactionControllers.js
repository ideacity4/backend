const Transaction = require('../models/transaction');

exports.createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({ error: "Failed to create transaction" });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.status(200).json(transaction);
    } catch (err) {
        res.status(404).json({ error: "Transaction not found" });
    }
};