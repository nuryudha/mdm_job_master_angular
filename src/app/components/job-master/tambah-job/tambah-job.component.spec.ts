import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahJobComponent } from './tambah-job.component';

describe('TambahJobComponent', () => {
  let component: TambahJobComponent;
  let fixture: ComponentFixture<TambahJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TambahJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
