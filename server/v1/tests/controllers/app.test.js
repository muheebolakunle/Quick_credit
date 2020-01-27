import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);

describe('App', () => {
  describe('GET /*', () => {
    it('should catch all undefined routes', async () => {
      const res = await chai.request(app)
        .get('/ap1/v1/whatever');

      expect(res).to.have.status(404);
    });
  });

  describe('GET /', () => {
    it('should display a welcome message', async () => {
      const res = await chai.request(app)
        .get('/api/v1/');

      expect(res).to.have.status(200);
    });
  });
});
