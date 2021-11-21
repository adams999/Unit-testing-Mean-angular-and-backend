const express = require('express');
const logger = require('morgan');
const app = express();
const PinsRouter = require('./routes/pins');
const http = require('http');
const Pins = require('./models/Pins');
const request = require('request');
const requestPromise = require('request-promise-native');
const axios = require('axios');

app.use(logger('dev'));
app.use(express.json());
app.use('/api', PinsRouter.router);
app.set('port', 3000);

describe('Testing the router', () => {
  let server;

  // se carga antes de las pruebas
  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });

  // se carga despues de que se finalize el proceso de test
  afterAll(() => {
    server.close();
  });

  describe('GET', () => {
    // get 200 asyncrono
    it('200 and get', done => {
      const data = [{
        id: 1
      }];

      spyOn(Pins, 'find').and.callFake(callback => {
        callback(false, data);
      });

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(data);
        done();
      })
    });

    //get 500
    it('500', done => {
      const data = [{
        id: 1
      }];

      spyOn(Pins, 'find').and.callFake(callback => {
        callback(true, data);
      });

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });

    //get 200 con id
    it('200 con id', done => {
      const data = {
        id: 123
      };

      spyOn(Pins, 'findById').and.callFake((id, callback) => {
        data.param = id;
        callback(false, data);
      });

      request.get(`http://localhost:3000/api/123`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({
          id: 123,
          param: '123'
        });
        expect(JSON.parse(response.body).id).toBe(123);
        done();
      })
    });

    //get 500 con id
    it('500 con id', done => {
      const data = {
        id: 123
      };

      spyOn(Pins, 'findById').and.callFake((id, callback) => {
        data.param = id;
        callback(true, data);
      });

      request.get(`http://localhost:3000/api/123`, (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      })
    });
  });

  describe('POST', () => {
    it('200', done => {
      const post = [{
        title: 'Platzi',
        author: 'Platzi',
        description: 'platzi',
        percentage: 0,
        tags: [],
        assets: []
      }];

      spyOn(Pins, 'create').and.callFake((post, callback) => {
        callback(false, post);
      });

      spyOn(requestPromise, 'get').and.returnValue(
        Promise.resolve('<title>Platzi</title><meta name="description" content="Platzi rules">')
      );

      const assets = [{
        url: 'http://paltzi.com'
      }];

      axios.post(`http://localhost:3000/api`, {
        title: 'title',
        author: 'author',
        description: 'description',
        assets
      }).then(
        (res) => {
          expect(res.status).toBe(200);
          done();
        });

    });

    it('200 pdf', done => {
      spyOn(Pins, 'create').and.callFake((pins, callback) => {
        callback(false, {});
      });

      const assets = [{
        url: 'http://paltzi.pdf'
      }];

      axios.post(`http://localhost:3000/api`, {
        title: 'title',
        author: 'author',
        description: 'description',
        assets
      }).then(
        (res) => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it('llamar a recurso /api/ flujo cuando la url es un .pdf o .png esperando 500', done => {

      spyOn(Pins, 'create').and.callFake((pinFake, callback) => {
        callback(true, null);
      });

      request.post('http://localhost:3000/api', {
        json: {
          assets: []
        }
      }, (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      })
    });

    it('validar si getMetadataFromAssets es 500', done => {

      spyOn(requestPromise, 'post').and.returnValue(Promise.reject(new Error('error')));

      // request.post('http://localhost:3000/api', {
      //   json: {
      //     assets: []
      //   }
      // }, (error, response, body) => {
      //   expect(response.statusCode).toBe(500);
      //   done();
      // })

      Pins.getMetadataFromAssets.then().catch(err=>{
        expect(error).toBeTruthy();
      })
    });

  });

  describe('PUT', () => {
    it('200', done => {
      const data = {
        id: 123
      };

      spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, data, callback) => {
        data.param = id;
        callback(false, data);
      });

      request.put(`http://localhost:3000/api/123`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      })
    });

    it('500', done => {
      spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, data, callback) => {
        data.param = id;
        callback(true, data);
      });

      request.put(`http://localhost:3000/api/123`, (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      })
    });
  })

  describe('POST', () => {
    it('200', done => {
      spyOn(Pins, 'findByIdAndRemove').and.callFake((id, data, callback) => {
        callback(false, data);
      });

      request.delete('http://localhost:3000/api/123', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      })

    });

    it('500', done => {
      spyOn(Pins, 'findByIdAndRemove').and.callFake((id, data, callback) => {
        callback(true, data);
      });

      request.delete('http://localhost:3000/api/123', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      })

    });
  })

});
