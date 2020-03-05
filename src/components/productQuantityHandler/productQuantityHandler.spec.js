import React from 'react'
import { shallow } from 'enzyme'
import ProductQuantityHanlder from './index'

describe('productQuantityHandler', () => {
	let testProductQtyHndlr

	describe('when product quantity handler is mounted', () => {
		let mockUpdateProductTotal

		beforeEach(() => {
			mockUpdateProductTotal = jest.fn()

			testProductQtyHndlr = shallow(<ProductQuantityHanlder 
				updateProductTotal={mockUpdateProductTotal} />)
		})

		afterEach(() => {
			jest.clearAllMocks()
		})

		test('it renders "Qty: 0" as text in component ', () => {
			const Qty = testProductQtyHndlr.find('.product-qty-hndlr__title')

			expect(Qty.text()).toEqual('Qty: 0')
		})

		test('when the decrement button is clicked the UpdateProductTotal prop is not called', () => {
			const decrementBtn = testProductQtyHndlr.find('.product-qty-hndlr__minus')
			decrementBtn.simulate('click')

			expect(mockUpdateProductTotal).not.toHaveBeenCalled()
		})

		test('when the increment button is clicked UpdateProductTotal prop is called with 1', () => {
			const incrementBtn = testProductQtyHndlr.find('.product-qty-hndlr__plus')
			incrementBtn.simulate('click')

			expect(mockUpdateProductTotal).toHaveBeenCalledWith(1)
		})

		test('when the remove button is clicked the UpdateProductTotal prop is not called', () => {
			const decrementBtn = testProductQtyHndlr.find('.product-qty-hndlr__remove')
			decrementBtn.simulate('click')

			expect(mockUpdateProductTotal).not.toHaveBeenCalled()
		})

		describe('when product quantity handler has quantity as 5', () => {
			beforeEach(() => {
				testProductQtyHndlr.setState({ quantity: 5 })
			})

			test('when the decrement button is clicked the quantity is lowered 1', () => {
				const decrementBtn = testProductQtyHndlr.find('.product-qty-hndlr__minus')
				decrementBtn.simulate('click')

				expect(testProductQtyHndlr.state('quantity')).toEqual(4)
			})

			test('when the decrement button is clicked the decrement prop funciton is called', () => {
				const decrementBtn = testProductQtyHndlr.find('.product-qty-hndlr__minus')
				decrementBtn.simulate('click')

				expect(mockUpdateProductTotal).toHaveBeenCalledWith(4)
			})

			test('when the remove button is clicked the quantity is set to 0', () => {
				const removeBtn = testProductQtyHndlr.find('.product-qty-hndlr__remove')
				removeBtn.simulate('click')

				expect(testProductQtyHndlr.state('quantity')).toEqual(0)
			})

			test('when the remove button is clicked the UpdateProductTotal is called with 0', () => {
				const removeBtn = testProductQtyHndlr.find('.product-qty-hndlr__remove')
				removeBtn.simulate('click')

				expect(mockUpdateProductTotal).toHaveBeenCalledWith(0)
			})
		})
	})
})