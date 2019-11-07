import React, {useEffect, useState, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Pagination = ({
  pageInVisible,
  hideOnSinglePage,
  wrapClassName,
  itemClassName,
  renderPageItem: ItemPage,
  renderPrev: PrevPage,
  renderNext: NextPage,
  ...props
}) => {
  const randomNumber = getRandomInt(999999);
  const mountedRef = useRef();
  const [current, setCurrent] = useState(Math.max(1, props.current));
  const lastPage = useMemo(() => {
    const lastPage = props.lastPage;

    if (typeof lastPage !== 'number') {
      return undefined;
    }

    if (lastPage < 0 || !lastPage) {
      return undefined;
    }

    return lastPage;
  }, [props.lastPage]);

  const pages = useMemo(() => {
    let left = false;
    const pages = [current];

    while (pages.length < pageInVisible) {
      let {0: first, length: l, [l - 1]: last} = pages;

      if (!left && first > 1) {
        pages.unshift(first - 1);
        left = true;
      } else {
        if (lastPage === undefined || last < lastPage) {
          pages.push(last + 1);
          left = false;
        } else {
          if (first > 1) {
            pages.unshift(first - 1);
          } else {
            break;
          }
        }
      }
    }

    return pages;
  }, [current, lastPage, pageInVisible]);

  function handleSelectPage(page, isPrevent) {
    return e => {
      e.preventDefault();

      if (isPrevent) {
        return;
      }

      setCurrent(page);
    };
  }

  function handleEnterSelectPage(page, isPrevent) {
    return e => {
      if (isPrevent) {
        return;
      }

      if (e.key === 'Enter') {
        setCurrent(page);
      }
    };
  }

  useEffect(() => {
    if (mountedRef.current) {
      if (props.onChange) {
        props.onChange(current);
      }
    } else {
      mountedRef.current = true;
    }
  }, [current]);

  function renderPage(page) {
    const disable = page === current;

    return (
      <li
        key={page}
        className={`${itemClassName} ${disable ? 'active' : ''}`}
        onClick={handleSelectPage(page, disable)}
        onKeyDown={handleEnterSelectPage(page, disable)}
        role="presentation"
        tabIndex={randomNumber + page}>
        <ItemPage page={page}>{page}</ItemPage>
      </li>
    );
  }

  function renderPrev() {
    let {0: first} = pages;
    const disable = current <= 1;

    return (
      <li
        className={`${itemClassName} pagination-prev ${
          disable ? 'disable' : ''
        }`}
        onClick={handleSelectPage(current - 1, disable)}
        onKeyDown={handleEnterSelectPage(current - 1, disable)}
        role="presentation"
        aria-disabled={disable}
        tabIndex={randomNumber + first - 1}>
        <PrevPage page={current - 1}>prev</PrevPage>
      </li>
    );
  }

  function renderNext() {
    let {length: l, [l - 1]: last} = pages;
    const disable = lastPage !== undefined && current >= lastPage;

    return (
      <li
        className={`${itemClassName} pagination-next ${
          disable ? 'disable' : ''
        }`}
        onClick={handleSelectPage(current + 1, disable)}
        onKeyDown={handleEnterSelectPage(current + 1, disable)}
        role="presentation"
        aria-disabled={disable}
        tabIndex={randomNumber + last + 1}>
        <NextPage page={current + 1}>next</NextPage>
      </li>
    );
  }

  return (
    (!hideOnSinglePage || pages.length > 1) && (
      <nav className={wrapClassName} role="navigation">
        <ul unselectable="unselectable">
          {renderPrev()}

          {pages.map(renderPage)}

          {renderNext()}
        </ul>
      </nav>
    )
  );
};

Pagination.propTypes = {
  pageInVisible: PropTypes.number,
  current: PropTypes.number,
  lastPage: PropTypes.number,
  hideOnSinglePage: PropTypes.bool,
  wrapClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  onChange: PropTypes.func,
  renderPageItem: PropTypes.func,
  renderPrev: PropTypes.func,
  renderNext: PropTypes.func,
};

Pagination.defaultProps = {
  pageInVisible: 10,
  current: 1,
  hideOnSinglePage: true,
  wrapClassName: 'pagination',
  itemClassName: 'pagination-item',
  renderPageItem: ({children}) => <a>{children}</a>,
  renderPrev: ({children}) => <a>{children}</a>,
  renderNext: ({children}) => <a>{children}</a>,
};

export default Pagination;
