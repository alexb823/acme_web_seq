const app = require('./app');
const { seedAndSyncDB } = require('./db');

const port = process.env.PORT || 3000;

seedAndSyncDB(true);

    app.listen(port, () => console.log(`Server is listening on port ${port}`));

