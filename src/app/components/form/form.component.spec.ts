import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { RepositoryService } from '../../services/repository.service';
import { Observable, of } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { MatSnackBar } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormArray } from '@angular/forms';

class RepositoryServiceStub {
  savePins(): Observable<any> {
    return of(true);
  }
}

class NavigationServiceStub {
  goToPins(): void {

  }
}

class MatSnackBarStub {
  open() {
    return {
      afterDismissed: () => {
        return of(true);
      }
    }
  }
}

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: NavigationService, useClass: NavigationServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      // para poder saltar los errores de los modulos con html de angular
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cuando el componente es inicializado', () => {
    it('should create the forms', () => {
      const firstForm = component.firstFormGroup.controls;
      const secondForm = component.secondFormGroup.controls;

      const expectFormFirst = ['title', 'author', 'description'];
      const expectFormSecond = ['firstAsset', 'assets'];

      expect(Object.keys(firstForm)).toEqual(expectFormFirst);
      expect(Object.keys(secondForm)).toEqual(expectFormSecond);
    });
  });

  describe('when  addAsset is executed', () => {
    it('should add push in the form second', () => {
      const assets = <FormArray>component.secondFormGroup.get('assets');
      component.addAsset();
      component.addAsset();
      const expectData = ['0', '1'];

      expect(Object.keys(assets.controls)).toEqual(expectData);
    });
  });

  describe('when delete', () => {
    it('should remove the form control', () => {
      const assets = <FormArray>component.secondFormGroup.get('assets');

      component.addAsset();
      component.deleteAsset(0);

      expect(Object.keys(assets.controls)).toEqual([]);
    });
  });

  describe('when save pins is executed', () => {
    it('should navigate pins view', () => {
      const navigateSpy = spyOn((<any>component).navigate, 'goToPins');

      //que sea llamado solamente
      const openSpy = spyOn((<any>component).snackBar, 'open').and.callThrough();

      component.savePin();

      expect(navigateSpy).toHaveBeenCalled();

      // debe ser llamado especificamente con estos parametros en un futuro
      expect(openSpy).toHaveBeenCalledWith('Your pin is saved, Redirecting ...', 'Cool!', {
        duration: 2000
      });
    });
  })
});
