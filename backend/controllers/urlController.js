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

    if (!url) return res.status(404).json({ error: 'Short URL not found' });

    url.clicks++;
    await url.save();

    res.json({ originalUrl: url.originalUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve original URL' });
  }
};

exports.updateShortUrl = async (req, res) => {
  const { newShortUrl } = req.body;

  try {
    const url = await Url.findOneAndUpdate(
      { shortUrl: req.params.shortUrl },
      { shortUrl: newShortUrl },
      { new: true }
    );

    if (!url) return res.status(404).json({ error: 'URL not found' });

    res.json(url);
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

    if (!url) return res.status(404).json({ error: 'URL not found' });

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
};
