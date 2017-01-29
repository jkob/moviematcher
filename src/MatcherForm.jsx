import React, { Component, PropTypes } from "react"
import { Button, Form, Checkbox, Message } from "semantic-ui-react"

const styles = {
	Form: {
		margin: "0 30px"
	}
}

const categories = [
	{text: "Action", value: 28},
	{text: "Comedy", value: 35},
	{text: "Crime", value: 80},
	{text: "Documentary", value: 99},
	{text: "Drama", value: 18},
	{text: "Horror", value: 27},
	{text: "Romance", value: 10749},
	{text: "Thriller", value: 53}
]

const ratings = [
	{ key: "3", text: "3", value: "3" },
	{ key: "4", text: "4", value: "4" },
	{ key: "5", text: "5", value: "5" },
	{ key: "6", text: "6", value: "6" },
	{ key: "7", text: "7", value: "7" },
	{ key: "8", text: "8", value: "8" },
	{ key: "9", text: "9", value: "9" }
]

const release_year = [
	{ key: "2017", text: "2017", value: "2017"},
	{ key: "2016", text: "2016", value: "2016"}, 
	{ key: "2015", text: "2015", value: "2015"}, 
	{ key: "2014", text: "2014", value: "2014"}, 
	{ key: "2013", text: "2013", value: "2013"}, 
	{ key: "2012", text: "2012", value: "2012"}, 
	{ key: "2011", text: "2011", value: "2011"}, 
	{ key: "2010", text: "2010", value: "2010"}, 
	{ key: "2009", text: "2009", value: "2009"}, 
	{ key: "2008", text: "2008", value: "2008"}, 
	{ key: "2007", text: "2007", value: "2007"},
	{ key: "2006", text: "2006", value: "2006"},
	{ key: "2005", text: "2005", value: "2005"},
	{ key: "2004", text: "2004", value: "2004"},
	{ key: "2003", text: "2003", value: "2003"},
	{ key: "2002", text: "2002", value: "2002"},
	{ key: "2001", text: "2001", value: "2001"},
	{ key: "2000", text: "2000", value: "2000"}
]

const votecount = [
	{ key: "5", text: "5", value: "5"},
	{ key: "10", text: "10", value: "10"},
	{ key: "20", text: "20", value: "20"},
	{ key: "50", text: "50", value: "50"},
	{ key: "100", text: "100", value: "100"},
	{ key: "200", text: "200", value: "200"}
]

export default class MatcherForm extends Component {
	state = {
		formError: true,
		wantRatings: false,
		wantReleaseYear: false,
		wantVoteCountLimit: false,
		ratingValue: 0,
		voteCount: 0
	}
	toggleRatings = () => this.setState({wantRatings: !this.state.wantRatings})
	handleCategoryChange = (e, { value }) => {
		(value.length >= 1)
		?	this.setState({formError: false})
		:   this.setState({formError: true})
	} 
	setRating = (e, { value }) => this.setState({ ratingValue: value })
	setVoteCount = (e, { value }) => this.setState({voteCount: value })
	toggleReleaseYear = () => this.setState({wantReleaseYear: !this.state.wantReleaseYear})
	toggleVoteCountLimit = () => this.setState({wantVoteCountLimit: !this.state.wantVoteCountLimit})
	render(){
		const { formError, wantRatings, wantReleaseYear, wantVoteCountLimit } = this.state
		const { onSubmit, loading } = this.props
		return (
			<Form
				loading={loading}
				onSubmit={onSubmit}
				style={styles.Form}
			>
			<Form.Select multiple
				label="Select categories"
				options={categories} 
				placeholder="Find categories..." 
				name="Categories"
				onChange={this.handleCategoryChange}
			/>
			<Form.Group inline widths="equal">
				<Form.Checkbox toggle
						label="I want to limit by release year"
						name="enableReleaseYear"
						value="enableReleaseYear"
						onChange={this.toggleReleaseYear}
					/>
					{	wantReleaseYear
						?
						<Form.Select inline search
							label="Release year after: "
							options={release_year}
							name="ReleaseYear"
							placeholder="Release year..."
						/>
						: null
					}
			</Form.Group>
			<Form.Group inline widths="equal">
				<Form.Field>
					<Checkbox toggle
						label="I want to limit by ratings"
						name="enableRatings"
						value="enableRatings"
						onChange={this.toggleRatings}
					/>
				</Form.Field>
				{ wantRatings
					? 
					<Form.Select inline 
						label="Rating:"
						options={ratings}
						name="Rating"
						placeholder="Rating..."
						onChange={this.setRating}
					/>
					: null
				}
			</Form.Group>
			<Form.Group inline widths="equal">
				<Form.Field>
					<Checkbox toggle
						label="I want to limit by votes"
						name="enableVoteCountLimit"
						value="enableVoteCountLimit"
						onChange={this.toggleVoteCountLimit}
					/>
				</Form.Field>
				{	wantVoteCountLimit
					? <Form.Select inline
						label="VoteCount:"
						options={votecount}
						name="Vote_Count"
						placeholder="Votecount..."
						onChange={this.setVoteCount}
					/>
					: null
				}
			</Form.Group>
			<Button primary type="submit" disabled={formError}>Find movies</Button>
			{ formError
				? 
				<Message 
					icon="warning sign"
					header="Form Error"
					attached="bottom"
					onDismiss={null}
					content="Need to select atleast 1 category."
				/>
				: null
			}
			</Form>
		)
	}
}

MatcherForm.propTypes = {
	onSubmit: React.PropTypes.func,
}









/*

Form options: Categories, greater than X, How many movies you want.
User selects categories, greater than rating, year of release etc...
Data gets sent from form to parent.
Parent fetches movies with right criteria and displays them
Pairs the movies up 2 by 2 until 1 remains

*/