import React, { useState, Fragment } from 'react'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import {
	SortingState, CustomPaging, EditingState, PagingState, SummaryState,
	IntegratedPaging, IntegratedSorting, IntegratedSummary,
  } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableColumnResizing,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';


const URL = 'http://3.16.111.170:8080/';
//const URL = 'http://127.0.0.1:8091/';
export default class Principal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.commitChanges = this.commitChanges.bind(this);
    this.state = {
      columns: [
        { name: 'codigoBanco', title: 'Codigo' },
        { name: 'descricaoBanco', title: 'Nome' },
        { name: 'descricaoSigla', title: 'Sigla' }
      ],
      columnWidths: [
        { columnName: 'codigoBanco', width: 100 },
        { columnName: 'descricaoBanco', width: 400 },
        { columnName: 'descricaoSigla', width: 100 }
      ],
      rows: [],
      totalCount: 0,
      pageSize: 5,
      currentPage: 0,
      loading: true,
      currentBanco: {},
      showMessage: false,
      message: ''
    };

    this.changeColumnWidths = (columnWidths) => {
      this.setState({ columnWidths });
    };
    this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }


  commitChanges({ added, changed, deleted }) {
    let { rows, showMessage,message  } = this.state;

    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
      for (var key in added){
        this.salvarBanco(added[key]);
      }
      this.setState({
        showMessage: true,
        message: 'Banco salvo com sucesso!'
      });
    }
    if (changed) {
      rows = rows.map(row =>
        (changed[row.id] ? { ...row, ...changed[row.id] } : row)
      );
      for (var key in changed){
        this.salvarBanco(rows[key]);
      }
      this.setState({
        showMessage: true,
        message: 'Banco alterado com sucesso!'
      });
    }
    if (deleted) {
      for (var key in deleted){
        this.excluiBanco(rows[key])
      }
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.id));
      this.setState({
        showMessage: true,
        message: 'Banco excluido com sucesso!'
      });
    }
    this.setState({ rows });
  }

   setCurrentBanco = (banco) =>{
    this.currentBanco = banco
  }
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }
  salvarBanco(banco) {
    delete banco.id;
    banco.codigoUsuario = "anomimo";
    banco.codigoBanco = parseInt(banco.codigoBanco)
    banco.dataLastrec = "2019-01-01";
    axios.post(URL + 'salvarbanco',JSON.stringify(banco), {
      headers: {
          'Content-Type': 'application/json',
      }
  })
    .then(response => console.log(response))
  }


  excluiBanco(banco) {
    axios.delete(URL + 'removebanco/' + banco.codigoBanco)
    .then(response => console.log(response))
  }


  changeCurrentPage(currentPage) {
    this.setState({
      loading: true,
      currentPage,
    });
  }

  queryString() {
    const { pageSize, currentPage } = this.state;

    return `${URL}listarbancos2?page=${currentPage}&size=${pageSize}`;
  }


  

  loadData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    fetch(queryString)
      .then(response => response.json())
      .then(data => {
        data.content.map((row, index) =>{
          row.id = index++;
        });
        this.setState({
        rows: data.content,
        totalCount: data.totalElements,
        loading: false,
      })
    })
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  render() {

    const {
      rows, columns, pageSize, currentPage, totalCount, loading,columnWidths, message, showMessage
    } = this.state;
    const handleHide = () => this.setState({ showMessage: false });
    
    return (
      <div className="card" style={{ position: 'relative' }}>
        <div className="flex-large">
          <div className="flex-large">


          <Alert key="primary" variant="primary" show={showMessage} dismissible onClose={handleHide}>
            {message}
          </Alert>

            <Fragment>
              <h2 class="titulo">Bancos</h2>
            </Fragment>
          </div>
          <Grid
            rows={rows}
            columns={columns}
            
          >
            <EditingState
              onCommitChanges={this.commitChanges}
            />
            <SortingState
              defaultSorting={[{ columnName: 'codigoBanco', direction: 'asc' }, { columnName: 'descricaoBanco', direction: 'asc' }, { columnName: 'descricaoSigla', direction: 'asc' }]}
            />
            <IntegratedSorting />
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={this.changeCurrentPage}
              pageSize={pageSize}
            />
            <CustomPaging
              totalCount={totalCount}
            />
            <Table />
            <TableColumnResizing
              columnWidths={columnWidths}
              onColumnWidthsChange={this.changeColumnWidths}
            />
            <TableHeaderRow showSortingControls />
            <PagingPanel />
            <TableEditRow />
            <TableEditColumn
              showAddCommand
              addCommand="Novo"	
              showEditCommand
              showDeleteCommand
            />
          </Grid>
         
          {loading}
        </div>
 
      </div>


 

    );
  }
}
