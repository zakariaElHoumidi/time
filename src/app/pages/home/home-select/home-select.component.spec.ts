import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSelectComponent } from './home-select.component';

describe('HomeSelectComponent', () => {
  let component: HomeSelectComponent;
  let fixture: ComponentFixture<HomeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
