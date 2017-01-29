import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, browserHistory } from "react-router"

import Main from "./Main.jsx"
import Matcher from "./Matcher.jsx"
import About from "./About.jsx"

ReactDOM.render(
	<Router history={browserHistory}>
  		<Route path="/" component={Main}/>
  		<Route path="/matcher" component={Matcher}/>
  		<Route path="/about" component={About}/>
  	</Router>,
  document.getElementById("root")
);
