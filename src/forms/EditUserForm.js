import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ banco, setBanco ] = useState(props.currentBanco)

  useEffect(
    () => {
      setBanco(props.currentBanco)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setBanco({ ...banco, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateBanco(banco.codigoBanco, banco)
      }}
    >
     <table width="100%">
			<tbody>
				<tr>
					<td>
						<label>Nome:</label>
					</td>
					<td>
						<input type="text" name="descricaoBanco" size="40" value={banco.descricaoBanco} onChange={handleInputChange} />
					</td>
				</tr>
				<tr>
					<td>
						<label>Sigla:</label>
						</td>
					     <td>
						<input type="text" size="3" name="descricaoSigla" value={banco.descricaoSigla} onChange={handleInputChange} />
					</td>
				</tr>
				<tr>
					<td >
					<button>Sair</button>
					</td>
					     <td>
						<button>Salvar</button>
					</td>
				</tr>
				</tbody>
			</table>
    </form>
  )
}

export default EditUserForm