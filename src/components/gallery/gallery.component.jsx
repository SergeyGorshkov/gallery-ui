import React from 'react'

import GalleryService from '../../services/gallery-service';
import ImageComponent from '../image/image.component';

import './galery.styles.css';

class GalleryComponent extends React.Component {
    
    static defaultProps = {
        updateInterval: 3000
    };

    galleryService = new GalleryService();
    
    state = {
        images: [],
        loading: true,
        countFilter: 0,
        autorefresh: false
    }

    componentDidMount(){
        this.updateImages();
    }

    UNSAFE_componentWillMount(){
        clearInterval(this.interval);
    }

    onImagesLoaded = images => {
        this.setState({
            images,
            loading: false
        });
    }

    onError = (err) => {
        this.setState({
            loading: false,
        });
    }

    updateImages = () => {
        this.galleryService
            .getImages()
            .then(this.onImagesLoaded)
            .catch(this.onError)
    }

    handleSlider = event => {
        const { value } = event.target;
        this.setState({
            countFilter: value
        });
    }

    onAutorefresh = () => {
        this.setState({ autorefresh: !this.state.autorefresh });
        
        if (!this.state.autorefresh) {
            const { updateInterval } = this.props;
            this.interval = setInterval(this.updateImages, updateInterval);
        } else {
            clearInterval(this.interval);            
        }
    }

    render () {
        const { images, loading, countFilter, autorefresh } = this.state;
        const viewImages = (countFilter ? images.filter(image => image.num_comments >= countFilter) : images)
            .sort((a, b) => b.num_comments - a.num_comments);
        
        const spinner = loading 
            ? <div>Loading...</div> 
            : (viewImages.length 
                ? viewImages.map(image => <ImageComponent key={ image.id } image={ image } />)
                : <div className='empty'>No results found matching your criteria</div>);
        
        return (
            <div className='gallery'>
                <div>
                    <span className='slidertitle'>Currrent filter: { countFilter }</span>
                    <button className='autorefresh' onClick={ this.onAutorefresh }>
                        { `${autorefresh ? 'Stop' : 'Start'} auto-refresh` } 
                    </button>
                    <input type="range" min="1" max="1000" value={ countFilter } className="slider" onChange={ this.handleSlider }/>
                </div>
                
                
                {
                    spinner
                }
            </div>
        );
    }
}

export default GalleryComponent;