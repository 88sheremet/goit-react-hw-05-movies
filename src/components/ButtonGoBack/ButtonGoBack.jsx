import { Link, useLocation } from 'react-router-dom';

export const ButtonGoBack = () => {
  const location = useLocation();

  return <Link to={location.state?.from ?? ''}>🡄 Go Back</Link>;
};
