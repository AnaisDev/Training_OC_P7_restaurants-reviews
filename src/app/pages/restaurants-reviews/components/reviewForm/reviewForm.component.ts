import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'review-form',
  templateUrl: './reviewForm.component.html',
  styleUrls: ['./reviewForm.component.styl'],
})
export class ReviewFormComponent {
  @Input() restaurantName: string;
  checkoutForm;

  constructor(private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      rating: '',
      comment: '',
    });
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.checkoutForm.reset();

    console.warn('Your order has been submitted', customerData);
  }
}
