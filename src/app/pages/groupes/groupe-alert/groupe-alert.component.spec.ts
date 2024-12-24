import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeAlertComponent } from './groupe-alert.component';

describe('GroupeAlertComponent', () => {
  let component: GroupeAlertComponent;
  let fixture: ComponentFixture<GroupeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupeAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
