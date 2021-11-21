import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MatBottomSheetStub {
  open() { }
}

fdescribe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      providers: [
        { provide: MatBottomSheet, useClass: MatBottomSheetStub }
      ],
      imports: [
        RouterTestingModule.withRoutes([{
          path: '',
          component: LayoutComponent
        },
        {
          path: 'app/add',
          component: LayoutComponent
        }])
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the edit mode to false', () => {
    const verifyEditMode = spyOn(component, 'verifyEditMode').and.callThrough();

    // para indicarle a angular que hay cambios en el dom
    fixture.ngZone.run(() => {
      (<any>component).router.navigate(['/']);

      // cuando la app sea estable o no tenga mas cambios se resolvera lo de adentro
      fixture.whenStable().then(() => {

        expect(component.editMode).toBeFalsy();
        expect(verifyEditMode).toHaveBeenCalled();
      })
    });
  });


  it('should set the edit mode to true', () => {
    const verifyEditMode = spyOn(component, 'verifyEditMode').and.callThrough();

    // para indicarle a angular que hay cambios en el dom
    // ngzone para prevenir errorees con la navegacion
    fixture.ngZone.run(() => {
      (<any>component).router.navigate(['/app/add']);

      // cuando la app sea estable o no tenga mas cambios se resolvera la promesa
      fixture.whenStable().then(() => {

        expect(component.editMode).toBeTruthy();
        expect(verifyEditMode).toHaveBeenCalled();
      });
    });
  });


  it('should open', () => {
    const spyOpen = spyOn((<any>component).bottomSheet, "open");

    component.openBottomSheet();

    expect(spyOpen).toHaveBeenCalled();
  });
});
