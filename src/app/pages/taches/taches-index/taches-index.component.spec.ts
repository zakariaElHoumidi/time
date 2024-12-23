import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesIndexComponent } from './taches-index.component';

describe('TachesIndexComponent', () => {
  let component: TachesIndexComponent;
  let fixture: ComponentFixture<TachesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TachesIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TachesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
