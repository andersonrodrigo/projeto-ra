import React, { useState, useEffect, Component } from 'react'

class EditUserForm extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const {bancoCorrente} = this.props;
		return (
			<form
				onSubmit={event => {
					event.preventDefault()
			//		props.updateBanco(banco.codigoBanco, banco)
				}}
			>
			 <table width="100%">
				<tbody>
					<tr>
						<td>
							<label>Nome:</label>
						</td>
						<td>
							<input type="text" name="descricaoBanco" size="40" value={bancoCorrente.descricaoBanco}  />
						</td>
					</tr>
					<tr>
						<td>
							<label>Sigla:</label>
							</td>
								 <td>
							<input type="text" size="3" name="descricaoSigla" value={bancoCorrente.descricaoSigla} />
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
}

export default EditUserForm;