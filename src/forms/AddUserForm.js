import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = { codigoBanco: null, descricaoBanco: '', descricaoSigla: '' }
	const [ banco, setBanco ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target
	
		setBanco({ ...banco, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				debugger
				event.preventDefault()
				if (!banco.descricaoBanco || !banco.descricaoSigla) return
				if (!banco.codigoBanco){
					banco.codigoBanco =Math.floor(Math.random() * (5000 - 1000 + 1)) 
				}
				document.getElementById('controlled-tab-example-tab-selecao').click()
				props.addBanco(banco)
				setBanco(initialFormState)
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
					<button >Sair</button>
					</td>
					     <td>
						<button >Salvar</button>
					</td>
				</tr>
				</tbody>
			</table>
		</form>
	)
}

export default AddUserForm