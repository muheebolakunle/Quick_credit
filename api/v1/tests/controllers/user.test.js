import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

import {
  invalidEmail, invalidfirstName, invalidAddress,
  invalidlastName, invalidPassword, validinput,
  emptyLogin, missingLogin, correctLogin,
  notExistLogin, nonMatchingLogin, registeredInput
} from '../mockdata/userdata';

chai.use(chaiHttp);

describe('Auth', () => {
  describe('POST /auth/signup', () => {
    it('should return 201 for successful registration', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validinput);
      expect(res).to.have.status(201);
      expect(res).to.have.header('x-auth-token');
      expect(res.body.status).to.be.equal(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('token');
      expect(res.body.data).to.have.property('id');
      expect(res.body.data).to.have.property('firstName');
      expect(res.body.data).to.have.property('lastName');
      expect(res.body.data).to.have.property('email');
    });

    it('should return 400 if fields contain invalid email', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidEmail);
      expect(res).to.have.status(400);
      expect(res.body.status).to.be.equal(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 400 if fields contain invalid firstname', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidfirstName);
      expect(res).to.have.status(400);
      expect(res.body.status).to.be.equal(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 400 if fields contain invalid lastname', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidlastName);
      expect(res).to.have.status(400);
      expect(res.body.status).to.be.equal(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 400 if fields contain invalid address', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidAddress);
      expect(res).to.have.status(400);
      expect(res.body.status).to.be.equal(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 400 if fields contain invalid password', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidPassword);
      expect(res).to.have.status(400);
      expect(res.body.status).to.be.equal(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 409 if email is already registered', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(registeredInput);
      expect(res).to.have.status(409);
      expect(res.body.status).to.be.equal(409);
      expect(res.body).to.have.property('error');
    });
  });


  describe('POST /signin', () => {
    it('should return 400 if data fields are empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(emptyLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 400 if one or more fields are missing', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(missingLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 400 if user account not found', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(notExistLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 400 for non-matching details', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(nonMatchingLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 200 for successfull login', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(correctLogin);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
  });
});
