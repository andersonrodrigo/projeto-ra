import React from 'react'
import Main from '../templates/main'
import axios from 'axios'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Alert from 'react-bootstrap/Alert'

const headerProps = {
    icone:'users',
    title: 'Bancos',
    subtitle: 'Cadastro de Bancos'
}

const baseUrl = 'http://3.16.111.170:8080'
const initState = {
    banco: {codigoBanco: null , descricaoBanco:'', descricaoSigla: '', dataLastrec : "2019-01-01", codigoUsuario : "renato"},
    list: [],
    pages:new Array(),
    currentPage : 0 ,
    showMessage: false,
    message: ''
}

const pageSize = 4;

export default class BancoCrud extends React.Component{
    state = { ...initState}
    
    getList(){
        axios(`${baseUrl}/listarbancos?page=${this.state.currentPage}&size=${pageSize}`).then(resp => {
            this.setState({list: resp.data.content, pages:new Array(resp.data.totalPages)})
        })
    }
    componentWillMount(){
       this.getList();
    }

    clear(){
        this.setState({banco: initState.banco})
        document.getElementById('controlled-tab-example-tab-selecao').click();
    }

    setPage(i) {
        this.setState({currentPage: i}, ()=>{
            console.log(this.state.currentPage)
            this.getList();
        })
        
      }

    save() {
        const banco = this.state.banco
        const method = 'post'
        const url = `${baseUrl}/salvarbanco`;
        axios[method](url, banco).then(resp =>{
            const list = this.getUpdatedList(resp.data)
            this.setState({banco: initState.banco, list})
            document.getElementById('controlled-tab-example-tab-selecao').click();
            this.setState({
                showMessage: true,
                message: 'Banco salvo com sucesso!'
              });
        })
    }

    remove(banco){
        axios.delete(`${baseUrl}/excluiBanco/${banco.codigoBanco}`).then(resp => {
            const list = this.state.list.filter(u => u !== banco)
            this.setState({list})
        })
    }

    rendertable(){
        return(
            <table className="table st-4 tableBanco">
            <thead>
                <tr>
                    <th width="10%">Codigo </th>
                    <th width="50%">Nome</th>
                    <th width="20%">Sigla</th>
                    <th width="40%">Ações</th>
                </tr>
                </thead>
                <tbody>
                    {this.renderows()}
                </tbody>
                <ul className="nav nav-pills">
                      {this.renderpages()}
                </ul>
            </table>
        )
    }

    renderpages(){
       
         
        var listaPages = new Array()
        for(var i = 0; i <  this.state.pages.length; i++){
            listaPages.push(i)
        }
        return this.state.list.map((pages,index) => {
            return (
                <li className="nav-item" key={index}>
                     <a className='nav-link nav-link btn mr-2 botaoNavegador' href='#' onClick={() => this.setPage(index)}> {index + 1}</a>
                </li>
        )})
    }

    loadBanco(banco){
        document.getElementById('controlled-tab-example-tab-formulario').click();
        axios(`${baseUrl}/bancocodigo?banco=${banco.codigoBanco}`).then(resp => {
            this.setState({banco:resp.data})
        })
    }
    removeBanco(banco){
        axios(`${baseUrl}/excluiBanco/${banco.codigoBanco}`).then(resp => {
            this.setState({showMessage: true,
                message: 'Banco removido com sucesso!'}, ()=>{
                console.log(this.state.currentPage)
                this.getList();
            })
        })
    }
    renderows(){
        return this.state.list.map(banco => {
            return (
                <tr key={banco.codigoBanco}>
                    <td >{banco.codigoBanco}</td>
                    <td>{banco.descricaoBanco}</td>
                    <td>{banco.descricaoSigla}</td>
                    <td>
                        <button className="btn btn-warning mr-2" onClick={() => this.loadBanco(banco)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        
                        <button className="btn btn-danger" onClick={() => this.removeBanco(banco)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>


            )
        })
    }
    getUpdatedList(banco){
        const list = this.state.list.filter(u => u.codigoBanco !== banco.codigoBanco)
        list.unshift(banco)
        return list
    }

    updatefield(event){
        const banco = {...this.state.banco}
        banco[event.target.name] = event.target.value
        this.setState({banco})
    }

    renderForm(){
        return (
            <div className="form">
            <div className="row">
                <div className="col-12 col-md-6">
                <div className="form group">
                        <label htmlFor="codigoBanco">Codigo Banco</label>
                        <input type="text" className="form-control"
                            name="codigoBanco"
                            value={this.state.banco.codigoBanco}
                            onChange={e => this.updatefield(e)}
                            placeholder="Digite o codigo do banco."
                            />
                    </div>
                    <div className="form group">
                        <label htmlFor="descricaoBanco">Nome</label>
                        <input type="text" className="form-control"
                            name="descricaoBanco"
                            value={this.state.banco.descricaoBanco}
                            onChange={e => this.updatefield(e)}
                            placeholder="Digite o nome."
                            />
                    </div>
                    <div className="form group">
                        <label htmlFor="descricaoSigla">Sigla</label>
                        <input type="text" className="form-control"
                            name="descricaoSigla"
                            value={this.state.banco.descricaoSigla}
                            onChange={e => this.updatefield(e)}
                            placeholder="Digite a sigla."
                            />
                    </div>
                </div>
            </div>

            <br/>
            <div className="row botoes">
                <div className="col-12 d-flex justify-content end">
                    <button className="btn-primary" onClick={e => this.save(e)}>Salvar</button>
                    <button className="btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
                </div>
            </div>

        </div>
        )
    }

    render(){
        const {
           message, showMessage
          } = this.state;
          const handleHide = () => this.setState({ showMessage: false });
          
        return (
            <Main {...headerProps}>
            
          <Alert key="primary" variant="primary" show={showMessage} dismissible onClose={handleHide}>
            {message}
          </Alert>
                <Tabs
                    id="controlled-tab-example"
                    defaultActiveKey="selecao"
                >
                    <Tab eventKey="selecao" title="Seleção" className="tabSelecao">
                        {this.rendertable()}
                    </Tab>
                    <Tab eventKey="formulario" title="Formulario">
                        {this.renderForm()}
                    </Tab>
                </Tabs>
            </Main>
        );
    }
}