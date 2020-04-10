import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment'

import { Coupon } from '../../types/list-coupon-response'
import { CouponModalComponent } from '../modal/coupon/coupon.component'
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/services/ngb-date.service'
import { PostApi } from 'src/app/apis/post-api.service'
import { PostStatus, IPostType, PostType, IPost } from '../../types/post-response'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NgbDateAdapter,
    useClass: CustomAdapter
  }, {
    provide: NgbDateParserFormatter,
    useClass: CustomDateParserFormatter
  }, PostApi]
})
export class CreateComponent implements OnInit {

  formGroup: FormGroup
  isDraft = true
  isLoading = false
  postStatus = PostStatus
  postTypes = PostType
  selectedCoupon: Coupon
  selectedType = PostType.COUPON
  submitted = false
  submitText = 'Puslish'
  types: IPostType[] = []

  constructor(
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private postApi: PostApi,
  ) { }

  ngOnInit(): void {
    this.buildForm()
    this.buildTypes()
  }

  get controls() {
    return this.formGroup.controls
  }

  patchStatusValue() {
    this.controls.isPublishNow.patchValue(false)
  }

  onSetType(type) {
    this.selectedType = type
    this.types = this.types.map(t => ({
      ...t,
      isSelected: t.type === type
    }))
    switch (type) {
      case PostType.COUPON:
        const modalRef = this.modalService.open(CouponModalComponent, { backdrop: 'static', centered: true, size: 'lg', scrollable: true })
        modalRef.componentInstance.selected.subscribe(coupon => {
          this.selectedCoupon = coupon
          this.controls.item.patchValue(coupon)
          this.cdr.detectChanges()
        })
        break
      default:
        break
    }
  }

  onSubmit(isDraft: boolean = false) {
    this.submitted = true
    this.isLoading = true
    if (this.formGroup.invalid) {
      return
    }
    const { value } = this.formGroup
    const data: IPost = {
      type: this.selectedType,
      scheduledTime: value.isPublishNow ? null : moment(value.date, 'MM-DD-YYYY').hour(value.time.hour).minute(value.time.minute).valueOf(),
      status: isDraft ? PostStatus.DRAFTED : PostStatus.PUBLISHED
    }
    switch (this.selectedType) {
      case PostType.COUPON:
        data.coupon = value.item
        break
      default:
        break
    }
    this.postApi.create(data).subscribe(() =>  this.isLoading = false)
  }

  onReset() {
    this.submitted = false
    this.formGroup.reset()
  }

  private buildTypes() {
    this.types = [{
      icon: 'fa-image',
      type: PostType.IMAGE,
      isSelected: false,
    }, {
      icon: 'fa-file-video',
      type: PostType.VIDEO,
      isSelected: false,
    }, {
      icon: 'fa-smile',
      type: PostType.STICKER,
      isSelected: false,
    }, {
      icon: 'fa-ticket-alt',
      type: PostType.COUPON,
      isSelected: true,
    }, {
      icon: 'fa-link',
      type: PostType.LINK,
      isSelected: false,
    }, {
      icon: 'fa-clipboard',
      type: PostType.SURVEY,
      isSelected: false,
    }]
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      date: [moment().format('MM-DD-YYYY')],
      time: [{
        hour: 0,
        minute: 0,
      }],
      isPublishNow: [true],
      item: [null, Validators.required]
    })

    const { date, time, isPublishNow } = this.controls

    isPublishNow.valueChanges.subscribe(value => {
      if (value) {
        date.setValidators(null)
        date.setErrors(null)
        time.setValidators(null)
        time.setErrors(null)
      } else {
        date.setValidators(Validators.required)
        time.setValidators(Validators.required)
      }
    })
  }

}
