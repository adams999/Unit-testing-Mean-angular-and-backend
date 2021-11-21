
import { routes } from './app-routing.module';
import { PinsComponent } from './components/pins/pins.component';

fdescribe('app routing', () => {

  beforeAll(() => {
    console.log('beforeAll');

  });

  beforeEach(() => {
    console.log('beforeEach');

  });

  afterAll(() => {
    console.log('afterAll');

  });

  afterEach(() => {
    console.log('afterEach');

  })


  it('should have app as path', () => {
    expect(routes[0].path).toBe('app');
  });

  it('should match the childrens', () => {
    // contenga las propiedades dentro de ls hijos
    expect(routes[0].children).toContain({
      path: 'pins',
      component: PinsComponent
    });
  });
})
