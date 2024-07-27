import express from 'express';
import { PlanetFitness } from './pf.js';
const apiRouter = express.Router();

const zipCodeMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const zipCode = Number.parseInt(req.params.zipCode);
  if (
    !Number.isFinite(zipCode) ||
    !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(req.params.zipCode)
  ) {
    return res.status(400).json({
      error: 'Invalid ZIP code'
    });
  }

  res.locals.zipCode = zipCode;

  next();
};

apiRouter.get('/gyms/:zipCode', zipCodeMiddleware, (req, res) => {
  let zipCode: number = res.locals.zipCode;

  PlanetFitness.getGyms(zipCode)
    .then(gyms => {
      //   console.log(gyms);
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
      //   console.log(gyms);
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
