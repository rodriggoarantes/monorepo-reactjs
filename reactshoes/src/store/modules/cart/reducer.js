import produce from 'immer';
import { types } from './actions';

export default function cart(state, action) {
  switch (action.type) {
    case types.ADD_SUCCESS:
      return produce(state, draft => {
        const { product } = action;
        draft.push(product);
      });
    case types.REMOVE:
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case types.AMOUNT_SUCCESS: {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state || [];
  }
}
