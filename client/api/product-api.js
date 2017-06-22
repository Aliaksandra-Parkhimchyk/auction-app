/**
 * Created by Alexandra on 14.06.17.
 */

import axios from 'axios';
import store from '../store';
import * as actionCreators from '../actions/product-actions';

export function getProducts() {
	return axios
		.get(
			'https://api.mlab.com/api/1/databases/pizzashop/collections/products?apiKey=9BGZZA0zukVJrmfAYnnLeG7V2DiUQNY_'
		)
		.then(response => {
			store.dispatch(
				actionCreators.actionCreatorGetProductsSuccess(response.data)
			);
			return response;
		});
}

export function filterBySize(event, value, products) {
	let displayedProducts = [];

	if (value === 'all') {
		displayedProducts = products;
	} else {
		displayedProducts = products.filter(el => {
			return el.size === value;
		});
	}

	return store.dispatch(
		actionCreators.actionCreatorFilterBySize(displayedProducts)
	);
}

export function filterByIngredients(name, products, ingredientsChecked) {
	if (ingredientsChecked[name] === false) {
		ingredientsChecked[name] = true;
	} else {
		ingredientsChecked[name] = false;
	}

	let displayedProducts = products.filter(el => {
		let productChecked = true;
		for (let prop in ingredientsChecked) {
			if (
				ingredientsChecked.hasOwnProperty(prop) &&
				ingredientsChecked[prop] &&
				el.ingridients.indexOf(prop) < 0
			) {
				productChecked = false;
			}
		}
		return productChecked;
	});

	return store.dispatch(
		actionCreators.actionCreatorFilterByIngredients(
			displayedProducts,
			ingredientsChecked
		)
	);
}

export function searchProducts(value, products) {
	let searchQuery = value.toLowerCase();

	let displayedProducts = products.filter(el => {
		let searchValue = el.title.toLowerCase();
		return searchValue.indexOf(searchQuery) !== -1;
	});

	return store.dispatch(
		actionCreators.actionCreatorSearchProducts(displayedProducts)
	);
}
