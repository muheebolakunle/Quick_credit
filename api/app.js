import express from 'express';
import router from './v1/routes/approute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;