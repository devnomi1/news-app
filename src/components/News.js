import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes  from "prop-types";

export class News extends Component {
	static defaultProps = {
		country: "in",
		pageSize: 8,
		category:"general"
	}
	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
	}
	constructor() {
		super();
		console.log("Hello! I am constructor");
		this.state = {
			articles: [],
			loading: false,
			page: 1,
		};
	}
	async componentDidMount() {
		console.log("cdm");
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cateory}&apiKey=d82d9ea199004f48a833c5649c29cca4&page=1&pageSize=${this.props.pageSize}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		let parseData = await data.json();
		console.log(parseData);
		this.setState({
			articles: parseData.articles,
			totalResults: parseData.totalResults,
			loading:false
		});
	}
	prevPageBtn = async () => {
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cateory}&apiKey=d82d9ea199004f48a833c5649c29cca4&page=${
			this.state.page - 1
			}&pageSize=${this.props.pageSize}`;
			this.setState({ loading: true });
		let data = await fetch(url);
		let parseData = await data.json();
		this.setState({
			page: this.state.page -1,
			articles: parseData.articles,
			loading:false
		});
	};
	nextPageBtn = async () => {
		if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) 
			
		{
			let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cateory}&apiKey=d82d9ea199004f48a833c5649c29cca4&page=${
				this.state.page + 1
				}&pageSize=${this.props.pageSize}`;
			this.setState({loading:true})
			let data = await fetch(url);
			let parseData = await data.json();
			
			this.setState({
				page: this.state.page + 1,
				articles: parseData.articles,
				loading: false
			});
		}
	};
	render() {
		console.log("render");
		return (
			<div className="container">
				<h1 className="text-center">NewsMonkey- Top Headlines</h1>
				{this.state.loading && <Spinner />}
				<div className="row">
					{!this.state.loading && this.state.articles.map((element) => {
						return (
							<div className="col-md-4" key={element.url}>
								<NewsItem
									title={element.title ? element.title.slice(0, 45) : ""}
									description={
										element.description ? element.description.slice(0, 45) : ""
									}
									imageUrl={element.urlToImage}
									newsUrl={element.url}
								/>
							</div>
						);
					})}
				</div>
				<div className="container d-flex justify-content-between">
					<button
						disabled={this.state.page <= 1}
						type="button"
						className="btn btn-sm btn-dark"
						onClick={this.prevPageBtn}
					>
						&larr; Previous
					</button>
					<button
						disabled={
							this.state.page + 1 >
							Math.ceil(this.state.totalResults / this.props.pageSize)
						}
						type="button"
						className="btn btn-sm btn-dark"
						onClick={this.nextPageBtn}
					>
						Next &rarr;
					</button>
				</div>
			</div>
		);
	}
}

export default News;
