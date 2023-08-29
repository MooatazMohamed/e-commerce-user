import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
   productList : any;
   categories : any;
   loading:boolean = false
   cardProduct:any[]= []
  constructor(private api : ProductsService){}

  ngOnInit(): void {
    this.getProducts()
    this.getSpecificCategory()
  }

  getProducts(){
    this.loading=true
    this.api.getAllProduct().subscribe(res=>{
      this.loading=false
      this.productList = res;
      console.log(res)
    }, error =>{
      alert("Error")
      this.loading=false
    })
  }
  getSpecificCategory(){
    this.loading=true

    this.api.getCategory().subscribe(res=>{
      this.loading=false
      this.categories = res;
      console.log(res)
    }, error =>{
      alert("Error")
    })
  }
    filterCategory(event:any){

    let value = event.target.value
    if(value == 'all'){
     this.getProducts()
    }
    else{
    this.getProductCategory(value)
    }
  }
  getProductCategory(keyWord:string){
    this.loading=true

    this.api.getProductByCategory(keyWord).subscribe(res =>{
      this.loading=false
      this.productList=res
    })
  }
addToCard(event:any){
  if("cart" in localStorage){
    this.cardProduct = JSON.parse(localStorage.getItem("cart")!)
    let exist = this.cardProduct.find(item=> item.item.id == event.item.id)
    if(exist){
      alert("Already exist")
    }else{
      this.cardProduct.push(event)
       localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
    }
  }else{
    this.cardProduct.push(event)
    localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
  }
/*    localStorage.setItem("card" ,JSON.stringify(event)) SEnd data
 */}
}
