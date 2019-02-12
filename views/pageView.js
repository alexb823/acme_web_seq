const html = require('html-template-tag');

const renderPage = (allPages, currentPgAndCont) => {
  return html`
    <!DOCTYPE html>
    <html>
      <header>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Acme Web</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css"
          integrity="sha384-PDle/QlgIONtM1aqA2Qemk5gPOE7wFq8+Em+G/hmo5Iq0CCmYZLv3fVRDJ4MMwEA"
          crossorigin="anonymous"
        />
      </header>
      <body>
        <div class="container">
          <!-- Page Header -->
          <h1 class="my-2">Acme Web</h1>
          <h2>${currentPgAndCont.name}</h2>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs my-5">
            ${allPages.map(page => {
              return html`
                <li class="nav-item">
                  <a
                    class="nav-link
                    ${page.id === currentPgAndCont.id ? 'active' : ''}"
                    href="/pages/${page.id}"
                    >${page.name}</a
                  >
                </li>
              `;
            })}
          </ul>

          <!-- Page Content -->
          <ul class="list-group">
            ${currentPgAndCont.contents.map(content => {
              return html`
                <li class="list-group-item">
                  ${content.head}<br />
                  ${content.body}
                </li>
              `;
            })}
          </ul>
        </div>
      </body>
    </html>
  `;
};

module.exports = renderPage;
