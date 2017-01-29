import React, { Component } from "react"
import { browserHistory } from "react-router"
import { Header, Container, Button } from "semantic-ui-react"
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
		fontSize: "1.5em"
	},
	button: {
		fontSize: "20px"
	},
	p: {
		fontSize: "20px"
	}
}
export default class Main extends Component {
	render(){
		return(
			<section>
				<Navbar/>
				<section style={styles.photo}>
					<Container text>
						<Header as="h2" style={styles.header}>MovieMatcher</Header>
							<Button fluid={false}
								style={styles.button}
								color="red"
								onClick={() => {browserHistory.push("/matcher")}}
							>Go to MovieMatcher</Button>
							<p style={styles.p}>
								MovieMatcher is an application to browse and find movies to watch. <br/>
								It's simple to use and provides help to get trailers and even streaming sources
							</p>
					</Container>
				</section>
			</section>
		)
	}
}
