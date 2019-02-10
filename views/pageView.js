const html = require('html-template-tag');

const renderPage = (allPages, currentPgAndCont) => {
  return html`
    <!DOCTYPE html>
    <html>
      <header>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
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
                    >${page.name}</a>
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
