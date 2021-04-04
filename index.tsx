import React, {useEffect, useState, useMemo, useRef} from 'react';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Noop = ({children}: {children?: React.ReactNode}) => {
  return <a>{children}</a>;
};

export interface PaginationProps {
  pageInVisible?: number;
  current?: number;
  lastPage?: number;
  hideOnSinglePage?: boolean;
  wrapClassName?: string;
  itemClassName?: string;
  onChange?: (current: number) => void;
  renderPageItem?: React.ComponentType<{page: number}>;
  renderPrev?: React.ComponentType<{page: number}>;
  renderNext?: React.ComponentType<{page: number}>;
}

export const Pagination = ({
  pageInVisible = 10,
  hideOnSinglePage = true,
  wrapClassName = 'pagination',
  itemClassName = 'pagination-item',
  renderPageItem: ItemPage = Noop,
  renderPrev: PrevPage = Noop,
  renderNext: NextPage = Noop,
  ...props
}: PaginationProps) => {
  const randomNumber = useMemo(() => getRandomInt(999999), []);
  const mountedRef = useRef<boolean>();
  const [current, setCurrent] = useState(Math.max(1, props.current ?? 1));
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

  function handleSelectPage(page: number, isPrevent: boolean) {
    return (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();

      if (isPrevent) {
        return;
      }

      setCurrent(page);
    };
  }

  function handleEnterSelectPage(page: number, isPrevent: boolean) {
    return (e: React.KeyboardEvent<HTMLLIElement>) => {
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

  function renderPage(page: number) {
    const disable = page === current;

    return (
      <li
        key={page}
        className={`${itemClassName} ${disable ? 'active' : ''}`}
        onClick={handleSelectPage(page, disable)}
        onKeyDown={handleEnterSelectPage(page, disable)}
        role='presentation'
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
        role='presentation'
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
        role='presentation'
        aria-disabled={disable}
        tabIndex={randomNumber + last + 1}>
        <NextPage page={current + 1}>next</NextPage>
      </li>
    );
  }

  return false === hideOnSinglePage || pages.length > 1 ? (
    <nav className={wrapClassName} role='navigation'>
      <ul>
        {renderPrev()}

        {pages.map(renderPage)}

        {renderNext()}
      </ul>
    </nav>
  ) : null;
};
