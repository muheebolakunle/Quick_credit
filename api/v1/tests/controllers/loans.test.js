import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

import { userLogin, verifiedUserLogin, correctLogin } from '../mockdata/userdata';
import {
  emptyloan, missingAmount, missingTenor,
  invalidAmount, invalidTenor, correctloan
} from '../mockdata/loandata';

chai.use(chaiHttp);
let verifiedUserToken;
let userToken;
let adminToken;

describe('Loans', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(verifiedUserLogin);

    verifiedUserToken = response.body.data.token;

    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(userLogin);

    userToken = userResponse.body.data.token;

    const adminResponse = await chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(correctLogin);

    adminToken = adminResponse.body.data.token;
  });

  describe('POST /loans', () => {
    it('should return 400 for invalid token', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans')
        .set('x-auth-token', 'hfhjshhdhhs');
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return 401 for missing token', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans');
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('error');
    });

    it('should return status 400 for empty loan fields', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans')
        .set('x-auth-token', userToken)
        .send(emptyloan);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return status 400 for missing amount', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans')
        .set('x-auth-token', userToken)
        .send(missingAmount);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return status 400 for missing tenor', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans')
        .set('x-auth-token', userToken)
        .send(missingTenor);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return status 400 for invalid amount', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans')
        .set('x-auth-token', userToken)
        .send(invalidAmount);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return status 400 for invalid tenor', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans')
        .set('x-auth-token', userToken)
        .send(invalidTenor);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return status 400 for an unverified user', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans')
        .set('x-auth-token', userToken)
        .send(correctloan);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return status 201 for correct loan', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans')
        .set('x-auth-token', verifiedUserToken)
        .send(correctloan);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
    });

    it('should return status 402 for user with current loan', async () => {
      const res = await chai.request(app)
        .post('/api/v1/loans')
        .set('x-auth-token', adminToken)
        .send(correctloan);
      expect(res).to.have.status(402);
      expect(res.body).to.have.property('error');
    });
  });

  describe('GET /loans', () => {
    it('should return status 403 for unauthorized user ', async () => {
      const res = await chai.request(app)
        .get('/api/v1/loans')
        .set('x-auth-token', userToken);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });

    it('should return status 200 for authorized user ', async () => {
      const res = await chai.request(app)
        .get('/api/v1/loans')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /loans/?status&repaid', () => {
    it('should return all loans that are approved and fully repaid', async () => {
      const res = await chai.request(app)
        .get('/api/v1/loans?status=approved&repaid=true')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.an('array');
    });

    it('should return all loans that are approved and not fully repaid', async () => {
      const res = await chai.request(app)
        .get('/api/v1/loans?status=approved&repaid=false')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.an('array');
    });

    it('should return error for invalid status value', async () => {
      const res = await chai.request(app)
        .get('/api/v1/loans?status=panama&repaid=true')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('should return error for invalid repaid value', async () => {
      const res = await chai.request(app)
        .get('/api/v1/loans?status=approved&repaid=notyet')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('GET /loans/:loanid', () => {
    it('should return status 404 if no match is found ', async () => {
      const res = await chai.request(app)
        .get('/api/v1/loans/hdj')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
    });

    it('should return a single loan ', async () => {
      const res = await chai.request(app)
        .get('/api/v1/loans/2')
        .set('x-auth-token', adminToken);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
  });
});
