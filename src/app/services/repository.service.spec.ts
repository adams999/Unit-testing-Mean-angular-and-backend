import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { PINS } from './mocks/pins';
import { environment } from 'src/environments/environment';

class ApiServiceStub {
  get() {
    return of(true);
  }

  post() {
    return of(true);
  }

  put() {
    return of(true);
  }
}

fdescribe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ApiService, useClass: ApiServiceStub }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(ApiService);
  })

  it('should be created', () => {
    const service: RepositoryService = TestBed.get(RepositoryService);
    expect(service).toBeTruthy();
  });



  it('getPins with enviroment', () => {
    const spy = spyOn((<any>service).api, 'get');
    service.getPins();

    expect(spy).toHaveBeenCalled();
  });
});
