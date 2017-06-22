/**
 * Created by Alexandra on 14.06.17.
 */

import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
	products: [],
	displayedProducts: [],
	ingredientsChecked: {
		beaf: false,
		chicken: false,
		pepper: false
	}
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_PRODUCTS_SUCCESS:
			return Object.assign({}, state, {
				products: action.products,
				displayedProducts: action.products
			});

		case types.FILTER_BY_SIZE:
			return Object.assign({}, state, {
				displayedProducts: action.displayedProducts
			});

		case types.FILTER_BY_INGREDIENTS:
			return Object.assign({}, state, {
				displayedProducts: action.displayedProducts,
				ingredientsChecked: action.ingredientsChecked
			});

		case types.SEARCH_PRODUCTS_SUCCESS:
			return Object.assign({}, state, {
				displayedProducts: action.displayedProducts
			});
	}

	return state;
};

export default productReducer;
