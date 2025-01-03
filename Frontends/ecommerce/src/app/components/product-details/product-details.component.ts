import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  theProduct: Product | undefined;
  constructor(private ps : ProductService , private route : ActivatedRoute , private cartService : CartService){}

  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.getProduct();
    });
  } // ngOnInit Ends here

  getProduct(){
    const productId: number =+this.route.snapshot.paramMap.get('id')!;
    this.ps.getProduct(productId).subscribe(
      data =>{
        // console.log(data);
        this.theProduct = data;
      }
    );
  } // getProduct Method Ends here

  addToCart(theProduct : Product){
    console.log(`Adding to Cart : ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  } // addToCart Method Ends here
} // Main Class Ends here
