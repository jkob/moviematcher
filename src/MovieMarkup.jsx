import React from "react"
import { Card, Label, Divider, Icon, Image, Item, Button, Grid, Message, Modal, Rating, Segment } from "semantic-ui-react"

const genres =	[
	{ "id": 28, "name": "Action" },
	{ "id": 12, "name": "Adventure" },
	{ "id": 16, "name": "Animation" },
	{ "id": 35, "name": "Comedy" },
	{ "id": 80, "name": "Crime" },
	{ "id": 99, "name": "Documentary" },
	{ "id": 18, "name": "Drama"},
	{ "id": 10751, "name": "Family" },
	{ "id": 14, "name": "Fantasy" },
	{ "id": 36, "name": "History" },
	{ "id": 27, "name": "Horror" },
	{ "id": 10402, "name": "Music" },
	{ "id": 9648, "name": "Mystery" },
	{ "id": 10749, "name": "Romance" },
	{ "id": 878, "name": "Science Fiction" },
	{ "id": 10770, "name": "TV Movie" },
	{ "id": 53, "name": "Thriller" },
	{ "id": 10752, "name": "War" },
	{ "id": 37, "name": "Western" }
]

const MovieMarkup = ({title, overview, genres_ids, vote_average, poster_path, release_date}) => (
	<Card>
		<Card.Content>
			<Card.Header>{title}</Card.Header>
			<Card.Meta>Action, Thriller</Card.Meta>
			<Card.Description>
				<Image src={`https://image.tmdb.org/t/p/w500/${poster_path}`} size="medium"/>
			</Card.Description>
			<Modal trigger={<Button color="teal">More about {title.substr(0,15)}...</Button>}
				closeIcon="close"
			>
				<Modal.Header>{title}</Modal.Header>
				<Modal.Content>
					<Image src={`https://image.tmdb.org/t/p/w500/${poster_path}`} size="medium" floated="left"/>
					<Rating disabled defaultRating={vote_average} maxRating={10}/>
					<Label.Group size="medium">
						{genres_ids.map((c,i) => <Label key={i}>{genres[genres.map(e => e.id).indexOf(c)].name}</Label>)}
					</Label.Group>
					<Label>Released: {release_date}</Label>
					<Divider />
					<p>{overview}</p>
					<Divider />
				</Modal.Content>
				<Modal.Actions>
					<Button color="youtube"
						onClick={() => {window.open(`https://www.youtube.com/results?sp=CAASBBABGAE%253D&q=${title.split(" ").join("+")}`)}}
					>
						<Icon name="youtube play"/> Watch trailer
					</Button>
					<Button color="violet"
						onClick={() => {window.open(`https://fmovies.se/search?keyword=${title.split(" ").join("+")}`)}}
					>
						<Icon name="tv"/> Watch on Fmovies.se
					</Button>
				</Modal.Actions>
			</Modal>
		</Card.Content>
		<Card.Content extra>
			Average: <Icon name="star"/> <strong>{vote_average}/10</strong>
		</Card.Content>
	</Card>
)


/*
<Message icon>
						<Icon name="tv"/>
						<Message.Content>
							<Message.Header>Try streaming online</Message.Header>
							Try using <a href={`https://fmovies.se/search?keyword=${title.split(" ").join("+")}`}>Fmovies.se</a> to stream this movie.
						</Message.Content>
					</Message>
*/

export default MovieMarkup