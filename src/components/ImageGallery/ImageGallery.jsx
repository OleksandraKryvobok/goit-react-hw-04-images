import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';

import { List } from './ImageGallery.styled';

const ImageGallery = ({ searchResult, toggleModal }) => {
    return(
        <List toggleModal={toggleModal} >
            {searchResult.map(img => {
                    return (
                        <ImageGalleryItem key={img.id} imageInfo={img} toggleModal={toggleModal} />
                    )
                })
            }
        </List>            
    );
};

export default ImageGallery;

ImageGallery.propTypes = {
    searchResult: PropTypes.array.isRequired,
    toggleModal: PropTypes.func.isRequired,
};