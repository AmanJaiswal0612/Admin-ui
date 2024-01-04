import React, { useEffect, useState } from 'react'

const MyPagination = ({ data, setUsers, paginationCount }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // debugger
  const totalPages = Math.ceil(data.length / paginationCount);

  useEffect(() => {
    setSelectedIndex(0);
  }, [data.length]);

  const handlePrevClick = () => {
    if (selectedIndex > 0) {
      const selcetedUsers = data.slice(
        (selectedIndex - 1) * paginationCount,
        (selectedIndex - 1) * paginationCount + paginationCount
      );
      setUsers(selcetedUsers);

      setSelectedIndex((prevState) => {
        return prevState - 1;
      });
    }
  };

  const handleNextClick = () => {
    if (selectedIndex < totalPages - 1) {
      const selcetedUsers = data.slice(
        (selectedIndex + 1) * paginationCount,
        (selectedIndex + 1) * paginationCount + paginationCount
      );
      setUsers(selcetedUsers);
      setSelectedIndex((prevState) => {
        return prevState + 1;
      });
    }
  };

  const handleNavigatePage = (idx) => {
    const selcetedUsers = data.slice(
      idx * paginationCount,
      idx * paginationCount + paginationCount
    );
    setUsers(selcetedUsers);
    console.log(data, selcetedUsers);
    setSelectedIndex(idx);
  };

  return (
    <div>
      <button
        onClick={handlePrevClick}
        className="previous-page"
        style={{
          border: "1px solid lightblue",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Prev
      </button>
      {new Array(totalPages).fill(0).map((el, idx) => {
        const classNamesForbtn = {
          0: "first-page",
          1: "second-page",
          2: "third-page",
          3: "forth-page",
          4: "fifth-page",
          5: "sixth-page",
          6: "seventh-page",
          7: "eighth-page",
        };
        return (
          <button
            key={idx}
            className={classNamesForbtn[idx]}
            style={{
              border: "1px solid lightblue",
              padding: "10px",
              background: selectedIndex == idx ? "lightblue" : "none",
              cursor: "pointer",
            }}
            onClick={() => handleNavigatePage(idx)}
          >
            {idx + 1}
          </button>
        );
      })}
      <button
        onClick={handleNextClick}
        className="next-page"
        style={{
          border: "1px solid lightblue",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default MyPagination;
