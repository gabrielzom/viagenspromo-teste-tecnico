import {useEffect, useState} from 'react'
import './App.css'
import {Paper, TablePagination} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {getProducts} from "./api/get-data.ts";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100, sortable: true },
  { field: 'name', headerName: 'Nome', width: 500, sortable: true },
  {
    field: 'price',
    headerName: 'Preço (R$)',
    width: 300,
    sortable: true,
    valueFormatter: value =>  new Intl.NumberFormat(
      'pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }
    ).format(value)
  },
]

function App() {
  const [rows, setRows] = useState([]);
  const [paginationConfig, setPaginationConfig] = useState({
    total: 0,
    lastPage: 0,
    currentPage: 0,
    perPage: 0,
    next: 0,
    prev: 0
  });

  const handleChangePage = (page) => {
    setPaginationConfig({
      ...paginationConfig,
      currentPage: page
    })
    getProducts(++page).then(response => {
      setRows(response.data);
    })
  }

  useEffect(() => {
    getProducts().then(response => {
      setRows(response.data);
      setPaginationConfig({
        ...response.meta,
        currentPage: response.meta.currentPage - 1
      });
    }).catch(error => {
      console.error('Erro ao buscar os produtos:', error);
    });
  }, []);

  return (
    <>
      <h1>Lista de produtos</h1>
        <Paper sx={{ height: 400, width: 1000 }}>
          <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              sx={{ border: 0 }}
              hideFooterPagination={true}
            />
          <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={paginationConfig.total}
              rowsPerPage={paginationConfig.perPage}
              page={paginationConfig.currentPage}
              showFirstButton
              showLastButton
              onPageChange={(evt, page) => handleChangePage(page)}
          />
        </Paper>
    </>
  )
}

export default App
