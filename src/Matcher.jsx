import React, { Component } from "react"
import axios from "axios"
import { Divider } from "semantic-ui-react"

import Navbar from "./Navbar.jsx"
import MatcherForm from "./MatcherForm.jsx"
import MatcherMovies from "./MatcherMovies.jsx"

const API_URL = "https://api.themoviedb.org/3/discover/movie"
import key from "../config.js"


export default class Matcher extends Component {
	state = {
		loading: false,
		movies: [],
		total_results: null,
		page: null,
	}
	handleFormSubmit = (e, { formData}) => {
		e.preventDefault()
		console.log(formData)
		let genreString = "&with_genres="
		if(formData.Categories.length >= 1){
			genreString += formData.Categories[0]
		} else {
			formData.Categories.forEach(c => genreString += `${c};`)
		}

		let ratingsString = ""
		if(formData.enableRatings){
			ratingsString += `&vote_average.gte=${formData.Rating}`
		}

		let releaseDate = ""
		if(formData.enableReleaseYear){
			releaseDate += `&release_date.gte=${formData.ReleaseYear}`
		}

		let voteCount = (formData.enableVoteCountLimit === "enableVoteCountLimit") 
			? `&vote_count.gte=${formData.Vote_Count}`
			: ""
		const completeURL = `${API_URL}?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=true${genreString}${ratingsString}${releaseDate}${voteCount}`
		this.fetch(completeURL)
	}
	fetch = (url) => {
		console.log("Fetching url=", url)
		this.setState({loading: true})
		axios.get(url)
			.then(res => {
				console.log("got data=", res)
				this.setState({
					loading: false,
					movies: res.data.results,
					total_results: res.data.total_results,
					page: res.data.page
				})
			})
			.catch(err => {
				this.setState({
					loading: false,
					movies: [],
					total_results: 0,
					page: null
				})
				console.log("Error occured=", err)
			})
	}

	render(){
		console.log("state=", this.state)
		const { total_results, movies, loading } = this.state
		return (
			<section>
				<Navbar/>
				<Divider hidden/>
				 <MatcherForm
				 	loading={loading}
					onSubmit={this.handleFormSubmit}
				/> 
				<Divider />
				<MatcherMovies
					total_results={total_results}
					movies={movies}
				/>
				<Divider hidden/>
				<Divider hidden/>
				<Divider hidden/>
				<button onClick={() => this.setState({loading: !this.state.loading})}>ToggleLoading</button>
			</section>
		)
	}
}


/*
const fake_results = [{
      "poster_path": "/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
      "adult": false,
      "overview": "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order. There's Max, a man of action and a man of few words, who seeks peace of mind following the loss of his wife and child in the aftermath of the chaos. And Furiosa, a woman of action and a woman who believes her path to survival may be achieved if she can make it across the desert back to her childhood homeland.",
      "release_date": "2015-05-13",
      "genre_ids": [
        28,
        12,
        878,
        53
      ],
      "id": 76341,
      "original_title": "Mad Max: Fury Road",
      "original_language": "en",
      "title": "Mad Max: Fury Road",
      "backdrop_path": "/tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg",
      "popularity": 38.859482,
      "vote_count": 6374,
      "video": false,
      "vote_average": 7.1
    },
    {
      "poster_path": "/qjiskwlV1qQzRCjpV0cL9pEMF9a.jpg",
      "adult": false,
      "overview": "A rogue band of resistance fighters unite for a mission to steal the Death Star plans and bring a new hope to the galaxy.",
      "release_date": "2016-12-14",
      "genre_ids": [
        28,
        12,
        14,
        878
      ],
      "id": 330459,
      "original_title": "Rogue One: A Star Wars Story",
      "original_language": "en",
      "title": "Rogue One: A Star Wars Story",
      "backdrop_path": "/tZjVVIYXACV4IIIhXeIM59ytqwS.jpg",
      "popularity": 28.730003,
      "vote_count": 1911,
      "video": false,
      "vote_average": 7.2
    },
    {
      "poster_path": "/inVq3FRqcYIRl2la8iZikYYxFNR.jpg",
      "adult": false,
      "overview": "Based upon Marvel Comics’ most unconventional anti-hero, DEADPOOL tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.",
      "release_date": "2016-02-09",
      "genre_ids": [
        28,
        12,
        35,
        10749
      ],
      "id": 293660,
      "original_title": "Deadpool",
      "original_language": "en",
      "title": "Deadpool",
      "backdrop_path": "/nbIrDhOtUpdD9HKDBRy02a8VhpV.jpg",
      "popularity": 13.843559,
      "vote_count": 6299,
      "video": false,
      "vote_average": 7.2
    }]
*/