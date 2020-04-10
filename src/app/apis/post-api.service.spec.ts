import { TestBed } from '@angular/core/testing'

import { PostApi } from './post-api.service'

describe('PostApiService', () => {
  let service: PostApi

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PostApi)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
