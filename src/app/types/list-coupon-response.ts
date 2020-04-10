export enum CouponStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Coupon {
  id: number
  startDate: number
  endDate: number
  status: CouponStatus
  title: string
  thumbnail: string
}

export interface CouponList {
  page: number
  total: number // total rows/records
  pageSize: number
  list: Coupon[]
}

export interface ListCouponResponse {
  resultCode: number // 1: success, 0: failed
  resultData: CouponList
  errorDisplay: boolean
  errorMessage: string
}
