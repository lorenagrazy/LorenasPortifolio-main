import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftComponent } from './soft.component';

describe('SoftComponent', () => {
  let component: SoftComponent;
  let fixture: ComponentFixture<SoftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftComponent]
    });
    fixture = TestBed.createComponent(SoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
