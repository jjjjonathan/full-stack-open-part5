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
});
