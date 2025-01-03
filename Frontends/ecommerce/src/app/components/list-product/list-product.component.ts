import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {

  products : Product[] = [];
  currentCategoryId : number = 1;
  previousCategoryId: number = 1;

  // new properties for Pagination
  thePageNumber : number = 1;
  thePageSize : number = 10;
  theTotalElements : number = 0;

  constructor (private ps: ProductService , private route : ActivatedRoute , private cs: CartService){}

  ngOnInit(){
      this.route.paramMap.subscribe(()=> {
      this.getAllProducts();
    });
  } // ngOnInit Ends here

  getAllProducts(){
    const hasKeyword: boolean = this.route.snapshot.paramMap.has('keyword');

    if(hasKeyword){
      this.searchByKeyword();
    }else{
      // Default products by Category
      this.productsByCategory();
    }
  } // getAllProducts Method Ends here

  searchByKeyword(){
    // only display list of search products
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.ps.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  } // searchByKeyword Method Ends here

  productsByCategory(){
    // check whether parameter 'id' is available
    const hascategoryId = this.route.snapshot.paramMap.has('id');
    if(hascategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }

    // check if we have different category than previous
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    // update previous category id
    this.previousCategoryId = this.currentCategoryId;

    // call new method : getProductListPaginate
    this.ps.getProductListPaginate( this.thePageNumber - 1,
                                    this.thePageSize,
                                    this.currentCategoryId).subscribe(
                                      data => {
                                        this.products = data._embedded.products;
                                        this.thePageNumber = data.page.number + 1;
                                        this.thePageSize = data.page.size;
                                        this.theTotalElements = data.page.totalElements;
                                      }
                                    );

    // this.ps.getProducts(this.currentCategoryId).subscribe(
      // data => {
        // this.products = data;
      // }
    // );

    // verification
    // console.log('current categoryId:'+this.currentCategoryId);


    // this.ps.getProducts(this.currentCategoryId).subscribe(
      // data =>{
        // console.log(data);
        // this.products = data;
      // }
    // );
  } // productsByCategory Method Ends here

  updatePageSize(pageSize: string){
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.getAllProducts();
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart : ${theProduct.name} , ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cs.addToCart(theCartItem);
  } // addToCart Method Ends here
} // Main Class Ends here

