import React, { Component } from "react"
import { Menu } from "semantic-ui-react"
import { browserHistory } from "react-router"

export default class Navbar extends Component {
	state = {activeItem: ""}
	handleItemClick = (e, { name }) => {
		this.setState({activeItem: name})
		if(name === "index") return browserHistory.push("/")
		browserHistory.push(`/${name}`)	
	}
	render(){
		const { activeItem } = this.state
		return (
			<nav>
				<Menu>
					<Menu.Item header
						name="index"
						onClick={this.handleItemClick}
					>MovieMatcher</Menu.Item>
					<Menu.Item
						name="matcher"
						active={activeItem === "matcher"}
						onClick={this.handleItemClick}
					> Matcher </Menu.Item>
					<Menu.Item
						name="about"
						active={activeItem === "about"}
						onClick={this.handleItemClick}
					> About </Menu.Item>
				</Menu>
			</nav>
		)
	}
}
