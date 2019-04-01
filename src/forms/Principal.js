import React, { useState, Fragment } from 'react'
import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'
import UserTable from '../tables/UserTable'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
const Principal = props => {
    
	const bancoData = [
		{ codigoBanco: 1, descricaoBanco: 'Banco do Brasil', descricaoSigla: 'BB' },
		{ codigoBanco: 2, descricaoBanco: 'Caixa Economica', descricaoSigla: 'CA' },
		{ codigoBanco: 3, descricaoBanco: 'Banco Bradesco', descricaoSigla: 'BC' }
	]
	const initialFormState = { codigoBanco: null, descricaoBanco: '', descricaoSigla: '' }

	// Setting state
	const [ bancos, setBancos ] = useState(bancoData)
	const [ currentBanco, setCurrentBanco ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

    // CRUD operations
	const addBanco = banco => {
		banco.codigoBanco = banco.length + 1
		setBancos([ ...bancos, banco ])
	}

	const deleteBanco = codigoBanco => {
		setEditing(false)

		setBancos(bancos.filter(banco => banco.codigoBanco !== codigoBanco))
	}

	const updateBanco = (codigoBanco, updateBanco) => {
		setEditing(false)
		setBancos(bancos.map(banco => (banco.codigoBanco === codigoBanco ? updateBanco : banco)))
	}

	const editRow = banco => {
		setEditing(true)
		setCurrentBanco({ codigoBanco: banco.codigoBanco, descricaoBanco: banco.descricaoBanco, descricaoSigla: banco.descricaoSigla })
		document.getElementById('controlled-tab-example-tab-formulario').click()
	}
    return (
<div className="flex-row telaPrincipal">

<Tabs
        id="controlled-tab-example"
        defaultActiveKey="selecao"
      >
        <Tab eventKey="selecao" title="Seleção">


                <div className="flex-large">
					<UserTable bancos={bancos} editRow={editRow} deleteBanco={deleteBanco} />
				</div>
</Tab>
<Tab eventKey="formulario" title="Formulario">
	
<div className="flex-large">
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
				</div>
</Tab>
</Tabs>
			</div>
    )}
export default Principal