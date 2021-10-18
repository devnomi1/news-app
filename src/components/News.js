import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
	static defaultProps = {
		country: "in",
		pageSize: 8,
		category: "general",
	};
	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
	};
	capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	constructor(props) {
		super(props);
		console.log("Hello! I am constructor");
		this.state = {
			articles: [],
			loading: false,
			page: 1,
			totalResults: 0,
		};
		document.title = `${this.capitalizeFirstLetter(
			this.props.category
		)} - NewsMonkey`;
	}
	async updatesNews() {
		this.props.setProgress(10)
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d82d9ea199004f48a833c5649c29cca4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		this.props.setProgress(30);
		let parseData = await data.json();
		this.props.setProgress(70);
		
		this.setState({
			articles: parseData.articles,
			totalResults: parseData.totalResults,
			loading: false,
		});
		this.props.setProgress(100);
	}
	async componentDidMount() {
		this.updatesNews();
	}
	// prevPageBtn = async () => {
	// 	this.setState({
	// 		page: this.state.page - 1,
	// 	});
	// 	this.updatesNews();
	// };
	// nextPageBtn = async () => {
	// 	this.setState({
	// 		page: this.state.page + 1,
	// 	});
	// 	this.setState({
	// 		page: this.state.page + 1,
	// 	});
	// };
	fetchMoreData = async () => {
		this.setState({
			page: this.state.page + 1,
		});
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d82d9ea199004f48a833c5649c29cca4&page=${this.state.page}&pageSize=${this.props.pageSize}`;

		let data = await fetch(url);
		let parseData = await data.json();
		console.log(parseData);
		this.setState({
			articles: this.state.articles.concat(parseData.articles),
			totalResults: parseData.totalResults,
		});
	};

	render() {
		console.log("render");
		return (
			<>
				<h1 className="text-center" style={{ margin: "35px 0px" }}>
					NewsMonkey- Top {this.capitalizeFirstLetter(this.props.category)}{" "}
					Headlines
				</h1>
				{this.state.loading && <Spinner />}
				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length !== this.state.totalResults}
					loader={<Spinner />}
				>
					<div className="container">
						<div className="row">
							{this.state.articles.map((element) => {
								return (
									<div className="col-md-4" key={element.url}>
										<NewsItem
											title={element.title ? element.title.slice(0, 45) : ""}
											description={
												element.description
													? element.description.slice(0, 45)
													: ""
											}
											imageUrl={element.urlToImage}
											newsUrl={element.url}
											author={element.author}
											date={element.publishedAt}
											source={element.source.name}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</InfiniteScroll>
			</>
		);
	}
}

export default News;
