
const request = require('supertest');
const app = require('../app'); // your Express app
const Url = require('../models/Url');
const shortid = require('shortid');

// Mock DB model
jest.mock('../models/Url');

describe('URL Shortener API', () => {

  const mockUrl = {
    originalUrl: 'https://www.google.com',
    shortUrl: 'abc123',
    clicks: 5,
    createdAt: new Date(),
    save: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  // CREATE
  // it('should create a short URL', async () => {
  //   Url.create.mockResolvedValue(mockUrl);

  //   const res = await request(app)
  //     .post('/shortens')
  //     .send({ originalUrl: mockUrl.originalUrl });

  //   expect(res.statusCode).toBe(201);
  //   expect(res.body).toHaveProperty('shortUrl');
  // });

  // RETRIEVE ORIGINAL URL
  it('should retrieve original URL from short URL', async () => {
    Url.findOne.mockResolvedValue(mockUrl);

    const res = await request(app).get(`/shortens/${mockUrl.shortUrl}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      originalUrl: mockUrl.originalUrl
    });
  });

  it('should return 404 if short URL not found', async () => {
    Url.findOne.mockResolvedValue(null);

    const res = await request(app).get('/shortens/notfound123');

    expect(res.statusCode).toBe(404);
  });

  // UPDATE
  it('should update a short URL', async () => {
    Url.findOne.mockResolvedValue(mockUrl);
    mockUrl.save.mockResolvedValue(); // fake save

    const res = await request(app).put(`/shortens/${mockUrl.shortUrl}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('newShortUrl');
  });

  it('should return 404 if short URL to update does not exist', async () => {
    Url.findOne.mockResolvedValue(null);

    const res = await request(app).put('/shortens/invalid');

    expect(res.statusCode).toBe(404);
  });

  // DELETE
  it('should delete a short URL', async () => {
    Url.findOneAndDelete.mockResolvedValue(mockUrl);

    const res = await request(app).delete(`/shortens/${mockUrl.shortUrl}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Short URL deleted' });
  });

  it('should return 404 if short URL to delete not found', async () => {
    Url.findOneAndDelete.mockResolvedValue(null);

    const res = await request(app).delete('/shortens/invalid');

    expect(res.statusCode).toBe(404);
  });

  // STATS
  it('should return URL stats', async () => {
    Url.findOne.mockResolvedValue(mockUrl);

    const res = await request(app).get(`/shortens/${mockUrl.shortUrl}/stats`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('clicks');
  });

  it('should return 404 if stats not found', async () => {
    Url.findOne.mockResolvedValue(null);

    const res = await request(app).get('/shortens/invalid/stats');

    expect(res.statusCode).toBe(404);
  });

});

