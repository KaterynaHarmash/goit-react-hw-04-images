import { useState } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { ModalBox } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatImg, tags, id, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <GalleryItem id={id}>
      <GalleryItemImage
        src={webformatImg}
        alt={tags}
        onClick={evt => {
          openModal(evt, largeImageURL);
        }}
      />
      <ModalBox
        large={largeImageURL}
        alt={tags}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </GalleryItem>
  );
};
