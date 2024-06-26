import { LoadMoreBtn } from './Button.styled';

export const Button = ({ onClick, status }) => {
  if (status === false) {
    return (
      <LoadMoreBtn onClick={onClick} disabled>
        Load more
      </LoadMoreBtn>
    );
  }
  return <LoadMoreBtn onClick={onClick}>Load more</LoadMoreBtn>;
};
