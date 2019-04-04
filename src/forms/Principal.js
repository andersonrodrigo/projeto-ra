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
} from '@devexpress/dx-react-grid-bootstrap4';

import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const URL = 'http://3.16.111.170:8080/listarbancos2';
const editing = false;
//const [ editing, setEditing ] = useState(false)
const initialFormState = { codigoBanco: null, descricaoBanco: '', descricaoSigla: '' }
let currentBanco ={};
const setCurrentBanco = (banco) =>{
	currentBanco = banco
}
//const [ currentBanco, setCurrentBanco ] = useState(initialFormState)
const addBanco = banco => {
	banco.codigoBanco = banco.length + 1
}
const setEditing = (editing) =>{
	editing = editing
}
const updateBanco = (codigoBanco, updateBanco) => {
//	setEditing(false)
editing = true
}
const TableRow = ({ row, ...restProps }) => (
	<Table.Row
	  {...restProps}
	 
	  onClick={() =>{ 
		 // alert(JSON.stringify(row))
		setCurrentBanco(row);
		setEditing(true)
		document.getElementById('controlled-tab-example-tab-formulario').click()
	}}
	
	/>
  );
export default class Principal extends React.PureComponent {
  constructor(props) {
    super(props);
	
 
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
	  loading: true
	  
	};
	this.changeColumnWidths = (columnWidths) => {
		this.setState({ columnWidths });
	  };
	this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
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
      rows, columns, pageSize, currentPage, totalCount, loading,columnWidths
    } = this.state;

	




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
								setEditing={setEditing}
								currentBanco={currentBanco}
								updateBanco={updateBanco}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Banco</h2>
							<AddUserForm addBanco={addBanco} />
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
