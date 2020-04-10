import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IPost } from '../types/post-response'

@Injectable()
export class PostApi {

  constructor(private httpClient: HttpClient) { }

  getCoupons(params: {
    page: string
  }) {
    return this.httpClient.get('api/coupons', { params })
  }

  create(body: IPost) {
    return this.httpClient.post('api/coupons', body)
  }

}
