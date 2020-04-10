import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CouponModalComponent } from './coupon.component'

describe('CouponComponent', () => {
  let component: CouponModalComponent
  let fixture: ComponentFixture<CouponModalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponModalComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
