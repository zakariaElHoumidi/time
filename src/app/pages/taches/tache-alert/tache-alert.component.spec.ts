import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheAlertComponent } from './tache-alert.component';

describe('TacheAlertComponent', () => {
  let component: TacheAlertComponent;
  let fixture: ComponentFixture<TacheAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacheAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacheAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
