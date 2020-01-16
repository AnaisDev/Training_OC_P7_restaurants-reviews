import { TestBed, async } from '@angular/core/testing';
import { RestaurantsComponent } from './restaurants.component';

describe('RestaurantsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RestaurantsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RestaurantsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'restaurantsreviews'`, () => {
    const fixture = TestBed.createComponent(RestaurantsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('restaurantsreviews');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(RestaurantsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('restaurantsreviews app is running!');
  });
});
