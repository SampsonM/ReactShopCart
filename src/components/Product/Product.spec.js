import React from 'react'
import Product from './index'
import { shallow } from 'enzyme'

describe('Product', () => {
	let testProduct
	let productData

	describe('when product is mounted', () => {
		let mockUpdateProductTotal

		beforeEach(() => {
			mockUpdateProductTotal = jest.fn()

			productData = {
				name: 'test name',
				price: 10,
				img: 'https://testurl.test'
			}

			testProduct = shallow(<Product 
				{...productData}
				updateProductTotal={mockUpdateProductTotal} />)
		})

		afterEach(() => {
			jest.clearAllMocks()
		})

		test('it sets image attributes with passed props', () => {
			const image = testProduct.find('img')

			expect(image.prop('src')).toEqual(productData.img)
			expect(image.prop('alt')).toEqual(productData.name)
		})

		test('it renders the name prop into product name', () => {
			const name = testProduct.find('.product__name')

			expect(name.text()).toEqual(productData.name)
		})

		test('it renders the price prop in details prepended with currency', () => {
			const name = testProduct.find('.product__cost')

			expect(name.text()).toEqual(`£${productData.price}`)
		})

		test('updateBasketTotal is called with correct multiplied value when updateProductTotal is called', () => {
			testProduct.instance().updateProductTotal(10)

			expect(mockUpdateProductTotal).toHaveBeenCalledWith(100)
		})
	})
})
