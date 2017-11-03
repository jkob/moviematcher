import React from "react"
import { Container, Header, Divider, Message, Icon } from "semantic-ui-react"
import Navbar from "./Navbar.jsx"

const styles = {
	p_styles: {
		fontSize: "18px"
	}
}

const About = () => (
	<section className="wrapper">
		<Navbar/>
			<Divider hidden />
			<Container text>
				<Header as="h2">About</Header>
				<p style={styles.p_styles}>
					MovieMatcher was developed by <strong>Jakob Löfgren</strong>. This project was built as a hobby project.
					MovieMatcher's UI is built with React + React-Router, powered by the API provided by <a href="https://www.themoviedb.org/">TheMovieDB.org</a>.
					I also used <a href="http://react.semantic-ui.com">Semantic-Ui</a> to quickly develop a MVP.
				</p>
				<Header as="h2">Why</Header>
				<p style={styles.p_styles}>
					I developed this because I always have a hard time picking movies to watch. I'm quite picky (pun) when it comes to movies and
					IMDB's Top list is filled with too many old movies. I want movies from this centuary god damnit.
					If you want to see more projects developed by me, check out my GitHub
				</p>
				<Message icon>
					<Icon name="github" onClick={() => {window.open("https://github.com/jkob")}}/>
					<Message.Content>
						<Message.Header>More of my projects</Message.Header>
						Check out my <a href="https://github.com/jkob">GitHub</a>
					</Message.Content>
				</Message>
			</Container>
	</section>
)

export default About