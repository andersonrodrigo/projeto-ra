import React, { useState, Fragment } from 'react'

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

import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const URL = 'http://3.16.111.170:8080/listarbancos2';
const editing = false;

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
      pageSize: 6,
      currentPage: 0,
      loading: true,
      currentBanco: {}
    };

    this.changeColumnWidths = (columnWidths) => {
      this.setState({ columnWidths });
    };
    this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }


  commitChanges({ added, changed, deleted }) {
    debugger
    let { rows } = this.state;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      rows = rows.map(row => (changed[row.codigoBanco] ? { ...row, ...changed[row.codigoBanco] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.codigoBanco));
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

  changeCurrentPage(currentPage) {
    this.setState({
      loading: true,
      currentPage,
    });
  }

  queryString() {
    const { pageSize, currentPage } = this.state;

    return `${URL}?page=${currentPage}&size=${pageSize}`;
  }

  loadData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    fetch(queryString)
      .then(response => response.json())
      .then(data => this.setState({
        rows: data.content,
        totalCount: data.totalElements,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  render() {

    const {
      rows, columns, pageSize, currentPage, totalCount, loading,columnWidths,currentBanco
    } = this.state;

    const TableRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
       
        onClick={() =>{ 
         // alert(JSON.stringify(row))
         this.setCurrentBanco(row);
        this.setState({ currentBanco: row });
       // debugger
       // setEditing(true)
        document.getElementById('controlled-tab-example-tab-formulario').click()
      }}
      
      />
      );



    return (
<div className="card" style={{ position: 'relative' }}> 
<Tabs
        id="controlled-tab-example"
        defaultActiveKey="selecao"
      >
        <Tab eventKey="selecao" title="Seleção">


                <div className="flex-large"> 
				<div className="flex-large">
				
				<Fragment>
					<h2>Bancos</h2>
					
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
            defaultSorting={[{ columnName: 'codigoBanco', direction: 'asc' }, { columnName: 'descricaoBanco', direction: 'asc' },  { columnName: 'descricaoSigla', direction: 'asc' }]}
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
							  <Table rowComponent={TableRow}/>
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={this.changeColumnWidths}
          />
           <TableHeaderRow showSortingControls />
							<PagingPanel />

              <TableEditRow />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
          />
							</Grid>
							{loading }
						</div>

					 
</Tab>
<Tab eventKey="formulario" title="Formulario">
	
			<div className="flex-large">
				
						<Fragment>
							<h2></h2>
							{editing ? (
						<Fragment>
							<h2>Edit Banco</h2>
							<EditUserForm
								editing={editing}
						//		setEditing={setEditing}
								bancoCorrente={this.currentBanco}
             //   updateBanco={updateBanco}
                {...currentBanco}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Banco</h2>
							<AddUserForm  />
						</Fragment>
					)}
						</Fragment>
				
				</div>
</Tab>
</Tabs>
			</div>



    );
  }
}
