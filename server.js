const app = require('./app');
const { syncAndSeed } = require('./db');

const port = process.env.PORT || 3000;


syncAndSeed()
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
    // app.listen(process.env.PORT, process.env.IP, () => console.log('Server has started')) //For when using cloud 9 server
  })
  .catch(error => console.log(error));

