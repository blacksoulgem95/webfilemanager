import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidepanelComponent } from './main-sidepanel.component';

describe('MainSidepanelComponent', () => {
  let component: MainSidepanelComponent;
  let fixture: ComponentFixture<MainSidepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSidepanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
