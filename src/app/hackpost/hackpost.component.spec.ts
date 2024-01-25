import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackpostComponent } from './hackpost.component';

describe('HackpostComponent', () => {
  let component: HackpostComponent;
  let fixture: ComponentFixture<HackpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackpostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HackpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
