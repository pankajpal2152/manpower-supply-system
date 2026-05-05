const { Client } = require('../models');

// Fetch ONLY active clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching clients', error: error.message });
  }
};

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ message: 'Error creating client', error: error.message });
  }
};

// Update an existing client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    await Client.update(req.body, { where: { id } });
    res.status(200).json({ message: 'Client updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Error updating client', error: error.message });
  }
};

// Soft Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await Client.update({ isActive: false }, { where: { id } });
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
};