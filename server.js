const app = require('./app');
const { initDb, initSyncAndSeedDb } = require('./db');

const port = process.env.PORT || 3000;


initSyncAndSeedDb()
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  })
  .catch(error => console.log(error));
