import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

import { Coupon, ListCouponResponse } from '../../../types/list-coupon-response'
import { PostApi } from 'src/app/apis/post-api.service'

@Component({
  selector: 'app-coupon-modal',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
  providers: [PostApi]
})
export class CouponModalComponent implements OnInit {

  @Output() selected = new EventEmitter()

  coupons: Coupon[] = []
  isLoading = true
  page = 1
  pageSize: number
  total: number

  constructor(
    private activeModal: NgbActiveModal,
    private postApi: PostApi,
  ) { }

  ngOnInit(): void {
    this.fetch()
  }

  dismiss() {
    this.activeModal.dismiss()
  }

  onSelect(coupon) {
    this.selected.emit(coupon)
    this.dismiss()
  }

  private fetch() {
    this.postApi.getCoupons({ page: this.page.toString() }).subscribe((res: ListCouponResponse) => {
      this.isLoading = false
      this.coupons = res.resultData.list
      const { page, pageSize, total } = res.resultData
      this.page = page
      this.pageSize = pageSize
      this.total = total
    })
  }

}
