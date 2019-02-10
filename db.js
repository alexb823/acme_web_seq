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
const initDB = (force = false) => {
  return db.authenticate().then(() => {
    Content.belongsTo(Page);
    Page.hasMany(Content);
    return db.sync({ force });
  });
};

// initializes, syncs and seed the db
const seedAndSyncDB = force => {
  initDB(force)
    .then(() => {
      const homePage = Page.create({ name: 'Home' });
      const employeesPage = Page.create({ name: 'Employees' });
      const contactPages = Page.create({ name: 'Contact' });
      const homeContent = Promise.all([
        Content.create({ head: 'Welcome Home 1', body: 'xoxoxo' }),
        Content.create({ head: 'Welcome Home 2', body: 'xoxoxo' }),
      ]);
      const employeesContent = Promise.all([
        Content.create({ head: 'MOE', body: 'CEO' }),
        Content.create({ head: 'LARRY', body: 'CTO' }),
        Content.create({ head: 'CURLY', body: 'COO' }),
      ]);
      const contactContent = Promise.all([
        Content.create({ head: 'Phone', body: '212-555-1212' }),
        Content.create({ head: 'Telex', body: '212-555-1213' }),
        Content.create({ head: 'FAX', body: '212-555-1214' }),
      ]);
      return Promise.all([
        homePage,
        employeesPage,
        contactPages,
        homeContent,
        employeesContent,
        contactContent,
      ]);
    })
    .then(
      ([
        homePage,
        employeesPage,
        contactPages,
        homeContent,
        employeesContent,
        contactContent,
      ]) => {
        homePage.setContents(homeContent);
        employeesPage.setContents(employeesContent);
        contactPages.setContents(contactContent);
      }
    )
    .then(() => {
      console.log('I have seed the database');
      process.exit(0);
    })
    .catch(error => {
      console.log(error);
      process.exit(1);
    });
};

module.exports = {
  Page,
  Content,
  initDB,
  seedAndSyncDB
}
