import React from 'react';
import PropTypes from 'prop-types';
import { pagination, button, pageCount, next } from './Pagination.module.css';

const Pagination = ({ onClickPrev, onClickNext, page }) => (
    <div className={pagination}>
        <button className={button} onClick={onClickPrev} type="button">
            prev
        </button>
        <div className={pageCount}>
            <span>{page}</span>
        </div>
        <button className={`${button} ${next}`} onClick={onClickNext}>
            next
        </button>
    </div>
);

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    onClickPrev: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
};

export default Pagination;
