import express from 'express';
import { PlanetFitness } from './pf.js';
import rateLimit from 'express-rate-limit';
import { useProxy } from './env.js';
const apiRouter = express.Router();

apiRouter.use(
  rateLimit({
    keyGenerator: (req, res) => {
      if (useProxy) {
        return req.header('X-Real-IP')?.[0] ?? req.ip ?? '';
      } else {
        return req.ip ?? '';
      }
    },
    limit: 20,
    windowMs: 1 * 1000 * 60,
    handler: (_req, res) =>
      res.status(429).json({
        error: "You're doing this too fast! Try again in a few minutes."
      })
  })
);

apiRouter.get('/gyms/:zipCode', (req, res) => {
  let zipCode = req.params.zipCode;

  PlanetFitness.getGyms(zipCode)
    .then(gyms => {
      res.json({ gyms });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err.message
      });
    });
});

apiRouter.get('/capacity/:id', (req, res) => {
  PlanetFitness.getCapacity(req.params.id)
    .then(capacities => {
      res.json({ capacities });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err.message
      });
    });
});

export { apiRouter };
