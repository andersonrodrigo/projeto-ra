import React from 'react'

const UserTable = props => (
  <table width="100%">
    <thead>
      <tr>
        <th width="60%">Nome</th>
        <th width="20%">Sigla</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {props.bancos.length > 0 ? (
        props.bancos.map(banco => (
          <tr key={banco.codigoBanco}>
            <td>{banco.descricaoBanco}</td>
            <td>{banco.descricaoSigla}</td>
            <td>
              <i  onClick={() => { props.editRow(banco) }} className="button muted-button" className="material-icons">edit</i> 
             
              <i  onClick={() => props.deleteBanco(banco.codigoBanco)} className="material-icons">delete</i> 
              
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>Sem Bancos</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable