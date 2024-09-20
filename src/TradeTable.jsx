import React, { useState, useRef, useEffect } from "react";
// import { intData } from "./intData";
import CircleRating from "./CircleRating";

const DataTable = ({ intData }) => {
  const [tableData, setTableData] = useState(null);
  const [showHiddenColumns, setShowHiddenColumns] = useState(false);
  const [sortConfig, setSortConfig] = useState(null);
  const [availCoulmns, setAvailColumns] = useState([
    "regFramework",
    "publicService",
    "operEfficiency",
  ]);
  const clickCount = useRef(0);

  useEffect(() => {
    setTableData(intData);
  }, [intData]);

  const sortTable = (key) => {
    let sortedData = [...tableData];
    if (sortConfig?.key === key && sortConfig?.direction === "ascending") {
      sortedData.reverse();
      setSortConfig({ key, direction: "descending" });
    } else {
      sortedData.sort((a, b) => (Number(a[key]) > Number(b[key]) ? 1 : -1));
      setSortConfig({ key, direction: "ascending" });
    }
    setTableData(sortedData);
  };

  const handleClick = (columnName) => {
    clickCount.current += 1;
    if (clickCount.current === 1) {
      if (
        availCoulmns.includes("Region") ||
        availCoulmns.includes("IncomeGroup")
      ) {
        handleShowHideButton();
      }
      setAvailColumns([columnName]);
    } else if (clickCount.current === 3) {
      setAvailColumns((colms) =>
        Array.from(
          new Set([...colms, "regFramework", "publicService", "operEfficiency"])
        )
      );
      clickCount.current = 0;
    }
    sortTable(columnName);
  };

  const handleShowHideButton = () => {
    if (
      availCoulmns.includes("Region") ||
      availCoulmns.includes("IncomeGroup")
    ) {
      const newColumns = availCoulmns.filter(
        (colms) => colms !== "Region" || colms !== "IncomeGroup"
      );
      setAvailColumns(newColumns);
    } else {
      setAvailColumns((colms) => [...colms, "Region", "IncomeGroup"]);
    }
    setShowHiddenColumns(!showHiddenColumns);
  };

  return (
    <div>
      <button onClick={handleShowHideButton}>
        {showHiddenColumns ? "Remove Columns" : "Add Columns"}
      </button>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th onClick={() => sortTable("economy")}>Economies</th>
            {availCoulmns.includes("regFramework") && (
              <th onClick={() => handleClick("regFramework")}>
                Regulatory Framework
              </th>
            )}
            {availCoulmns.includes("publicService") && (
              <th onClick={() => handleClick("publicService")}>
                Public Service
              </th>
            )}
            {availCoulmns.includes("operEfficiency") && (
              <th onClick={() => handleClick("operEfficiency")}>
                Operational Efficiency
              </th>
            )}
            <th onClick={() => sortTable("score")}>Score</th>
            {showHiddenColumns && availCoulmns.includes("Region") && (
              <th onClick={() => sortTable("Region")}>Region</th>
            )}
            {showHiddenColumns && availCoulmns.includes("IncomeGroup") && (
              <th onClick={() => sortTable("IncomeGroup")}>Income Group</th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.economy}</td>
                {availCoulmns.includes("regFramework") && (
                  <td>
                    <CircleRating value={row.regFramework / 10} />
                  </td>
                )}
                {availCoulmns.includes("publicService") && (
                  <td>
                    <CircleRating value={row.publicService / 10} />
                  </td>
                )}
                {availCoulmns.includes("operEfficiency") && (
                  <td>
                    <CircleRating value={row.operEfficiency / 10} />
                  </td>
                )}
                <td>{row.score}</td>
                {showHiddenColumns && availCoulmns.includes("Region") && (
                  <td>{row.Region}</td>
                )}
                {showHiddenColumns && availCoulmns.includes("IncomeGroup") && (
                  <td>{row.IncomeGroup}$</td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
