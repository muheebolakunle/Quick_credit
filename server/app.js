import express from 'express';
import cors from 'cors';

import routes from './v1/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
