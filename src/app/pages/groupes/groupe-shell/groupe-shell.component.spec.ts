import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeShellComponent } from './groupe-shell.component';

describe('GroupeShellComponent', () => {
  let component: GroupeShellComponent;
  let fixture: ComponentFixture<GroupeShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupeShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupeShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
