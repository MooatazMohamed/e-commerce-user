import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cardProduct:any[]=[]
  total:any=0
  success:boolean=false
constructor( private services : CardsService ){}
ngOnInit():void{
this.getCardProduct()
}
  getCardProduct(){
    if("cart" in localStorage){
      this.cardProduct = JSON.parse(localStorage.getItem("cart")!)
  }
  this.getCartTotal()
}
getCartTotal(){
  this.total=0
  for(let i in this.cardProduct){
    this.total+=this.cardProduct[i].item.price * this.cardProduct[i].quantity
    localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
  }
}
minusAmount(index:number){
  this.getCardProduct()
  this.cardProduct[index].quantity--
  localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
}
addAmount(index:number){
  this.getCardProduct()
  this.cardProduct[index].quantity++
  localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
}
detectChange(){ 
  /* Update local storage */
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
}
deleteProduct(index:number){
  this.cardProduct.splice(index,1)
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
}
clearShoppingCart(){
  this.cardProduct=[]
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
}
addCart(){
  let products = this.cardProduct.map(item =>{
   return {productId:item.item.id, quantity:item.quantity}
  })
  let Model = {
    userId:5,
    date: new Date(),
    products:products
  }
  this.services.createNewCart(Model).subscribe(res=>{
    this.success=true
  })
  console.log(Model)
}
}
