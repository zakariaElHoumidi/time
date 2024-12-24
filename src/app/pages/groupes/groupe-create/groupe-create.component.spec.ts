import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeCreateComponent } from './groupe-create.component';

describe('GroupeCreateComponent', () => {
  let component: GroupeCreateComponent;
  let fixture: ComponentFixture<GroupeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
