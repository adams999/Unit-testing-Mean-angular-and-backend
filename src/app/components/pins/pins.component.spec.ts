import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryService } from 'src/app/services/repository.service';

import { PinsComponent } from './pins.component';
import { Observable, of, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { PinsService } from './pins.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PINS } from 'src/app/services/mocks/pins';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class RepositoryServiceStub {
  observer = new Subject();

  getPins(): Observable<any> {
    return this.observer;
  }

  resolvePins() {
    //se crea copia del objeto original
    return this.observer.next(JSON.parse(JSON.stringify(PINS)))
  }

  updatePin() {
    return of(true);
  }
}

class MatSnackBarStub {
  open() {

  }
}

class PinsServiceStub {
  private actionObserver = new Subject();
  public $actionObserver = this.actionObserver.asObservable();

  public resolve(action) {
    return this.actionObserver.next(action);
  }
}

fdescribe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinsComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ],
      imports: [
        ReactiveFormsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when new pase is open', () => {
    const open = spyOn(window, 'open');

    component.openUrl('platzi.com');

    expect(open).toHaveBeenCalledWith('platzi.com', '_blank')
  });

  it('when update progress', () => {
    component.pins = PINS;
    const pin = PINS[0];
    const updatePin = spyOn((<any>component).repository, 'updatePin').and.returnValue(of(true));
    const open = spyOn((<any>component).snackBar, 'open');
    const pinService = TestBed.get(PinsService);

    pinService.resolve('save');

    expect(open).toHaveBeenCalled();
    expect(open).toHaveBeenCalledWith('Progress updated!', 'OK', {
      duration: 2000
    });
    expect(updatePin).toHaveBeenCalledWith(pin._id, {
      title: pin.title,
      author: pin.author,
      description: pin.description,
      percentage: pin.percentage,
      tags: pin.tags,
      assets: pin.assets
    });
  });
});
