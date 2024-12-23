import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeIndexComponent } from './groupe-index.component';

describe('GroupeIndexComponent', () => {
  let component: GroupeIndexComponent;
  let fixture: ComponentFixture<GroupeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupeIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
