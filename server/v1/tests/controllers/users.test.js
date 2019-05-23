import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import pool from '../../database/index';
import createTestDB from '../../database/initTable';

import { correctLogin, userLogin } from '../mockdata/userdata';

chai.use(chaiHttp);
let adminToken;
let userToken;

describe('Users', () => {
  before(async () => {
    try {
      await pool.query(createTestDB.createTestDB);
    } catch (error) {
      console.log(error);
    }
    const response = await chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(correctLogin);

    adminToken = response.body.token;

    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(userLogin);

    userToken = userResponse.body.token;
  });

  describe('GET /users', () => {
    it('should return 403 if user is not an admin', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users')
        .set('x-auth-token', userToken);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });

    it('should return 400 for invalid token', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users')
        .set('x-auth-token', 'hfhjshhdhhs');
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 401 for missing token', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users');
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('error');
    });

    it('should get all users and return 200', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /users/:email', () => {
    it('should return 403 if user is not an admin', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/users/${correctLogin.email}`)
        .set('x-auth-token', userToken);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });

    it('should return 400 for invalid token', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/users/${correctLogin.email}`)
        .set('x-auth-token', 'hfhjshhdhhs');
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 401 for missing token', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/users/${correctLogin.email}`);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('error');
    });

    it('should get the user and return 200', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/users/${correctLogin.email}`)
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });

    it('should get status 400 email parameter is invalid', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users/dhhhnns')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should get status 404 if no user with the email', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users/lalala@gmail.com')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
    });
  });

  describe('PATCH /users/:email/verify', () => {
    it('should update user status to verified', async () => {
      const res = await chai.request(app)
        .patch(`/api/v1/users/${userLogin.email}/verify`)
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.status).to.be.equal('verified');
    });
  });
});
