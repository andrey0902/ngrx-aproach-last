import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() pageTitle = 'Products';

  @Input() displayCode: boolean;
  @Input() products: Product[];
  @Input() errorMessage: string;
  @Input() selectedProduct: string;

  @Output() public toggleDisplayCode = new EventEmitter<boolean>();
  @Output() public initializeNewProduct = new EventEmitter();
  @Output() public selectProductSelected = new EventEmitter<Product>();

  checkChanged(value: boolean): void {
    this.toggleDisplayCode.emit(value);
  }

  newProduct(): void {
    this.initializeNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.selectProductSelected.emit(product);
  }

}
