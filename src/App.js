import React, { Component } from 'react'
import Album from './Album'
import './index.css'

class App extends Component{

  constructor(props){
    super(props)
    this.state = {data:[], filter:null}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    const discographyUrl = 'https://gist.githubusercontent.com/Srubens/08b35a87972ea65e0657c5ef4ece8f38/raw/5a7403ca86bf2828fa73161ca55771c9b0e449b5/albuns.json'
    
    fetch(discographyUrl)
    .then((result)=> result.json() )
    .then((result)=> {
      console.log(result)
      this.setState({ data:result.data || [] })
    } )
    .catch((error)=> {
      console.log('erro: ', error)
    })

  }

  handleSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    this.setState({ filter:data.q })
    console.log('submit', data)
  }

  applyFilter(data, filter){
    if(!filter) return data;
    
    const lowerFilter = filter.toLowerCase()

    return data.filter(item => {
      const lowerTitle = item.title.toLowerCase()
      return lowerTitle.indexOf(lowerFilter) !== -1
    } )
  }

  handleChange(event){
    const filter =  event.target.value
    this.setState({filter})
    console.log('change',filter)
  }


  render(){

    const {data, filter} = this.state

    const filteredData = this.applyFilter(data, filter)
    console.log('filter', filter)
    //CASO DE ERRO
    if(!data || !data.length) return (<h1>Carregando...</h1>)

    return(
      <>
        <div className="container" >
          <div className="main_header">
            <div><h1>Playlist</h1></div>
            <div>
              <form onSubmit={this.handleSubmit} >
                <input className="input-search" name="q" type="text" autoComplete="off" onChange={this.handleChange} />
                <input className="btn-search" type="submit" value="search" />
              </form>
            </div>
          </div>
          <div className="main">
            {filteredData.map((album) => <Album key={album.title} item={album} /> )}
          </div>
        </div>
      </>
    )
  }
}

export default App