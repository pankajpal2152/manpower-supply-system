const { Client, Document } = require('../models');
const { sequelize } = require('../config/database'); 

// Fetch ONLY active clients AND Logo Document
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: { isActive: true },
      include: [
        { model: Document, as: 'documents', required: false, where: { documentType: 'Client Logo' } }
      ],
      order: [['createdAt', 'DESC']]
    });

    const flattenedClients = clients.map(client => {
      const plainClient = client.get({ plain: true });
      
      let ProfilePictureBase64 = '';
      if (plainClient.documents && plainClient.documents.length > 0) {
          ProfilePictureBase64 = plainClient.documents[0].documentData;
      }

      const { documents, ...coreClient } = plainClient;
      return { ...coreClient, ProfilePictureBase64 };
    });

    res.status(200).json(flattenedClients);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching clients', error: error.message });
  }
};

// Create a new client with an Auto-Generated Client ID
exports.createClient = async (req, res) => {
  try {
    const data = req.body;
    const newClient = await Client.create(data);
    const generatedAcctId = `${String(newClient.id).padStart(1, '0')}`;
    
    // Handle Logo Storage
    let docName = null;
    if (data.ProfilePictureBase64 && data.ProfilePictureBase64.startsWith('data:image')) {
      docName = `CLI_${newClient.id}_${data.AccountName}_Logo`;
      
      await Document.create({
        documentName: docName,
        documentType: 'Client Logo',
        documentData: data.ProfilePictureBase64,
        clientId: newClient.id
      });
    }

    await newClient.update({ AcctId: generatedAcctId, ProfilePicture: docName });
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ message: 'Error creating client', error: error.message });
  }
};

// Update a client
exports.updateClient = async (req, res) => {
  try {
    const clientId = parseInt(req.params.id, 10);
    const data = req.body;

    // Handle Logo Updates/Deletions
    if (data.ProfilePictureBase64 !== undefined) {
      if (data.ProfilePictureBase64 === '') {
        await Document.destroy({ where: { clientId: clientId, documentType: 'Client Logo' } });
        data.ProfilePicture = null;
      } else if (data.ProfilePictureBase64.startsWith('data:image')) {
        const docName = `CLI_${clientId}_${data.AccountName}_Logo`;
        
        const existingDoc = await Document.findOne({ where: { clientId: clientId, documentType: 'Client Logo' }});
        if (existingDoc) {
            await existingDoc.update({ documentData: data.ProfilePictureBase64, documentName: docName });
        } else {
            await Document.create({ documentName: docName, documentType: 'Client Logo', documentData: data.ProfilePictureBase64, clientId: clientId });
        }
        data.ProfilePicture = docName;
      }
    }

    delete data.AcctId; // Protect ID
    await Client.update(data, { where: { id: clientId } });
    
    res.status(200).json({ message: 'Client updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Error updating client', error: error.message });
  }
};

// Soft Delete
exports.deleteClient = async (req, res) => {
  try {
    const clientId = parseInt(req.params.id, 10);
    await Client.update({ isActive: false }, { where: { id: clientId } });
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
};

// ==========================================
// DYNAMIC DROPDOWNS API
// ==========================================
exports.getStates = async (req, res) => {
  try {
      const [results] = await sequelize.query('SELECT StateId, StateName FROM stateinfo WHERE IsActive = 1');
      res.status(200).json(results);
  } catch (error) {
      console.error('Fetch States Error:', error);
      res.status(500).json({ message: 'Error fetching states', error: error.message });
  }
};

exports.getDistricts = async (req, res) => {
  try {
      const stateId = req.params.stateId;
      const [results] = await sequelize.query('SELECT DistId, DistName FROM distinfo WHERE StateId = ? AND IsActiv = 1', {
          replacements: [stateId]
      });
      res.status(200).json(results);
  } catch (error) {
      console.error('Fetch Districts Error:', error);
      res.status(500).json({ message: 'Error fetching districts', error: error.message });
  }
};