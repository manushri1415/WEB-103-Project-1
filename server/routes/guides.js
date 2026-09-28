const express = require('express');
const GuidesController = require('../controllers/guides');

const router = express.Router();

router.get('/', GuidesController.getGuides);
router.get('/:slug', GuidesController.getGuideBySlug);

module.exports = router;
