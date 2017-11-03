import React, { Component } from "react"
import axios from "axios"
import { Divider } from "semantic-ui-react"

import Navbar from "./Navbar.jsx"
import MatcherForm from "./MatcherForm.jsx"
import MatcherMovies from "./MatcherMovies.jsx"

const API_URL = "https://api.themoviedb.org/3/discover/movie"
import key from "../config.js"

const styles = {
	footer: {
		textAlign: "center"
	}
}

export default class Matcher extends Component {
	state = {
		loading: false,
		movies: [],
		total_results: null,
		page: 0,
		lastSearched: ""
	}
	handleFormSubmit = (e, { formData}) => {
		e.preventDefault()
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
		this.setState({loading: true})
		axios.get(url)
			.then(res => {
				console.log("got data=", res)
				this.setState({
					loading: false,
					movies: res.data.results,
					total_results: res.data.total_results,
					page: res.data.page,
					lastSearched: url
				})
			})
			.catch(err => {
				this.setState({
					loading: false,
					movies: [],
					total_results: 0,
					page: null,
					lastSearched: url
				})
				console.log("Error occured=", err)
			})
	}
	nextPage = () => {
		const { lastSearched, page } = this.state
		let newSearchStr = ""
		if(lastSearched.includes("&page=")){
			const pageSplitted = lastSearched.split("&page=")
			newSearchStr += `${pageSplitted[0]}&page=${page + 1}`
			this.fetch(newSearchStr)
		} else {
			newSearchStr += `${lastSearched}&page=${page + 1}`
			this.fetch(newSearchStr)
		}
	}

	render(){
		const { total_results, movies, loading, page } = this.state
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
					nextPage={this.nextPage}
					page={page}
				/>
				<Divider hidden/>
				<p style={styles.footer}>Made by <a href="https://github.com/jkob">jkob</a> 2017</p>
			</section>
		)
	}
}

