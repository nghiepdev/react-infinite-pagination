import React from 'react';

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
