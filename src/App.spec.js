import React from 'react'
import App from './App'
import { shallow } from 'enzyme'
import axios from 'axios'
import { flushPromises } from './helpers'
import Product from './components/Product'

jest.mock('axios')

describe('App', () => {
	let testApp
	let data

	async function setUp(data) {
		axios.get.mockImplementationOnce(() => Promise.resolve({ data }))
		testApp = shallow(<App/>)
		await flushPromises()
	}

	describe('When app is mounted', () => {	
		test('it fetches latest products and saves to state.products with quantityTotal as 0', async () => {
			data = [{name:'test data', id: 1}]
			await setUp(data)

			expect(testApp.state('products')).toEqual([{...data[0], quantityTotal: 0}])
		})

		test('it creates a list of unique colours from products available', async () => {
			data = [{id: 1, colour: 'white'}, {id: 1, colour: 'white'}, {id: 1, colour: 'black'}]
			await setUp(data)

			expect(testApp.state('colours')[0]).toEqual('white')
			expect(testApp.state('colours')[1]).toEqual('black')
		})

		test('it renders a list of products', async () => {
			data = [{name: 'tshirt', id: 1},{name: 'jeans', id: 2},{name: 'trainers', id: 3}]
			await setUp(data)

			const products = testApp.find(Product)

			expect(products.length).toEqual(data.length)
		})

		test('updateProductTotal updates correct product via passed id', async () => {
			data = [{name: 'tshirt', id: 1},{name: 'jeans', id: 2},{name: 'trainers', id: 3}]
			await setUp(data)
			const TEST_PRODUCT_ID = 2

			testApp.instance().updateProductTotal(100, TEST_PRODUCT_ID)

			const expectedProduct = testApp.state('products').filter(p => p.id === TEST_PRODUCT_ID)[0]

			expect(expectedProduct.quantityTotal).toEqual(100)
		})

		test('when updateProductTotal is called the total is recalculated', async () => {
			data = [{name: 'tshirt', id: 1},{name: 'jeans', id: 2},{name: 'trainers', id: 3}]
			await setUp(data)

			testApp.instance().updateProductTotal(100, 1)
			await testApp.instance().updateProductTotal(100, 3)

			expect(testApp.state('total')).toEqual('200.00')
		})

		test('the total is rendered on screen', async () => {
			data = [{name: 'tshirt', id: 1},{name: 'jeans', id: 2},{name: 'trainers', id: 3}]
			await setUp(data)

			await testApp.instance().updateProductTotal(100, 3)

			expect(testApp.find('.shopping-cart__total').text()).toEqual('Total: £100.00')
		})

		test('when updateProductTotal is called filteredProducts are updated', async () => {
			data = [{colour: 'black', id: 1},{colour: 'white', id: 2},{colour: 'black', id: 3}]
			await setUp(data)

			testApp.instance().updateFilterColour({target: { value: 'black'}})

			expect(testApp.state('filteredProducts')[0].id).toEqual(1)
			expect(testApp.state('filteredProducts')[1].id).toEqual(3)
		})

		test('when updateProductTotal is called with default value filteredProducts are updated', async () => {
			data = [{colour: 'black', id: 1},{colour: 'white', id: 2},{colour: 'black', id: 3}]
			await setUp(data)

			testApp.instance().updateFilterColour({target: { value: 'black'}})
			expect(testApp.state('filteredProducts')[1].id).toEqual(3)

			testApp.instance().updateFilterColour({target: { value: ''}})

			expect(testApp.state('filteredProducts')[0].id).toEqual(1)
			expect(testApp.state('filteredProducts')[1].id).toEqual(2)
		})
	})
})
