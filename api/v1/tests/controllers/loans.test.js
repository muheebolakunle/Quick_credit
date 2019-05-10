import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

import { userLogin, verifiedUserLogin } from '../mockdata/userdata';
import {
  emptyloan, missingAmount, missingTenor,
  invalidAmount, invalidTenor, correctloan
} from '../mockdata/loandata';

chai.use(chaiHttp);
let verifiedUserToken;
let userToken;

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
  });
});
