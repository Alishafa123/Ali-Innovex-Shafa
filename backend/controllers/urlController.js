const Url = require('../models/Url');
const shortid = require('shortid');

exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  try {
    const newUrl = await Url.create({ originalUrl, shortUrl });
    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create short URL' });
  }
};

exports.getOriginalUrl = async (req, res) => {
    try {
      const url = await Url.findOne({ shortUrl: req.params.shortUrl });
  
      if (!url) {
        return res.status(404).json({
          success: false,
          error: 'Short URL not found',
        });
      }
  
      url.clicks++;
      await url.save();
  
      res.json({
        success: true,
        originalUrl: url.originalUrl,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve original URL',
      });
    }
  };
  



exports.updateShortUrl = async (req, res) => {
  const currentShortUrl = req.params.shortUrl;

  try {
    // Check if the current short URL exists
    const existingUrl = await Url.findOne({ shortUrl: currentShortUrl });

    if (!existingUrl) {
      return res.status(404).json({ error: 'Short URL does not exist' });
    }

    // Generate a new short URL
    const newShortUrl = shortid.generate();

    // Update and save the new short URL
    existingUrl.shortUrl = newShortUrl;
    await existingUrl.save();

    res.json({
      message: 'Short URL updated successfully',
      newShortUrl: newShortUrl,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update short URL' });
  }
};



exports.deleteShortUrl = async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({ shortUrl: req.params.shortUrl });

    if (!url) return res.status(404).json({ error: 'URL not found' });

    res.json({ message: 'Short URL deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete short URL' });
  }
};

exports.getStats = async (req, res) => {
    try {
      const url = await Url.findOne({ shortUrl: req.params.shortUrl });
  
      if (!url) {
        return res.status(404).json({
          success: false,
          error: 'URL not found',
        });
      }
  
      res.json({
        success: true,
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        clicks: url.clicks,
        createdAt: url.createdAt,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: 'Failed to get stats',
      });
    }
  };
  
