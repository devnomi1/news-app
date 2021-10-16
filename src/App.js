import "./App.css";

import React, { Component } from "react";
import News from "./components/News";
import Header from "./components/Header";

export default class App extends Component {
	render() {
    return (
			<div>
				<Header />
				<News pageSize={5} country="id" category="science" />
			</div>
		);
	}
}
