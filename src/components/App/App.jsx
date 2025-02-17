import { Component } from "react";
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loading from '../Loader/Loader';
import Modal from '../Modal/Modal';
import axios from 'axios';
import styles from './App.module.css';
import Swal from 'sweetalert2'

axios.defaults.baseURL = "https://pixabay.com/api/";

class App extends Component {
  state= {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    alt: '',
  }

  async fetchImages() {
    const { query, page } = this.state;
    const API_KEY = '47297906-a9077d1cc59aa7be5c21f4292';
    this.setState({ isLoading: true });

    try {
      const response = await axios.get(`?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`);

      if(response.data.totalHits === 0) {
        Swal.fire({
          title: 'Error!',
          text: 'No images found!',
          icon: 'error',
          confirmButtonText: 'Try again'
        })
      }
      
      this.setState(prevState => {
        const newImages = response.data.hits.filter(
          hit => !prevState.images.some(image => image.id === hit.id)
        );
        return {
          images: [...prevState.images, ...newImages],
          isLoading: false,
        };
      });
    } catch (error) {
      console.error('Error fetching images:', error);  
      
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    // Optionally, you can fetch default images here if needed
  }

  handleSearchSubmit = query => {
    this.setState({ query: query, images: [], page: 1 }, () => {
      this.fetchImages();
    });
  };

  handleImageClick = (largeImageURL, alt) => {
    this.setState({ largeImageURL, alt, showModal: true });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({page: prevState.page + 1}), () => {
      this.fetchImages();
    })
  }

  closeModal = () => {
    this.setState({showModal: false, largeImageURL: '', alt: ''});
  }

  render() {
    const { images, isLoading, showModal, largeImageURL, alt } = this.state;
    return (
      <div
      className={styles.app}
        // style={{
        //   height: '100vh',
        //   display: 'flex',
        //   flexDirection: 'column',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   fontSize: 40,
        //   color: '#010101'
        // }}
      >
        <Searchbar onSubmit={this.handleSearchSubmit}/>
        {<ImageGallery images={images} onImageClick={this.handleImageClick}/> }
        
        {isLoading && <Loading />}
        {images.length > 0 && <Button onClick={this.handleLoadMoreClick}/>}
        {showModal && <Modal largeImageURL={largeImageURL} alt={alt} onClose={this.closeModal} />}
      </div>
    );
  }
};

export default App;