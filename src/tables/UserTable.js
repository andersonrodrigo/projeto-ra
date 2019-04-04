import React from 'react'
import {
  PagingState,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';


const UserTable = props => (
  <Grid
  rows={props.rows}
  columns={props.columns}
  >
  <PagingState
    currentPage={props.currentPage}
    onCurrentPageChange={props.changeCurrentPage}
    pageSize={props.pageSize}
  />
  <CustomPaging
    totalCount={props.totalCount}
  />
  <Table />
  <TableHeaderRow />
  <PagingPanel />
  </Grid>
)

export default UserTable