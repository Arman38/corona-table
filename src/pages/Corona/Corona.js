import React, { useEffect, useState } from "react";
import { CoronaItems } from "../../components/corona-items/CoronaItems";
import { NovelCovid } from "novelcovid";
import { Header } from "../../components/header/Header";
import { FilterItems } from "../../components/FilterItems/FilterItems";
import { Spinner } from "../../components/spinner/Spinner";
import { Paginationn } from "../../components/pagination/Pagination";
import { DropDown } from "../../components/dropdown/Dropdownn";

export const Corona = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [term, setTerm] = useState("");
  const [flag, setFlag] = useState(true);

  const [tHeaders, setTheaders] = useState([
    { text: "Country", label: "country", sorted: "lower" },
    { text: "Total Cases", label: "totalCases", sorted: "" },
    { text: "New Cases", label: "newCases", sorted: "" },
    { text: "New Deaths", label: "newDeaths", sorted: "" },
    { text: "Recovered", label: "recovered", sorted: "" },
    { text: "Total Deaths", label: "totalDeaths", sorted: "" },
    { text: "Critical", label: "critical", sorted: "" },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [rowSize, setRowSize] = useState(10);

  useEffect(() => {
    new NovelCovid().all().then((res) => setAllData(res));
    new NovelCovid().countries().then((res) => {
      const transformed = res.map(
        ({
          country,
          cases,
          todayCases,
          deaths,
          todayDeaths,
          recovered,
          critical,
          updated,
        }) => {
          return {
            country,
            cases,
            todayCases,
            deaths,
            todayDeaths,
            recovered,
            critical,
            updated,
          };
        }
      );
      setData(transformed);
    });
  }, []);

  const helperFilter = (f, label) => {
    if (label === "country") {
      return f
        ? data.sort((a, b) => (a[label] < b[label] ? -1 : 0))
        : data.sort((a, b) => (b[label] < a[label] ? -1 : 0));
    }
    return f
      ? data.sort((a, b) => a[label] - b[label])
      : data.sort((a, b) => b[label] - a[label]);
  };

  const filterHeader = (label) => {
    setTerm(label);
    setFlag((flag) => !flag);
    setTheaders((prevHeaders) => {
      const idx = prevHeaders.findIndex((h) => h.label === label);
      const thisItem = prevHeaders[idx];
      prevHeaders.forEach((item) => (item.sorted = ""));
      if (flag) {
        thisItem.sorted = "higher";
      }
      if (!flag) {
        thisItem.sorted = "lower";
      }
      return [
        ...prevHeaders.slice(0, idx),
        thisItem,
        ...prevHeaders.slice(idx + 1),
      ];
    });
  };

  const filterItems = (data, label) => {
    switch (label) {
      case "country":
        return helperFilter(flag, "country");
      case "totalCases":
        return helperFilter(flag, "cases");
      case "newCases":
        return helperFilter(flag, "todayCases");
      case "newDeaths":
        return helperFilter(flag, "todayDeaths");
      case "recovered":
        return helperFilter(flag, "recovered");
      case "totalDeaths":
        return helperFilter(flag, "deaths");
      case "totalRecovered":
        return helperFilter(flag, "recovered");
      case "critical":
        return helperFilter(flag, "critical");
      default:
        return data;
    }
  };

  const onSearchFilter = (data, sValue) => {
    if (sValue === "") {
      return data;
    }
    return data.filter((item) => {
      const filterHelper = (label, value = sValue) => {
        return item[label]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      };
      if (
        filterHelper("country") ||
        filterHelper("cases") ||
        filterHelper("todayCases") ||
        filterHelper("todayDeaths") ||
        filterHelper("recovered") ||
        filterHelper("deaths") ||
        filterHelper("critical")
      ) {
        return true;
      }
      return false;
    });
  };

  const onPaginationData = (data, activePage) => {
    if (activePage === 1) {
      return data.slice(0, rowSize);
    }
    return data.slice(
      `${(activePage - 1) * rowSize} `,
      `${activePage * rowSize}`
    );
  };
  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onChangeRowQuantity = (size) => {
    setRowSize(size);
    setActivePage(1);
  };

  const filteredData = onSearchFilter(filterItems(data, term), searchValue);
  const filterWithPaginationData = onPaginationData(filteredData, activePage);

  if (!data.length && !allData.length) {
    return <Spinner />;
  }
  return (
    <div>
      <Header />
      <DropDown changeRowQuantity={onChangeRowQuantity} />
      <FilterItems changeHandler={onChangeHandler} value={searchValue} />
      <CoronaItems
        data={filterWithPaginationData}
        allData={allData}
        filterHeader={filterHeader}
        tHeaders={tHeaders}
      />
      <Paginationn
        clicked={(active) => setActivePage(active)}
        quantity={
          filteredData.length / rowSize > 1 ? filteredData.length / rowSize : 0
        }
        activePage={activePage}
      />
    </div>
  );
};
