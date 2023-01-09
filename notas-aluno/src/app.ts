import * as express from 'express';
import cors = require("cors");
import routes from './routes';

const app: express.Express = express();
app.use(express.json());
app.use(cors<express.Request>({ origin: '*' }));
app.use(routes);

export default app;
