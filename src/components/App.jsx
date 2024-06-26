import { useEffect, useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchimages } from './API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ThreeDots } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [onLoading, setOnLoading] = useState(false);
  const [loadbtnClickableStatus, setLoadbtnClickableStatus] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setOnLoading(true);
      try {
        const imagesResponse = await fetchimages(q, page);
        if (imagesResponse.hits.length < 40) {
          toast.success('We loaded all images for this theme!');
          setLoadbtnClickableStatus(false);
        }
        setImages(prevImages => [...prevImages, ...imagesResponse.hits]);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setOnLoading(false);
      }
    };

    if (q !== '' || page !== 0) {
      fetchImages();
    }
  }, [q, page]);

  const onLoadMore = async () => {
    setPage(page + 1);
  };

  const onSubmit = async val => {
    setImages([]);
    setQ(val);
    setPage(1);
  };

  return (
    <div className="App">
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      <div className="main">
        {images.length !== 0 && <ImageGallery images={images} />}
        {onLoading === true && (
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        )}
        {images.length !== 0 && (
          <Button onClick={onLoadMore} status={loadbtnClickableStatus} />
        )}
      </div>
    </div>
  );
};
