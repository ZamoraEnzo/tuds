import express from 'express';
import cors from 'cors';
import { Dependency } from './libs/dependency.js';

export function configureMiddlewares(app) {
  const conf = Dependency.get('conf');
  const origin = `http://localhost:${conf.clientPort}`;
  const corsOptions = {
    origin,
    Credentials: true,
    optionSuccessStatus: 200
  };

  app.use(cors(corsOptions));
  app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', origin);
    res.header('Acces-Control-Allow-Headers', true);
    res.header('Acces-Control-Allow-Credentials', true);
    res.header('Acces-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });  

  app.use('/', express.json());

  const router = express.Router();
  app.use('/api', router);

  app.use(errorHandler);

  return router;
}

function errorHandler(err, req, res, next) {
  if (!(err instanceof Error)) {
    res.status(500).send('Ho no hay un error');
    next();
    return;
  }
  const statusCodes = {
    MissingParameterError: 400,
    ConflictError: 409,
  };

  const name = err.constructor.name;
  const status = statusCodes[name] ?? 500;

  res.status(status).send({
    error: name,
    message: err.message,
  });
}