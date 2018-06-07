import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResultDialogComponent } from './new-result-dialog.component';

describe('NewResultDialogComponent', () => {
  let component: NewResultDialogComponent;
  let fixture: ComponentFixture<NewResultDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewResultDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
