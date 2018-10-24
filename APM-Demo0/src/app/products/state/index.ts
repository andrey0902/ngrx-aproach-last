
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';
import * as fromRoot from './../../state/app.state';

export interface State extends fromRoot.AppState {
  products: ProductState;
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getError = createSelector(
  getProductFeatureState,
  (state): string => {
    return state.error;
  }
);

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state): boolean => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state): number => {
    return state.currentProductId;
  }
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {

    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId
        ? state.products.find(p => {
          return p.id === currentProductId;
        })
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);
