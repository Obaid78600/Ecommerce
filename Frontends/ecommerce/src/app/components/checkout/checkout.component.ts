import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { State } from '../../common/state';
import { Country } from '../../common/country';
import { BehaviorSubject, Subject } from 'rxjs';
import { Purchase } from '../../common/purchase';
import { CheckoutService } from '../../services/checkout.service';
import { OrderItem } from '../../common/order-item';
import { Order } from '../../common/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  creditCardYears: number[] = [];
  creditCardMonths: number [] = [];

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  checkoutFormGroup!: FormGroup;

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  countries: Country[] = [];
  shippingAddressCountries: Country[] = [];
  billingAddressCountries: Country[] = [];
  
  constructor(  private cs : CartService, 
                private formBuilder: FormBuilder , 
                private luv2ShopFormService: Luv2ShopFormService , 
                private checkoutService : CheckoutService) { }
  
  ngOnInit(): void {

    // subscribe to the cart TotalPrice
    this.cs.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    // subscribe to the cart TotalQuantity
    this.cs.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    );

    // populate countries
    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved Countries:" + JSON.stringify(data));
        this.countries = data;
      }
    );

    // populate credit card Months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth : " + startMonth);
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        // When the Value is Hidden we use " JSON.stringify "
        console.log("Retrieved credit card Months : " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card Years
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card Years : " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('',[Validators.required , Validators.minLength(3)]),
        email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        number: new FormControl('',[Validators.required, Validators.minLength(9)])
      }),

      shippingAddress : this.formBuilder.group({
        country: [''],
        state: [''],
        City: new FormControl('',[Validators.required , Validators.minLength(3)]),
        Street: new FormControl('',[Validators.required]),
        pinCode: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{3,6}$')])
      }),

      billingAddress : this.formBuilder.group({
        country: [''],
        state: [''],
        city: new FormControl('',[Validators.required , Validators.minLength(3)]),
        street: new FormControl('',[Validators.required]),
        pinCode: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{3,6}$')])
      }),
      
      creditCard : this.formBuilder.group({
        cardType:[''],
        cardHolderName:new FormControl('',[Validators.required , Validators.minLength(3)]),
        cardNumber:new FormControl('',[Validators.required , Validators.minLength(16)]),
        cvv:new FormControl('',[Validators.required, Validators.minLength(3)]),
        expiryMonth:[''],
        expiryYear:['']
      }),

      reviewYourOrder : this.formBuilder.group({
        TotalQuantity:[''],
        shippingFree:[''],
        TotalPrice:['']
      })
    });
  } // NgOnTnit Method Ends here

  copyShippingAddressToBillingAddress(event : any){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
      // To Fix the Bug - Billing Address State
      this.billingAddressStates = this.shippingAddressStates;
    }else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  } // copyShippingAddressToBillingAddress Method Ends here

  handleMonthsAndYears(){

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')!;
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expiryYear);
    console.log('selected Year is : ' + selectedYear);
    

    let startMonth: number;
    if( selectedYear === currentYear ){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }
    
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card Months : " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  } // handleMonthsAndYears Method Ends here

  getStates(formGroupName: string){

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    // If a value is possibly null use " ! " or " ? "
    const countryCode = formGroup?.value.country.code;

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else{
          this.billingAddressStates = data;
        }

        // select first item by dfault
        console.log('Retrived States of CountryCode' + JSON.stringify(data));
        
      }
    );
  } // getStates Method Ends here

  getCountries(formGroupName: string){

    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressCountries = data;
        }else{
          this.billingAddressCountries = data;
        }
        // select first item by dfault
        formGroup?.get('country')?.setValue(data[0]);
      }
    );
  } // getCountries Method Ends here

  // Getter Method - To Give Validation Message 
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }

  get number(){
    return this.checkoutFormGroup.get('customer.number');
  }

  get City(){
    return this.checkoutFormGroup.get('shippingAddress.City');
  }

  get Street(){
    return this.checkoutFormGroup.get('shippingAddress.Street');
  }

  get city(){
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get street(){
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get cardHolderName(){
    return this.checkoutFormGroup.get('creditCard.cardHolderName');
  }

  get cardNumber(){
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get cvv(){
    return this.checkoutFormGroup.get('creditCard.cvv');
  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("First Name is : " + this.checkoutFormGroup.get('customer')?.value.firstName);
    console.log("Last Name is : " + this.checkoutFormGroup.get('customer')?.value.lastName);
    console.log("Email is : " + this.checkoutFormGroup.get('customer')?.value.email);
    console.log("Mobile No is : " + this.checkoutFormGroup.get('customer')?.value.number);

    console.log(this.checkoutFormGroup.get('shippingAddress')?.value);
    console.log("Country is : " + this.checkoutFormGroup.get('shippingAddress')?.value.country);
    console.log("State is : " + this.checkoutFormGroup.get('shippingAddress')?.value.state);
    console.log("City is : " + this.checkoutFormGroup.get('shippingAddress')?.value.city);
    console.log("Street is : " + this.checkoutFormGroup.get('shippingAddress')?.value.street);
    console.log("Pin Code is : " + this.checkoutFormGroup.get('shippingAddress')?.value.pinCode);

    console.log(this.checkoutFormGroup.get('billingAddress')?.value);
    console.log("Country is : " + this.checkoutFormGroup.get('billingAddress')?.value.Country);
    console.log("State is : " + this.checkoutFormGroup.get('billingAddress')?.value.State);
    console.log("City is : " + this.checkoutFormGroup.get('billingAddress')?.value.City);
    console.log("Street is : " + this.checkoutFormGroup.get('billingAddress')?.value.Street);
    console.log("Pin Code is : " + this.checkoutFormGroup.get('billingAddress')?.value.PinCode);

    console.log(this.checkoutFormGroup.get('creditCard')?.value);
    console.log("Card Type is : " + this.checkoutFormGroup.get('creditCard')?.value.cardType);
    console.log("CardHolder Name is : " + this.checkoutFormGroup.get('creditCard')?.value.CardHolderName);
    console.log("Card Number is : " + this.checkoutFormGroup.get('creditCard')?.value.cardNumber);
    console.log("Cvv is : " + this.checkoutFormGroup.get('creditCard')?.value.cvv);
    console.log("Expiry Month is : " + this.checkoutFormGroup.get('creditCard')?.value.expiryMonth);
    console.log("Expiry Year is : " + this.checkoutFormGroup.get('creditCard')?.value.expiryYear);

    console.log(this.checkoutFormGroup.get('reviewYourOrder')?.value);
    console.log("Total Quantity is : " + this.checkoutFormGroup.get('reviewYourOrder')?.value.TotalQuantity);
    console.log("Shipping is : " + this.checkoutFormGroup.get('reviewYourOrder')?.value.shippingFree);
    console.log("Total Price is : " + this.checkoutFormGroup.get('reviewYourOrder')?.value.TotalPrice);


// saving Order Steps: 

// 1 : Setup Order
let order = new Order();
order.totalPrice = this.totalPrice;
order.totalQuantity = this.totalQuantity;

// 2 : get Cart Items 
const cartItems = this.cs.cartItems;

// 3 : create orderItems from cartItems
let orderItems : OrderItem[] = [];
for( let i = 0; i < CartItem.length; i++ ){
  orderItems[i] = new OrderItem(cartItems[i]);
}

let orderItemInShort = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

// 4 : Setup purchase
let purchase = new Purchase();

// 5 : Populate purchase : customer
purchase.customer = this.checkoutFormGroup.controls['customer'].value;

// 6 : Populate purchase : shippingAddress
purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
const shippingAddressState : State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
const shippingAddressCountry : Country  = JSON.parse(JSON.stringify(purchase.shippingAddress.country));

purchase.shippingAddress.state = shippingAddressState.name;
purchase.shippingAddress.country = shippingAddressCountry.name;

// 7 : Populate purchase : billingAddress
purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
const billingAddressState : State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
const billingAddressCountry : Country  = JSON.parse(JSON.stringify(purchase.billingAddress.country));

purchase.billingAddress.state = billingAddressState.name;
purchase.billingAddress.country = billingAddressCountry.name;

// 8 : Populate purchase : order and orderItems
purchase.order = order;
purchase.orderItems = orderItemInShort;

// 9 : Call Rest API - 'http://localhost:8080/checkout/purchase' via the CheckoutService
this.checkoutService.placeOrder(purchase).subscribe();

  } // onSubmit Method Ends here
} // Main Class Ends here





