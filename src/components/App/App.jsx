import { useState, useEffect, useCallback, useRef } from "react";
import { Searchbar } from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loading from '../Loader/Loader';
import Modal from '../Modal/Modal';
import axios from 'axios';
import styles from './App.module.css';
import Swal from 'sweetalert2'

axios.defaults.baseURL = "https://pixabay.com/api/";

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  const prevQueryRef = useRef();
  const prevPageRef = useRef();
  
  const fetchImages = useCallback(async () => {
    const API_KEY = '47297906-a9077d1cc59aa7be5c21f4292';
    setIsLoading(true);

    try {
      const response = await axios.get(`?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`);

      if(response.data.totalHits === 0) {
        Swal.fire({
          title: 'Error!',
          text: `No images found for '${query}'!`,
          icon: 'error',
          confirmButtonText: 'Try again'
        })
      }
      
      const newImages = response.data.hits.filter(
        hit => !images.some(image => image.id === hit.id)
      );

      setImages(prevImages => [...prevImages, ...newImages]);
      
    } catch (error) {
      console.error('Error fetching images:', error);  
    } finally {
      setIsLoading(false);
    }
  }, [query, page, images]);

  useEffect(() => {
    if (query && (prevQueryRef.current !== query || prevPageRef.current !== page)) {
      fetchImages();
      prevQueryRef.current = query;
      prevPageRef.current = page;
    }
  }, [query, page, fetchImages]);

  const handleSearchSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = (largeImageURL, alt) => {
    setLargeImageURL(largeImageURL);
    setAlt(alt);
    setShowModal(true);
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  }

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setAlt('');
  }

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleSearchSubmit}/>
      {<ImageGallery images={images} onImageClick={handleImageClick}/> }
        
      {isLoading && <Loading />}
      {images.length > 0 && <Button onClick={handleLoadMoreClick}/>}
      {showModal && <Modal largeImageURL={largeImageURL} alt={alt} onClose={closeModal} />}
    </div>
  );
};

export default App;