const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/acme_web_sql');

//define the model for pages
const Page = db.define('page', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
//define the model for contents
const Content = db.define('content', {
  head: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
  },
});

// initializes db, defines model association and syncs the db
const initDb = (force = false) => {
  return db.authenticate().then(() => {
    Content.belongsTo(Page);
    Page.hasMany(Content);
    return db.sync({ force });
  });
};

// initializes, syncs and seed the db
const seedAndSyncDB = force => {
  initDb(force)
    .then(() => {
      const homePg = Page.create({ name: 'Home' });
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
    .then(() => {
      console.log('I have seed the database');
    })
    .catch(error => {
      console.error(error);
    });
};


const getHomePg = () => {
  return Page.findAll({
    where: { name: 'Home'}
  })
  .then(pages => pages[0]);
}

const getPageAndContents = (id) => {
  return Page.findByPk(parseInt(id), {include: [Content]});
}

const getAllPages = () => {
  return Page.findAll();
}

// const getPageContent = (id) => {
//   return Content.findAll({
//     where: { pageId: id }
//   })
// }

// const getCurrentPg = (id) => {
//   return Page.findAll({
//     where: { id: id }
//   })
//   .then(pages => pages[0])
// }

module.exports = {
  initDb,
  seedAndSyncDB,
  getHomePg,
  getAllPages,
  getPageAndContents
}
