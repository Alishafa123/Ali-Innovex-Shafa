const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getStats
} = require('../controllers/urlController');

router.post('/', createShortUrl);
router.get('/:shortUrl', getOriginalUrl);
router.put('/:shortUrl', updateShortUrl);
router.delete('/:shortUrl', deleteShortUrl);
router.get('/:shortUrl/stats', getStats);

module.exports = router;
