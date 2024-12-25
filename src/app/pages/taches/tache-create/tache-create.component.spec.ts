import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheCreateComponent } from './tache-create.component';

describe('TacheCreateComponent', () => {
  let component: TacheCreateComponent;
  let fixture: ComponentFixture<TacheCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacheCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacheCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
