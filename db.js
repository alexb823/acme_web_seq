const Sequelize = require('sequelize');

// For cloud9 db
// const db = new Sequelize('ubuntu', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false,
// });

//For my local db
const db = new Sequelize(process.env.DATABASE_URL);


//define the model for pages
const Page = db.define('page', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isHomePage: {
    type: Sequelize.BOOLEAN
  }
});
//define the model for contents
const Content = db.define('content', {
  head: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
  },
});

//Defines model association
Content.belongsTo(Page);
Page.hasMany(Content);

// Sync and seed the database version using promises only 
const syncAndSeed = () => {
  return db.sync({ force: true })
    .then(() => {
      const homePg = Page.create({ name: 'Home', isHomePage: true });
      const employPg = Page.create({ name: 'Employees' });
      const contactPg = Page.create({ name: 'Contact' });

      const homeCnt = Promise.all([
        Content.create({ head: 'Welcome Home 1', body: 'xoxoxo' }),
        Content.create({ head: 'Welcome Home 2', body: 'xoxoxo' }),
      ]);
      const employCnt = Promise.all([
        Content.create({ head: 'MOE', body: 'CEO' }),
        Content.create({ head: 'LARRY', body: 'CTO' }),
        Content.create({ head: 'CURLY', body: 'COO' }),
      ]);
      const contactCnt = Promise.all([
        Content.create({ head: 'Phone', body: '212-555-1212' }),
        Content.create({ head: 'Telex', body: '212-555-1213' }),
        Content.create({ head: 'FAX', body: '212-555-1214' }),
      ]);
      return Promise.all([homePg, employPg, contactPg, homeCnt, employCnt, contactCnt]);
    })
    .then(([homePg, employPg, contactPg, homeCnt, employCnt, contactCnt]) => {
      return Promise.all([
        homePg.setContents(homeCnt),
        employPg.setContents(employCnt),
        contactPg.setContents(contactCnt)
      ])
    })
    .then(() => console.log('I have seed the database'))
    .catch(error => console.error(error));
};

// Sync and seed the database version using promises and async await
// const syncAndSeed = () => {
//   return db.sync({ force: true })
//     .then(async() => {
//       const [homePg, employPg, contactPg] = await Promise.all([
//         Page.create({ name: 'Home', isHomePage: true }),
//         Page.create({ name: 'Employees' }),
//         Page.create({ name: 'Contact' })
//       ]);
//       const homeCnt = await Promise.all([
//         Content.create({ head: 'Welcome Home 1', body: 'xoxoxo' }),
//         Content.create({ head: 'Welcome Home 2', body: 'xoxoxo' }),
//       ]);
//       const employCnt = await Promise.all([
//         Content.create({ head: 'MOE', body: 'CEO' }),
//         Content.create({ head: 'LARRY', body: 'CTO' }),
//         Content.create({ head: 'CURLY', body: 'COO' }),
//       ]);
//       const contactCnt = await Promise.all([
//         Content.create({ head: 'Phone', body: '212-555-1212' }),
//         Content.create({ head: 'Telex', body: '212-555-1213' }),
//         Content.create({ head: 'FAX', body: '212-555-1214' }),
//       ]);

//       homePg.setContents(homeCnt);
//       employPg.setContents(employCnt);
//       contactPg.setContents(contactCnt);
//     })
//     .catch(error => console.error((error)));
// };


// db queries
const getHomePg = () => {
  return Page.findOne({ where: { isHomePage: true } });
};

const getPageAndContents = id => {
  return Page.findByPk(parseInt(id), { include: [Content] });
};

const getAllPages = () => {
  return Page.findAll();
};

module.exports = {
  getHomePg,
  getPageAndContents,
  getAllPages,
  syncAndSeed
};



// initializes db and syncs the db
// const initDb = (force = false) => {
//   return db.authenticate().then(() => {
//     return db.sync({ force })
//   });
// };

