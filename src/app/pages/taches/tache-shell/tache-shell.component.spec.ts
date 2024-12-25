import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheShellComponent } from './tache-shell.component';

describe('TacheShellComponent', () => {
  let component: TacheShellComponent;
  let fixture: ComponentFixture<TacheShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacheShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacheShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
