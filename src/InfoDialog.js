import React, { useState, useEffect, useRef, useContext } from 'react';
import dialogPolyfill from 'dialog-polyfill';

import { getMovieCast } from './api';
import {
  getHalfVwImage,
  getLocaleDateString,
  parseSizeString
} from './utilties';
import PropTypes from 'prop-types';
import TmdbConfigContext from './TmdbConfigContext';
import './info-dialog.scss';

const InfoDialog = ({ show, setShowDialog, selectedMovieId, movies }) => {
  const movieInfoDialog = useRef(null);
  const [castData, setCastData] = useState([]);
  const { config } = useContext(TmdbConfigContext);

  const getCast = async movieId => {
    const data = await getMovieCast(movieId);
    setCastData(data);
  };

  useEffect(() => {
    dialogPolyfill.registerDialog(movieInfoDialog.current);
    movieInfoDialog.current.addEventListener('close', () => {
      // need to update the parent container state representation of this dialog.
      // otherwise this will cause a bug where clicking the same movie after closing
      // dialog won't open the dialog
      setShowDialog(false);
    });
  }, [setShowDialog]);

  // this check is needed in Firefox that is using the polyfill
  if (show && movieInfoDialog.current && !movieInfoDialog.current.hasAttribute('open')) {
    movieInfoDialog.current.showModal();
    getCast(selectedMovieId);
  }

  const showMovieInfo = movieId => {
    const movie = movies.filter(movie => movie.id === movieId)[0];

    if (!movie) {
      return;
    }

    const { poster_path } = movie;
    const secure_base_url = config.images.secure_base_url;

    const halfVwImageSize = getHalfVwImage(
      config.images.poster_sizes,
      document.documentElement.clientWidth
    );

    return (
      <div>
        <div className="modal-header">
          <h3>{movie.title}</h3>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
            onClick={closeModal}
          >
            ×
          </button>
        </div>
        <div className="modal-body clearfix">
          <img
            width={parseSizeString(halfVwImageSize)}
            alt={movie.title}
            src={`${secure_base_url}${halfVwImageSize}${poster_path}`}
            className="modal-image float-right"
          />
          <h5>Synopsis</h5>
          <p className="small">{movie.overview || 'No synopsis available'}</p>
          <h5>Release date</h5>
          <p className="small"> {getLocaleDateString(movie.release_date)}</p>
          <h5>Starring:</h5>
          {castData.length === 0 && <p className='small'>No cast available</p>}
          <ul className="list-unstyled">
            {castData.map(cast => {
              return (
                <li className="small" key={`${cast.id}_${cast.credit_id}`}>
                  {cast.name} as {cast.character || 'unspecified'}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="btn"
            data-dismiss="alert"
            aria-hidden="true"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const closeModal = () => {
    movieInfoDialog.current.close();
  };

  return (
    <dialog id='info-dialog' ref={movieInfoDialog}>{showMovieInfo(selectedMovieId)}</dialog>
  );
};

InfoDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  selectedMovieId: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default InfoDialog;
