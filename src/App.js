import React from 'react'
import axios from 'axios'
import Product from './components/Product'
import ColourFilter from './components/colourFilter'
import { PRODUCT_URL } from './config/constants'

class App extends React.Component {
	constructor() {
		super()

		this.updateProductTotal = this.updateProductTotal.bind(this)
		this.updateFilterColour = this.updateFilterColour.bind(this)

		this.state = {
			products: [],
			filteredProducts: [],
			total: 0,
			colours: []
		}
	}

	async componentDidMount() {
		const response = await axios.get(PRODUCT_URL)
		const products = response.data.map(product => ({...product, quantityTotal: 0}))
		
		const colours = products.reduce((acc, p) => {
			if (acc.indexOf(p.colour) === -1) {
				acc.push(p.colour)
			}
			return acc
		}, [])
		
		this.setState({ products, filteredProducts: products, colours })
	}

	async updateProductTotal(productQuantityTotal, id) {
		const productIndex = this.state.products.findIndex(p => p.id === id)
		
		if (productIndex !== -1) {
			await this.setState((state) => ({
					products: [
						...state.products.slice(0,productIndex),
						Object.assign({}, state.products[productIndex], { quantityTotal: productQuantityTotal}),
						...state.products.slice(productIndex+1)
					]
				})
			)

			this.calculateTotal()
		}
	}

	calculateTotal() {
		const total = this.state.products.reduce((acc, product) => acc + product.quantityTotal, 0)
		this.setState({	total: total.toFixed(2) })
	}

	updateFilterColour(e) {
		const filterColour = e.target.value

		if (filterColour !== '') {
			const filteredProducts = this.state.products.filter(p => p.colour === filterColour)
			this.setState({ filteredProducts })
		} else {
			this.setState({ filteredProducts: this.state.products })
		}
	}

	render() {
		const Products = this.state.filteredProducts.map(product => 
			<Product
				key={product.id.toString()}
				{...product}
				updateProductTotal={this.updateProductTotal} />
		)

		return (
			<main className="shopping-cart">
				<h1 className="shopping-cart__header">PLT Shopping cart</h1>

				<ColourFilter
				 	colours={this.state.colours}
				 	updateFilterColour={this.updateFilterColour} />

				<ul className="product-list">
					{Products}
				</ul>

				<p className="shopping-cart__total">Total: £{this.state.total}</p>
			</main>
		)
	}
}

export default App
