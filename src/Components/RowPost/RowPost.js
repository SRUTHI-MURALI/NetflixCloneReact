import React,{useEffect,useState} from 'react'
import './RowPost.css'
import axios from 'axios'
import {imageUrl,API_KEY} from '../../constants/constants'
import Youtube from 'react-youtube'

function RowPost(props) {

  const [movies,setMovies]= useState([])
  const [urlId,setUrlId]= useState('')
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      setMovies(response.data.results)
    }).catch(err=>{
      // alert('Network Error')
    })
    
  },[])
  const opts ={
    height:'390',
    width:'100%',
    playerVars:{
      autoplay:0
    },
  };
  const handleMovie = (id)=>{
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.length!==0){
        setUrlId(response.data.results[0])
      }else{
        console.log('array empty');
      }
    })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
       {movies.map((obj)=>
       <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' :'poster'} alt='poster' src= {`${imageUrl+ obj.backdrop_path}`} />
       )}
      </div>
      { urlId && <Youtube opts={opts} videoId= {urlId.key}/> }
    </div>
  )
}

export default RowPost
