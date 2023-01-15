import { Link, useLocation } from 'react-router-dom';
import css from '../ButtonGoBack/ButtonGoBack.module.css';

export const ButtonGoBack = () => {
  const location = useLocation();

  return (
    <Link to={location.state?.from ?? ''}>
      <button className={css.buttonGoBack}>🡄 Go Back</button>
    </Link>
  );
};
