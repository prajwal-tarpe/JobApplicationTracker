const { addJob, fetchJobs, deleteJob, editJob, jobSummary, deleteAllJobs } = require('../Controllers/JobController');

const router = require('express').Router();

router.post('/',addJob);
router.get('/',fetchJobs);
router.get('/stats',jobSummary);
router.delete('/deleteAll',deleteAllJobs);
router.delete('/:jobId',deleteJob);
router.put('/:jobId',editJob);

module.exports = router;