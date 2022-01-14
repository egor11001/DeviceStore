import React from 'react';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'react-bootstrap';

const Page = observer(({ nextPage, prevPage, page, setPage, totalPages }) => {
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination className="mt-5 justify-content-center">
      {pages.map((p) => (
        <Pagination.Item key={p} active={p === page} onClick={() => setPage(p)}>
          {p}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Page;
