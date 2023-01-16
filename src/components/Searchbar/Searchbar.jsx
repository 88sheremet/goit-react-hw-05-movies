import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import css from '../../pages/Movies/Movies.module.css';
import Notiflix from 'notiflix';

const Searchbar = ({ onChangeQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [query, setQuery] = useState(searchQuery ?? '');

  const onChange = e => {
    setQuery(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    onChangeQuery(query);

    setSearchParams({ query: query });

    if (query === '') {
      Notiflix.Notify.failure(`Enter a query!`);
      return;
    }

    
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={css.form}>
        <input type="text" onChange={onChange} className={css.input} />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
