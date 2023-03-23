import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { GlobalStyle } from "./GlobalStyle";
import { Layout, ErrorMessage } from "./Layout";

import ImageGallery from "./ImageGallery";
import Searchbar from "./Searchbar";
import Modal from "./Modal";
import Button from "./Button";
import Loader from 'components/Loader';

import fetchGallery from 'services/pokemon-api';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [imageInfo, setImageInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImgs, setTotalImgs] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (searchValue) => {
    setSearchValue(searchValue);
    setPage(1);
    setSearchResult([]);
    if(searchValue === '') {
      setLoading(false);
      setError(null);
      setShowButton(false);
      return;
    }
    setLoading(true);
  };

  useEffect(() => {
    if(searchValue === '') {
      return;
    };

    async function fetch() {
      try {
        const photos = await fetchGallery(searchValue, page);

        if(photos.hits.length === 0) {
          throw new Error('There are no images matching. Please try again');
        };

        if(page === 1) {
          setSearchResult(photos.hits);
        } else {
          setSearchResult(searchResult => [...searchResult, ...photos.hits]);
        }
          
        setTotalImgs(photos.total);
        setShowButton(true);
        setError(null);
      } catch (error) {
        setError(error);
        setShowButton(false);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [searchValue, page]);

  const handleBtnClick = () => {
      setPage(prevState => page + 1);
  };
  
  const toggleModal = (imageInfo) => {
    setShowModal(showModal => !showModal);
    setImageInfo(imageInfo);
  };

  return (
    <Layout>
        <Toaster />
        <GlobalStyle />
        <Searchbar onSearch={handleSubmit} />

        <ImageGallery 
          searchResult={searchResult} 
          toggleModal={toggleModal} />

        {loading && <Loader />}
        {error && !loading && <ErrorMessage>{error.message}</ErrorMessage>}

        {showButton && 
        searchResult.length < totalImgs &&
        !loading &&  
        <Button onBtnClick={handleBtnClick} />}

        {showModal && 
        <Modal onClose={toggleModal}>
          <img src={imageInfo.largeImageURL} alt={imageInfo.tags} />    
        </Modal>}
    </Layout>
  );
};
