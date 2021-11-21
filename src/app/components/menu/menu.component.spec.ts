import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuComponent } from './menu.component';

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should h1 is equial to valor for default', () => {
    const titleExpect = 'eLearning Management System';
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.innerHTML).toBe(titleExpect);
  });

  it('testing output event emmiter ', () => {
    const valueExpect = true;

    // espero que sea resuelta para comparar el valor dado
    component.clicked.subscribe((result) => {
      expect(result).toBe(valueExpect);
    });

    // envio un evento para que se ejecute el subscribe de la linea superior
    component.clicked.next(valueExpect);
  });

  it('should increment to clicked button', () => {
    const button = fixture.debugElement.query(By.css('button'));
    console.log(component.counter);


    button.triggerEventHandler('click', null);
    console.log(component.counter);


    expect(component.counter).toBe(1);
  });
});
