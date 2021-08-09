# react-infinite-pagination

[![NPM version](https://img.shields.io/npm/v/react-infinite-pagination.svg)](https://www.npmjs.com/package/react-infinite-pagination)
[![NPM monthly download](https://img.shields.io/npm/dm/react-infinite-pagination.svg)](https://www.npmjs.com/package/react-infinite-pagination)

> A React component to render a infinite pagination(without total page) just like google

By installing this component and using my `example.css` you can obtain this:

[![screenshot](screenshot.png)](https://codesandbox.io/s/react-infinite-pagination-example-rx32s)

## Installation

```bash
yarn add react-infinite-pagination
```

## Usage[(Hooks only)](https://reactjs.org/docs/hooks-intro.html)

Example: https://codesandbox.io/s/react-infinite-pagination-example-rx32s

```tsx
import {Pagination} from 'react-infinite-pagination';
import 'react-infinite-pagination/lib/example.css';

const Datatable = () => {
  return <Pagination current={6} />;
};
```

## Options

| Name             | Type                              | Description                                                                       |
| ---------------- | --------------------------------- | --------------------------------------------------------------------------------- |
| pageInVisible    | Number                            | The number of pages to display. Default: `10`                                     |
| current          | Number                            | The current page selected. Default: `1`                                           |
| lastPage         | Number                            | The total number of pages. If `undefined` the pagination will infinite            |
| hideOnSinglePage | Boolean                           | Whether to hide pager on single page                                              |
| wrapClassName    | String                            | The class name of the container of the pagination. Default: `infinite-pagination` |
| itemClassName    | String                            | The class name of the page item. Default: `infinite-pagination-item`              |
| onChange         | Function(current: number) => void | The callback executed when the page number is changed                             |
| renderPageItem   | Component<{current: number}>      | The component to render the page item                                             |
| renderPrev       | Component<{current: number}>      | The component to render the previous button                                       |
| renderNext       | Component<{current: number}>      | The component to render the next button                                           |

## License

MIT
