import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

import {
  invalidEmail, invalidfirstName, invalidAddress, invalidlastName, invalidPassword,
  validinput
} from '../mockdata/userdata';

chai.use(chaiHttp);

describe('Signup', () => {
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

    it.skip('should return 409 if email is already registered', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validinput);
      expect(res).to.have.status(400);
      expect(res.body.status).to.be.equal(400);
      expect(res.body).to.have.property('error');
    });
  });
});
