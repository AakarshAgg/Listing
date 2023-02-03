import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationLink,
  MDBPaginationItem,
} from "mdb-react-ui-kit";
import { Link, Outlet } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(3);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");

  const sortOptions = ["name", "username", "email", "phone"];

  /*<Routes>
  <Route path="/">
   <Route path="/:userId" element={<Showdetails/>}/>
   </Route>
</Routes>*/

  useEffect(() => {
    loadusersData(0, 3, 0);
  }, []);

  console.log("data1", data);

  const loadusersData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(
            `https://jsonplaceholder.typicode.com/users?q=${value}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setCurrentPage(currentPage + increase);
            setData(response.data);
          })
          .catch((err) => console.log(err));
      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `https://jsonplaceholder.typicode.com/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));

      default:
        return await axios
          .get(
            `https://jsonplaceholder.typicode.com/users?_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
            console.log("i", currentPage, increase);
          })
          .catch((err) => console.log(err));
    }
  };

  console.log("data", data);

  const handleReset = () => {
    setOperation("");
    setValue("");
    setSortFilterValue("");
    setSortValue("");
    loadusersData(0, 3, 0);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    loadusersData(0, 3, 0, "search");
    /*return await axios
      .get(`https://jsonplaceholder.typicode.com/users?q=${value}`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err) => console.log(err));*/
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadusersData(0, 3, 0, "sort", value);
    /* return await axios
      .get(
        `https://jsonplaceholder.typicode.com/users?_sort=${value}&_order=asc`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));*/
  };

  const renderPagination = () => {
    if (data.length < 3 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => loadusersData(3, 6, 1, operation, sortFilterValue)}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage <= pageLimit - 1 || data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadusersData(
                  (currentPage - 1) * 3,
                  currentPage * 3,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadusersData(
                  (currentPage + 1) * 3,
                  (currentPage + 2) * 3,
                  1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadusersData(
                  (currentPage - 1) * 3,
                  currentPage * 3,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return (
    <MDBContainer>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Name....."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MDBBtnGroup>
          <MDBBtn type="submit" color="dark">
            Search
          </MDBBtn>
          <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>
            Reset
          </MDBBtn>
        </MDBBtnGroup>
      </form>
      <div style={{ marginTop: "10px" }}>
        {data.length > 0 && (
          <MDBRow>
            <MDBCol size="8">
              <h5>Sort By:</h5>
              <select
                style={{ width: "50%", borderRadius: "2px", height: "35px" }}
                onChange={handleSort}
                value={sortValue}
              >
                <option>Please Select Value</option>
                {sortOptions.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </MDBCol>
          </MDBRow>
        )}

        <br />
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Show Details</th>
                </tr>
              </MDBTableHead>

              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      No Data Found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                currentPage ===0?(
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <Link to={`/${item.id}`}>
                          <MDBBtn className="me-1" color="danger">
                            Click Here
                          </MDBBtn>
                        </Link>
                      </td>
                    </tr>
                  </MDBTableBody>
                ))):( data.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <th scope="row">{index + 3*currentPage + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <Link to={`/${item.id}`}>
                            <MDBBtn className="me-1" color="danger">
                              Click Here
                            </MDBBtn>
                          </Link>
                        </td>
                      </tr>
                    </MDBTableBody>
                  )))
              )}
              <Outlet />
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "250px",
            alignContent: "center",
          }}
        >
          {renderPagination()}
        </div>
      </div>
    </MDBContainer>
  );
}
export default Home;
