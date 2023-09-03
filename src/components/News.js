import React, {useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component"


const News = (props)=>{

    const[articles, setArticals] = useState([]);
    const[loading, setLoading] = useState(false);
    const[page, setPage] = useState(1);
    const[totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
     }

     const updateNews =  async ()=>{
      props.setProgress(10);
      const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&page=${page}`;
      setLoading(true);
      let data= await fetch(url);
      props.setProgress(30);
      let parsedData= await data.json();
      props.setProgress(70);
      setArticals(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100)
     }

     useEffect(()=>{
        document.title = `NewsKatta - ${capitalizeFirstLetter(props.category)}`;
        updateNews();
        //eslint-disable-next-line
     }, [])

     const fetchMoreData = async ()=>{
      const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&page=${page + 1}`;
      setPage(page + 1);
      let data= await fetch(url);
      let parsedData= await data.json();
      setArticals(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults)
     }

     
    return (
      <>
        <h1 className='text-center' style={{margin: '30px 0px', marginTop: '90px'}}>NewsKatta - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
          <div className='row'>
            {articles && articles.map((element)=>{
               return <div className='col-md-4' key={element.url}>
                  <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
               </div>          
          })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className='container d-flex justify-content-between'>
          <button disabled={page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={page +1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pazeSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
