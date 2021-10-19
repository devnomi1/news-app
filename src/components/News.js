import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    render() {
        return (
            <div className="container">
                this a news
						<NewsItem />
						<NewsItem />
						<NewsItem />
						<NewsItem />
						<NewsItem />

					</div>
				);
    }
}

export default News
