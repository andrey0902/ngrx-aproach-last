import { Product } from '../product';
import { ProductActions, ProductActionTypes } from '../actions/product.action';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

export function reducer(state: ProductState = initialState, action: ProductActions): ProductState {

  switch (action.type) {

    case ProductActionTypes.DeleteProductSuccess:
      const prepareProducts = state.products.filter((p: Product) => {
        return action.payload !== p.id;
      });
      return {
        ...state,
        products: prepareProducts,
        currentProductId: null,
        error: ''
      };

    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductActionTypes.CreateProductSuccess:
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductActionTypes.UpdateProductSuccess:
      const updateProducts = state.products.map((p: Product) => {
        return action.payload.id === p.id ? action.payload : p;
      });

      return {
        ...state,
        currentProductId: action.payload.id,
        products: updateProducts,
        error: ''
      };

    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: [...action.payload],
        error: ''
      };

      case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
      case ProductActionTypes.SetCurrentProductId:
      return {
        ...state,
        currentProductId: action.payload
      };

    case ProductActionTypes.ClearCurrentProductId:
      return {
        ...state,
        currentProductId: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0,
      };

    default:
      return state;
  }
}

