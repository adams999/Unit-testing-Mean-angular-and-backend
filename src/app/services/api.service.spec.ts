import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';

fdescribe('ApiService', () => {
  let service: ApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ApiService],
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    // se agrega componente de prueba
    service = TestBed.get(ApiService);

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  // eliminar las variables para optimizar la memoria del anvegador
  afterAll(() => {
    service = null;
    injector = null;
    httpMock = null;
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('should excecute get not headers', () => {
      const result = "testing";

      service.get('/test').subscribe((response) => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });

    it('should excecute get with headers', () => {
      const result = "testing";
      const headers = new HttpHeaders().set('platzi-headers', 'adams-contreras');

      service.get('/test', headers).subscribe((response) => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('platzi-headers')).toBe('adams-contreras')
      req.flush(result);
    });
  });

  describe('POST', () => {
    it('should excecute posst', () => {
      const result = "testing";
      const body = {};

      service.post('/test', body).subscribe((response) => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('POST');
      req.flush(result);
    });
  });

  describe('PUT', () => {
    it('should excecute posst', () => {
      const result = "testing";
      const body = {};

      service.put('/test', body).subscribe((response) => {
        expect(response).toContain(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('PUT');
      req.flush(result);
    });
  });

  describe('DELETE', () => {
    it('should excecute posst', () => {
      const result = "testing";
      const body = {};

      service.delete('/test', body).subscribe((response) => {
        expect(response).toContain(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('DELETE');
      req.flush(result);
    });
  });

});
