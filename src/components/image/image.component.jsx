import React from 'react';

import './image.styles.css';

const ImageComponent = ({ image }) => {
    const { thumbnail, title, num_comments, permalink } = image;
    
    return (
        <div className='image'>
            <img src={ thumbnail } alt="item"/>
            <span className="title">{ title }</span>
            <span className="comment">Number of comments: { num_comments }</span>
            <a href={ permalink } className='link'>Link</a>
        </div>
    );
} 

export default ImageComponent;