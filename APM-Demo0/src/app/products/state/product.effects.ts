import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productAction from './../actions/product.action';
import { mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Product } from '../product';
import { LoadSuccess } from '../actions/product.action';
import { catchError } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs/index';
import { Action } from '@ngrx/store';
@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions,
              private productService: ProductService) {
  }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productAction.ProductActionTypes.Load),
    mergeMap((action: productAction.Load) => {
      return this.productService.getProducts()
        .pipe(
          map((products: Product[]) => {
            return new LoadSuccess(products);
          }),
          catchError(err => of(new productAction.LoadFail(err)))
        );
    })
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productAction.ProductActionTypes.UpdateProduct),
    map((action: productAction.UpdateProduct) => action.payload),
    mergeMap((product: Product) => {
       return this.productService.updateProduct(product)
          .pipe(
            map((response: Product) => new productAction.UpdateProductSuccess(response)),
            catchError(err => of(new productAction.UpdateProductFail(err)))
          );
    })
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productAction.ProductActionTypes.CreateProduct),
    map((action: productAction.CreateProduct) => action.payload),
    mergeMap((product: Product) => {
      return this.productService.createProduct(product)
          .pipe(
            map((response: Product) => new productAction.CreateProductSuccess(response)),
            catchError(err => of(new productAction.CreateProductFail(err)))
          );
    })
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productAction.ProductActionTypes.DeleteProduct),
    map((action: productAction.DeleteProduct) => action.payload),
    mergeMap((productId: number) => {
      return this.productService.deleteProduct(productId)
        .pipe(map((response: any) => new productAction.DeleteProductSuccess(productId)),
          catchError(err => of(new productAction.DeleteProductFail(err)))
        );
    })
  );
}
