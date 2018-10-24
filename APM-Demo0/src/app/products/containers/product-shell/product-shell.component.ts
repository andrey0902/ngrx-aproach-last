import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../state/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { getCurrentProduct, getError, getProducts } from '../../state';
import { Product } from '../../product';
import * as fromProductReducer from './../../state';
import * as productAction from './../../actions/product.action';
@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  pageTitle = 'Products';
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  products: Product[];
  errorMessage$: Observable<string>;
  selectedProduct$: Observable<Product>;
    constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new productAction.Load());
    this.products$ = this.store.pipe(select(getProducts));
    this.errorMessage$ = this.store.pipe(select(getError));
    this.displayCode$ =  this.store.pipe(
      select(fromProductReducer.getShowProductCode)
    );
    this.selectedProduct$ =  this.store.pipe(
      select(getCurrentProduct));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productAction.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productAction.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productAction.SetCurrentProductId(product.id));
  }

  deleteProduct(productId: number): void {
    this.store.dispatch(new productAction.DeleteProduct(productId));
  }

  clearProduct(): void {
    this.store.dispatch(new productAction.ClearCurrentProductId());
  }

  createProduct(p: Product): void {
    this.store.dispatch(new productAction.CreateProduct(p));
  }

  updateProduct(p: Product): void {
    this.store.dispatch(new productAction.UpdateProduct(p));
  }
}
