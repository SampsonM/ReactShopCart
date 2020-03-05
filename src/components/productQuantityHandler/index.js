import React, { useState } from 'react'

class ProductQuantityHandler extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			quantity: 0
		}

		this.increment = this.increment.bind(this)
		this.decrement = this.decrement.bind(this)
		this.remove = this.remove.bind(this)
	}

	async increment() {
		await this.setState((state) => ({quantity: state.quantity + 1}))
		this.props.updateProductTotal(this.state.quantity)
	}

	async decrement() {
		if (this.state.quantity > 0) {
		  await this.setState((state) => ({quantity: state.quantity - 1}))
			this.props.updateProductTotal(this.state.quantity)
		}
	}

	async remove() {
		if (this.state.quantity > 0) {
			await this.setState({quantity: 0})
			this.props.updateProductTotal(0)
		}
	}

	render() {
		return (
			<div className="product-qty-hndlr">
				<div className="product-qty-hndlr__counter">
					<button className="product-qty-hndlr__minus"
						onClick={this.decrement}>
						-
					</button>
	
					<p className="product-qty-hndlr__title">Qty: {this.state.quantity}</p>
	
					<button className="product-qty-hndlr__plus"
						onClick={this.increment}>
						+
					</button>
				</div>
	
				<button className="product-qty-hndlr__remove"
					onClick={this.remove}>
					Remove
				</button>
			</div>
		)
	}
}

export default ProductQuantityHandler
