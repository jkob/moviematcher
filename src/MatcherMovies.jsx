import React, { Component, PropTypes } from "react"
import { Card, Icon, Image, Item, Button, Grid, Message, Modal, Segment, Divider, Loader, Rating, } from "semantic-ui-react"
import MovieMarkup from "./MovieMarkup.jsx"
const styles = {
	grid: {
		margin: "0 30px"
	}
}

export default class MatcherMovie extends Component {
	render(){
		const { noResults, responseData, nextPage } = this.props
		const mapped = responseData.results.map((c,i) => 
			<Grid.Column key={i}>
				<MovieMarkup 
					title={c.title}
					overview={c.overview}
					vote_average={c.vote_average}
					poster_path={c.poster_path}
					genres_ids={c.genre_ids}
					release_date={c.release_date}
				/>
			</Grid.Column>
		)
		return (
			<section>
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
						><Icon name="search"/>Load more</Button>
						: 
							noResults
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
}

MatcherMovie.PropTypes = {
	responseData: React.PropTypes.object
}
