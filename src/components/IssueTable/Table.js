import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDb } from "../../contexts/DbContext";
import { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import { columns } from "./tableData";

export default function StickyHeadTable({ title, fn }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { issues, setShowDetails } = useDb();

  useEffect(() => {
    fn();
  }, [fn]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(title);
  //Need to add -Date -Project -Status

  return (
    <div className="w-full">
      <Paper className="overflow-hidden">
        <div className="flex justify-center py-4 bg-gray-200">
          <h1 className="font-semibold text-xl">{title}</h1>
        </div>
        <TableContainer sx={{ width: "auto" }}>
          <Table header="true">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {issues
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id } = row;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      className="cursor-pointer"
                      onClick={() => setShowDetails(row)}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell
                            onClick={() => setShowDetails(true)}
                            key={column.id}
                            align={column.align}
                          >
                            {value === "Open" ? (
                              <Chip color="primary" label={value} />
                            ) : value === "Closed" ? (
                              <Chip color="error" label={value} />
                            ) : value === "High" ? (
                              <Chip color="error" label={value} />
                            ) : value === "Medium" ? (
                              <Chip color="warning" label={value} />
                            ) : value === "Low" ? (
                              <Chip color="success" label={value} />
                            ) : column.id === "name" ? (
                              <h1 className="text-lg">{value}</h1>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={issues.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
