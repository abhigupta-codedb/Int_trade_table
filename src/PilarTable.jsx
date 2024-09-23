import React, { useState, useRef, useEffect } from "react";
import SingleCircle from "./SingleCircle";
import "./pillarTable.css";

const allColumns = () => {
  return [
    "topic_1",
    "topic_2",
    "topic_3",
    "topic_4",
    "topic_5",
    "topic_6",
    "topic_7",
    "topic_8",
    "topic_9",
    "topic_10",
  ];
};

const PillarTable = ({ pillarData }) => {
  const [tableData, setTableData] = useState(null);
  const [sortConfig, setSortConfig] = useState(null);
  const [availCoulmns, setAvailColumns] = useState(allColumns);
  const clickCount = useRef(0);

  useEffect(() => {
    setTableData(pillarData);
  }, [pillarData]);

  const sortTable = (key) => {
    let sortedData = [...tableData];
    if (sortConfig?.key === key && sortConfig?.direction === "ascending") {
      sortedData.reverse();
      setSortConfig({ key, direction: "descending" });
    } else {
      if (key.includes("topic")) {
        sortedData.sort((a, b) => b.topics[key] - a.topics[key]);
      } else {
        sortedData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      }

      setSortConfig({ key, direction: "ascending" });
    }
    setTableData(sortedData);
  };

  const handleClick = (columnName) => {
    clickCount.current += 1;
    if (clickCount.current === 1) {
      setAvailColumns([columnName]);
    } else if (clickCount.current === 3) {
      setAvailColumns(allColumns);
      clickCount.current = 0;
    }
    sortTable(columnName);
  };

  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th onClick={() => sortTable("economy")}>Economies</th>
            <th>Topics</th>
            <th onClick={() => sortTable("score")}>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td style={{ padding: "0" }}>
              {availCoulmns.map((columns, i) => (
                <td id={columns} onClick={() => handleClick(columns)}>
                  <SingleCircle value={100} />
                </td>
              ))}
            </td>
            <td></td>
          </tr>
          {tableData &&
            tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.economy}</td>
                <td style={{ padding: "0" }}>
                  {Object.entries(row.topics).map(([key, value]) => {
                    return (
                      availCoulmns.includes(key) && (
                        <td>
                          <SingleCircle value={value} />
                        </td>
                      )
                    );
                  })}
                </td>
                <td style={{ paddingTop: 0 }}>{row.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PillarTable;
