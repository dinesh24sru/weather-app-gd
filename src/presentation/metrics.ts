
import express from 'express';
import client from 'prom-client';
client.collectDefaultMetrics();
const router = express.Router();
router.get('/', async (_req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});
export default router;
