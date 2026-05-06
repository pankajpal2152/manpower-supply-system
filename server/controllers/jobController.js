const { Job, Document } = require('../models');
const { sequelize } = require('../config/database');

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            where: { isActive: true },
            include: [{ model: Document, as: 'documents', required: false, where: { documentType: 'Job Logo' } }],
            order: [['createdAt', 'DESC']]
        });

        const flattenedJobs = jobs.map(job => {
            const plainJob = job.get({ plain: true });
            let ProfilePictureBase64 = '';
            if (plainJob.documents && plainJob.documents.length > 0) {
                ProfilePictureBase64 = plainJob.documents[0].documentData;
            }
            const { documents, ...coreJob } = plainJob;
            return { ...coreJob, ProfilePictureBase64 };
        });

        res.status(200).json(flattenedJobs);
    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
};

exports.createJob = async (req, res) => {
    try {
        const data = req.body;
        const newJob = await Job.create(data);
        const generatedAcctId = `JOB${String(newJob.id).padStart(4, '0')}`; // E.g., JOB0001

        let docName = null;
        if (data.ProfilePictureBase64 && data.ProfilePictureBase64.startsWith('data:image')) {
            docName = `JOB_${newJob.id}_${data.AccountName}_Logo`;
            await Document.create({
                documentName: docName,
                documentType: 'Job Logo',
                documentData: data.ProfilePictureBase64,
                jobId: newJob.id
            });
        }

        await newJob.update({ AcctId: generatedAcctId, ProfilePicture: docName });
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Create Error:', error);
        res.status(500).json({ message: 'Error creating job', error: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id, 10);
        const data = req.body;

        if (data.ProfilePictureBase64 !== undefined) {
            if (data.ProfilePictureBase64 === '') {
                await Document.destroy({ where: { jobId: jobId, documentType: 'Job Logo' } });
                data.ProfilePicture = null;
            } else if (data.ProfilePictureBase64.startsWith('data:image')) {
                const docName = `JOB_${jobId}_${data.AccountName}_Logo`;
                const existingDoc = await Document.findOne({ where: { jobId: jobId, documentType: 'Job Logo' } });
                if (existingDoc) {
                    await existingDoc.update({ documentData: data.ProfilePictureBase64, documentName: docName });
                } else {
                    await Document.create({ documentName: docName, documentType: 'Job Logo', documentData: data.ProfilePictureBase64, jobId: jobId });
                }
                data.ProfilePicture = docName;
            }
        }

        delete data.AcctId;
        await Job.update(data, { where: { id: jobId } });

        res.status(200).json({ message: 'Job updated successfully' });
    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).json({ message: 'Error updating job', error: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id, 10);
        await Job.update({ isActive: false }, { where: { id: jobId } });
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job', error: error.message });
    }
};

// Reuse dynamic states API
exports.getStates = async (req, res) => {
    try {
        const [results] = await sequelize.query('SELECT StateId, StateName FROM stateinfo WHERE IsActive = 1');
        res.status(200).json(results);
    } catch (error) { res.status(500).json({ message: 'Error fetching states' }); }
};

exports.getDistricts = async (req, res) => {
    try {
        const stateId = req.params.stateId;
        const [results] = await sequelize.query('SELECT DistId, DistName FROM distinfo WHERE StateId = ? AND IsActiv = 1', { replacements: [stateId] });
        res.status(200).json(results);
    } catch (error) { res.status(500).json({ message: 'Error fetching districts' }); }
};