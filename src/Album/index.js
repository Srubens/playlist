import React, { Component } from 'react'

class Album extends Component{
    render(){

        const { link, image, title, release_date } = this.props.item

        return(
            <div className="content" >
                <a href={link} className="main_tag" target="_blank" rel="noopener noreferrer" >
                    <div className="cover" >
                        <img src={image} alt={title} title={title} />
                    </div>
                    <div>
                        <h2>{title}</h2>
                    </div>
                    <div>
                        <span>{release_date}</span>
                    </div>
                </a>
            </div>
        )
    }
}

export default Album