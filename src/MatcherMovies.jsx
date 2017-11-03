import React, { Component, PropTypes } from "react"
import { Header, Icon, Button, Grid, Message, Divider } from "semantic-ui-react"

import MovieMarkup from "./MovieMarkup.jsx"

const styles = {
	grid: {
		margin: "0 30px"
	}
}

export default class MatcherMovie extends Component {
	render(){
		const { total_results, movies, nextPage, page } = this.props
		const mapped = movies.map((c,i) => 
			<Grid.Column key={i}>
				<MovieMarkup 
					title={c.title}
					overview={c.overview}
					vote_average={c.vote_average}
					vote_count={c.vote_count}
					poster_path={c.poster_path}
					genres_ids={c.genre_ids}
					release_date={c.release_date}
				/>
			</Grid.Column>
		)
		return (
			<section>
				{	page >= 1
					?	<Header as="h2" textAlign="center">Current page: {page}.</Header>
					: null
				}
				<Grid columns={3} style={styles.grid} stackable>
					{mapped}
				</Grid>
				<Divider hidden />
					{
						(mapped.length > 1)
						?
						<Button 
							fluid={true}
							color="orange"
							size="medium"
							onClick={nextPage}
						><Icon name="search"/>Go to page: {page + 1}.</Button>
						: 
							(total_results === 0)
							?	<Message 
								icon="warning sign"
								header="Try again"
								content="No results for that search. Please try a diffrent method."
								/>
							: null

					}
			</section>
		)
	}
	componentDidUpdate(){
		window.scrollTo(0, 0)
	}
}

MatcherMovie.propTypes = {
	movies: PropTypes.array.isRequired,
	nextPage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired
}
