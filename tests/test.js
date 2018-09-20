process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('POST sendemail', () => {
  it('it should send email ok', done => {
    const request = {
      type: 'comment-liked',
      info: {
        to: 'mendez.developer@gmail.com',
        document: {
          comment: 'Este es el comentario original',
          title: 'Todos por el pueblo',
          author: 'Ernesto Arriaga'
        }
      }
    };
    
    chai.request(server)
      .post('/api/sendemail')
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');

        done();
      });
  });

  it('it should get an error for type not exists', done => {
    const request = {
      type: 'comment-like',
      info: {
        to: 'mendez.developer@gmail.com',
        document: {
          comment: 'Este es el comentario original',
          title: 'Todos por el pueblo',
          author: 'Ernesto Arriaga'
        }
      }
    };

    chai.request(server)
      .post('/api/sendemail')
      .send(request)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('reason');
        
        done();
      });
  })
});
