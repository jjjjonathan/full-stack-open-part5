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
      cy.request('POST', 'http://localhost:3005/api/login', {
        username: 'admin',
        password: 'password',
      }).then((response) => {
        localStorage.setItem(
          'loggedInBlogListUser',
          JSON.stringify(response.body)
        );
        cy.visit('http://localhost:3000');
      });
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

    it.only('A blog can be liked', function () {
      cy.contains('Add new').click();
      cy.get('#title').type('The Book of Cypress');
      cy.get('#author').type('Alabaster Arqensaa');
      cy.get('#url').type('example.com/cypress');
      cy.contains('Add to list').click();
      cy.contains('Show details').click();
      cy.contains('Like').click();

      cy.get('ul').should('contain', 'Likes: 1');
    });
  });
});
