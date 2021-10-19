import "./App.css";

import React, { useState } from "react";
import News from "./components/News";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = (props) => {
	let pageSize = 5;
	const [progress, setProgress] = useState(0);

	return (
		<div>
			<Router>
				<Header />
				<LoadingBar height={3} color="#f11946" progress={progress} />

				<Switch>
					<Route exact path="/">
						<News
							setProgress={setProgress}
							Key="general"
							pageSize={props.pageSize}
							country="in"
							category="general"
						/>
					</Route>
					<Route exact path="/business">
						<News
							setProgress={setProgress}
							key="business"
							pageSize={props.pageSize}
							country="in"
							category="business"
						/>
					</Route>
					<Route exact path="/entertainment">
						<News
							setProgress={setProgress}
							Key="entertainment"
							pageSize={props.pageSize}
							country="in"
							category="entertainment"
						/>
					</Route>
					<Route exact path="/health">
						<News
							setProgress={setProgress}
							key="health"
							pageSize={props.pageSize}
							country="id"
							category="health"
						/>
					</Route>
					<Route exact path="/science">
						<News
							setProgress={setProgress}
							key="science"
							pageSize={props.pageSize}
							country="id"
							category="science"
						/>
					</Route>
					<Route exact path="/sports">
						<News
							setProgress={setProgress}
							key="sports"
							pageSize={props.pageSize}
							country="id"
							category="sports"
						/>
					</Route>
					<Route exact path="/technology">
						<News
							setProgress={setProgress}
							key="technology"
							pageSize={props.pageSize}
							country="id"
							category="technology"
						/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
};
export default App;
