import React from 'react'
import ProductQauntityHanlder from '../productQuantityHandler'

class Product extends React.Component {
	constructor(props) {
		super(props)

		this.updateProductTotal = this.updateProductTotal.bind(this)
	}

	updateProductTotal(amountOfProduct) {
		const productTotal = this.props.price * amountOfProduct
		this.props.updateProductTotal(productTotal, this.props.id)
	}

	render() {
		return (
			<li className="product">
				<img
					className="product__image"
					src={this.props.img}
					alt={this.props.name} />

				<span className="product__details">
					<p className="product__name">{this.props.name}</p>
					<i className="product__cost">£{this.props.price}</i>
				</span>

				<ProductQauntityHanlder
					updateProductTotal={this.updateProductTotal} />
			</li>
		)
	}
}

export default Product
