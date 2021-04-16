Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3005/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedInBlogListUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3005/api/testing/reset');
    const user = {
      name: 'Admin',
      username: 'admin',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3005/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
    cy.contains('Username:');
    cy.contains('Password:');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('password');
      cy.get('button[type=submit]').click();

      cy.contains('Blogs');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('dummy');
      cy.get('button[type=submit]').click();

      cy.get('.message').should('contain', 'Invalid username or password');
      cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'password' });
    });

    it('A blog can be created', function () {
      cy.contains('Add new').click();
      cy.get('#title').type('The Book of Cypress');
      cy.get('#author').type('Alabaster Arqensaa');
      cy.get('#url').type('example.com/cypress');
      cy.contains('Add to list').click();

      cy.get('div').should(
        'contain',
        'The Book of Cypress by Alabaster Arqensaa'
      );
    });

    it('A blog can be liked', function () {
      cy.contains('Add new').click();
      cy.get('#title').type('The Book of Cypress');
      cy.get('#author').type('Alabaster Arqensaa');
      cy.get('#url').type('example.com/cypress');
      cy.contains('Add to list').click();
      cy.contains('Show details').click();
      cy.contains('Like').click();

      cy.get('ul').should('contain', 'Likes: 1');
    });

    it('A blog can be deleted by the user who created it and not by another user', function () {
      cy.contains('Add new').click();
      cy.get('#title').type('The Book of Cypress');
      cy.get('#author').type('Alabaster Arqensaa');
      cy.get('#url').type('example.com/cypress');
      cy.contains('Add to list').click();
      cy.contains('Show details').click();
      cy.contains('Delete').click();
      cy.get('div').should(
        'not.contain',
        'The Book of Cypress by Alabaster Arqensaa'
      );
      cy.get('.message').should(
        'contain',
        'Successfully deleted The Book of Cypress'
      );

      cy.contains('Add new').click();
      cy.get('#title').type('The Book of Cypress');
      cy.get('#author').type('Alabaster Arqensaa');
      cy.get('#url').type('example.com/cypress');
      cy.contains('Add to list').click();

      cy.contains('Logout').click();

      const newUser = {
        name: 'Userama',
        username: 'janedoe',
        password: 'friday494',
      };
      cy.request('POST', 'http://localhost:3005/api/users', newUser);

      cy.get('#username').type('janedoe');
      cy.get('#password').type('friday494');
      cy.get('button[type=submit]').click();

      cy.contains('Show details').click();
      cy.get('div').should('not.contain', 'Delete');
    });

    it('blogs are ordered according to likes', () => {
      cy.contains('Add new').click();
      cy.get('#title').type('The Book of Cypress');
      cy.get('#author').type('Alabaster Arqensaa');
      cy.get('#url').type('example.com/cypress');
      cy.contains('Add to list').click();

      cy.contains('Add new').click();
      cy.get('#title').type('The Book of Indian Food');
      cy.get('#author').type('Anonymous');
      cy.get('#url').type('example.com/india');
      cy.contains('Add to list').click();
      cy.contains('Anonymous').contains('Show details').click();
      cy.contains('Anonymous')
        .contains('Like')
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click();

      cy.contains('Add new').click();
      cy.get('#title').type(
        'ALALALLALLALLLL LALALA LA LANNAND DNLANLD LNDLANLND LNDLAN'
      );
      cy.get('#author').type('JONEEEEE');
      cy.get('#url').type('example.com/lalala');
      cy.contains('Add to list').click();
      cy.contains('JONEEEEE').contains('Show details').click();
      cy.contains('JONEEEEE').contains('Like').click().click().click().click();

      cy.reload();
      cy.contains('JONEEEEE').contains('Show details').click();
      cy.contains('Anonymous').contains('Show details').click();
      cy.contains('Alabaster').contains('Show details').click();

      cy.get('.blog').eq(0).should('contain', 'Anonymous');
      cy.get('.blog').eq(1).should('contain', 'JONEEEEE');
      cy.get('.blog').eq(2).should('contain', 'Alabaster');
    });
  });
});
