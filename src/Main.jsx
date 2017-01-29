import React, { Component } from "react"
import { browserHistory } from "react-router"
import Navbar from "./Navbar.jsx"
import indexphoto from "../public/img/indexphoto.jpeg"

const styles = {
	photo: {
		backgroundImage: `url(${indexphoto})`,
		backgroundSize: "cover !important",
		backgroundRepeat: "no-repeat",
		height: "95vh",
		overflowX: "hidden",
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center"
	},
	header: {
		marginTop: "100px !important",
		textAlign: "center"
	},
	button: {
		marginTop: "200px !important",
		maxWidth: "300px !important"
	}
}
export default class Main extends Component {
	render(){
		return(
			<section>
				<Navbar/>
				<section style={styles.photo}>
					<h2 className="ui header"
						style={styles.header}
					>MovieMatcher</h2>
					<button	style={styles.button}
							onClick={() => {browserHistory.push("/matcher")}}
					>Matcher</button>
				</section>
			</section>
		)
	}
}