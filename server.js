const app = require('./app');
const { seedAndSyncDB } = require('./db');

seedAndSyncDB(true);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
