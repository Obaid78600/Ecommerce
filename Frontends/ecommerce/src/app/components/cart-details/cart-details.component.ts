import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor( private cs : CartService ){}

  ngOnInit(){
    this.listCartDetails();
  } // ngOnInit Ends here

  listCartDetails() {
    //get a handle to the cart items
    this.cartItems = this.cs.cartItems

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

    // compute cart total price and total quantity
    this.cs.computeCartTotals();
  } // listCartDetails Method Ends here

  incrementQuantity( theCartItem: CartItem ){
    this.cs.addToCart(theCartItem);
  }

  decrementQuantity( theCartItem: CartItem ){
    this.cs.decrementQuantity(theCartItem);
  }

  removeQuantity( theCartItem: CartItem){
    this.cs.remove(theCartItem);
  }
} // Main Class Ends here
