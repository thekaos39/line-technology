import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { PostRoutingModule } from './post-routing.module'
import { CreateComponent } from './create/create.component'
import { CouponModalComponent } from './modal/coupon/coupon.component'


@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    CreateComponent,
    CouponModalComponent
  ]
})
export class PostModule { }
