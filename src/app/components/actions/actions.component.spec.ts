import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetRef } from '@angular/material';
import { PinsService } from '../pins/pins.service';

import { ActionsComponent } from './actions.component';

class MatBottomSheetRefStub {
  dismiss() {

  }
}


class PinsServiceStub {
  resolveActionObserver() {

  }
}

class MouseEventStub {
  preventDefault() {

  }
}

fdescribe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      providers: [
        { provide: MatBottomSheetRef, useClass: MatBottomSheetRefStub },
        { provide: PinsService, useClass: PinsServiceStub },
        { provide: MouseEvent, useClass: MouseEventStub }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should executed function openLink', () => {
    const spyBottom = spyOn((<any>component).bottomSheetRef, 'dismiss').and.callThrough();
    const spyPin = spyOn((<any>component).pinsService, 'resolveActionObserver').and.callThrough();
    const evento = new MouseEvent('event');

    component.openLink(evento, 'action');

    expect(spyBottom).toHaveBeenCalledWith();
    expect(spyPin).toHaveBeenCalledWith('action');
  });
});
