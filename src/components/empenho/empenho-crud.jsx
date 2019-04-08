import React from 'react'
import Main from '../templates/main'
import axios from 'axios'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Alert from 'react-bootstrap/Alert'

const headerProps = {
    icone:'android',
    title: 'Empenho',
    subtitle: 'Cadastro de Empenho'
}

const baseUrl = 'http://3.16.111.170:8080'
const initState = {
    empenho: {codigoCredor: null , dataEmpenho:'', valorEmpenho: '', dataLastrec : "2019-01-01", codigoUsuario : "renato"},
    list: [],
    pages:new Array(),
    currentPage : 0 ,
    showMessage: false,
    message: ''
}

const pageSize = 4;

export default class EmpenhoCrud extends React.Component{
    state = { ...initState}
    
    getList(){
        axios(`${baseUrl}/recuperaEmpenhos?page=${this.state.currentPage}&size=${pageSize}`).then(resp => {
           if (resp && resp.data){
               this.setState({list: resp.data.content, pages:new Array(resp.data.totalPages)})
           }else{
            this.setState({list: [], pages:new Array(1)})
           }
        })
    }
    componentWillMount(){
       this.getList();
    }

    clear(){
        this.setState({empenho: initState.empenho})
        document.getElementById('controlled-tab-example-tab-selecao').click();
    }

    setPage(i) {
        this.setState({currentPage: i}, ()=>{
            console.log(this.state.currentPage)
            this.getList();
        })
        
      }

montaPayloadEmpenho(empenho){
    {
        empenho.idtTipoempenho = "1";
        empenho.numeroLicitacao = null;
        empenho.funcionalProgramatica = "02.05.01.10.303.1004.2035";
        empenho.dataEmpenho = "2018-01-02T02:00:00.000+0000";
        empenho.unidadeOrcamentaria = "02.05.01";
        empenho.descricaoUnidadeOrcamentaria = "Fundo Municipal de Saude";
        empenho.naturezaDespesa  = "3.3.90.39.00";
        empenho.descricaoNaturezaDespesa = "Outros Serv. Terceiros - Pessoa Jurídica";
        empenho.naturezaDespesaExecucacao = "3.3.90.39.99";
        empenho.descricaoNaturezaDespesaExecucao = "Outros Serv. Terceiros -Pessoa Jurídica";
        empenho.fonteRecurso = "1.02.00";
        empenho.descricacaoRecurso = "Recursos Próprios - Saúde   mínimo 15%";
        empenho.fonteRecursoExecucao = "1.02.00";
        empenho.descricacaoRecursoExecucao = "Recursos Próprios - Saúde   mínimo 15%";
        empenho.fichaOrcamento = 183;
        empenho.codigoVPD = "3.3.2.3.1.99.00";
        empenho.descricaoVPD = "OUTROS SERVIÇOS TERCEIROS - PJ";
        empenho.codigoGrupoEntidadeCompras = 1;
        empenho.codigoModalidadeLicitacao = 7;
        empenho.descricaoModalidadeLicitacao = "Pregão                                  ";
        empenho.descricaoMotivolicitacao  = null;
        empenho.flagPessoal  = "0";
        empenho.idtHistorico  = null;
        empenho.idtTipodespesa  = "00";
        empenho.flagExcdesptotal  =null;
        empenho.dataLastrec  = null;
        empenho.codigoUsuario = null;
        empenho.flagIncidedirf  = null;
        empenho.codigoServico  = null;
        empenho.flagContrato =  null;
        empenho.numeroContrato = null;
        empenho.numeroCPF  = null;
        empenho.numeroCNPJ = null;
        empenho.dataAssinatura = null;
        empenho.numeroSequencialaditivo  = null;
        empenho.flagLicitacao  = null;
        empenho.numeroProcessosicom = null;
        empenho.numeroExerciciosicom = null;
        empenho.idtObraservmanad = null;
        empenho.numeroObrainss = null;
        empenho.flagPpp = null;
        empenho.numeroEmpenhoconcorrente  = null;
        empenho.flagIntegracaofolha = null;
        empenho.flagDespesapublicidade = null;
        empenho.flagDespesapagtoantecipado  = null;
        empenho.idtTipodespesarpps  = null;
        empenho.codunidadesub  = null;
        empenho.codunidadesuborig = null;
        empenho.flagDespesaimpugnada = "0";
        empenho.codigoCredor = 5465;
        empenho.nomeCredor  = "NAVEGADOR INTERNET LTDA ME";
        empenho.historicoEmpenho = "VALOR REFERENTE A SERVI�O DE TELEPROCESSAMENTO(INTERNET BANDA LARGA),PARA O PR�DIO DA FARM�CIA B�SICA,CONFORME NAF 000042 E PROCESSO 000031/2017.\r\n";
        empenho.codigoEntidade = parseInt(empenho.codigoEntidade)
        empenho.serieEmpenho = parseInt(empenho.serieEmpenho)
        empenho.valorEmpenho = parseFloat(empenho.valorEmpenho)
        empenho.numeroEmpenho = parseInt(empenho.numeroEmpenho)
    }
}

    save() {
        const empenho = this.state.empenho
        const method = 'post'
        const url = `${baseUrl}/salvarempenho`;
        this.montaPayloadEmpenho(empenho)
        axios[method](url, empenho).then(resp =>{
            const list = this.getUpdatedList(resp.data)
            this.setState({empenho: initState.empenho, list})
            document.getElementById('controlled-tab-example-tab-selecao').click();
            this.setState({
                showMessage: true,
                message: 'Empenho salvo com sucesso!'
              });
        })
    }

    remove(empenho){
        axios.delete(`${baseUrl}/excluirempenho/${empenho.codigoEntidade}/${empenho.serieEmpenho}/${empenho.numeroEmpenho}`).then(resp => {
            const list = this.state.list.filter(u => u !== empenho)
            this.setState({list})
        })
    }

    rendertable(){
        return(
            <table className="table st-4">
            <thead>
                <tr>
                    <th width="10%">Numero </th>
                    <th width="10%">Serie</th>
                    <th width="10%">Codigo Entidade</th>
                    <th width="10%">Usuario</th>
                    <th width="20%">Valor</th>
                    <th width="40%">Acoes</th>
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
                     <a className='nav-link nav-link btn mr-2' href='#' onClick={() => this.setPage(index)}> {index + 1}</a>
                </li>
        )})
    }

    loadEmpenho(empenho){
        document.getElementById('controlled-tab-example-tab-formulario').click();
        axios(`${baseUrl}/empenho?codigoEntidade=${empenho.codigoEntidade}&serieEmpenho=${empenho.serieEmpenho}&numeroEmpenho=${empenho.numeroEmpenho}`).then(resp => {
            this.setState({empenho:resp.data})
        })
    }
    removeBanco(empenho){
        axios(`${baseUrl}/excluirempenho?codigoEntidade=${empenho.codigoEntidade}&serieEmpenho=${empenho.serieEmpenho}&numeroEmpenho=${empenho.numeroEmpenho}`).then(resp => {
            this.setState({showMessage: true,
                message: 'Banco removido com sucesso!'}, ()=>{
                console.log(this.state.currentPage)
                this.getList();
            })
        })
    }
    renderows(){
        return this.state.list.map(empenho => {
            return (
                <tr key={empenho.numeroEmpenho}>
                     <td >{empenho.numeroEmpenho}</td>
                    <td >{empenho.serieEmpenho}</td>
                    <td>{empenho.codigoEntidade}</td>
                    <td>{empenho.codigoUsuario}</td>
                    <td>{empenho.valorEmpenho}</td>
                    <td>
                        <button className="btn btn-warning mr-2" onClick={() => this.loadBanco(empenho)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        
                        <button className="btn btn-danger" onClick={() => this.removeBanco(empenho)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>


            )
        })
    }
    getUpdatedList(empenho){
        const list = this.state.list.filter(u => u.numeroEmpenho !== empenho.numeroEmpenho)
        list.unshift(empenho)
        return list
    }

    updatefield(event){
        const empenho = {...this.state.empenho}
        empenho[event.target.name] = event.target.value
        this.setState({empenho})
    }

    renderForm(){
        return (
            <div className="formEmpenho">
            <Tabs
            id="controlled-tab-empenho"
            defaultActiveKey="parte1"
        >
            <Tab eventKey="parte1" title="Identificação" >
               <div className="row">
                <div className="col-6 col-md-6">
                    <div className="form group">
                            <label htmlFor="numeroEmpenho">Número Empenho</label>
                            <input type="text" className="form-control"
                                name="numeroEmpenho"
                                value={this.state.empenho.numeroEmpenho}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o Número do empenho."
                                />
                        </div>
                    </div>
                    <div className="col-6 col-md-6">
                        <div className="form group">
                            <label htmlFor="serieEmpenho">Serie</label>
                            <input type="text" className="form-control"
                                name="serieEmpenho"
                                value={this.state.empenho.serieEmpenho}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite a serie do Empenho."
                                />
                        </div>
                    </div>
                </div>
                <div className="row">
                 <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="codigoEntidade">Entidade</label>
                        <input type="text" className="form-control"
                            name="codigoEntidade"
                            value={this.state.empenho.codigoEntidade}
                            onChange={e => this.updatefield(e)}
                            placeholder="Digite o codigo da entidade."
                            />
                    </div>
                </div>
                <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="valorEmpenho">Valor</label>
                        <input type="text" className="form-control"
                            name="valorEmpenho"
                            value={this.state.empenho.valorEmpenho}
                            onChange={e => this.updatefield(e)}
                            placeholder="Digite o valor do Empenho."
                            />
                    </div>
                </div>
                </div>
            </Tab>
            <Tab eventKey="parte2" title="Credor">
        <div className="row">
                 <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="codigoCredor">Codigo Credor</label>
                        <input type="text" className="form-control"
                            name="codigoCredor"
                            value={this.state.empenho.codigoCredor}
                            onChange={e => this.updatefield(e)}
                            placeholder="5465"
                            />
                    </div>
                </div>
                <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="nomeCredor">Valor</label>
                        <input type="text" className="form-control"
                            name="nomeCredor"
                            value={this.state.empenho.nomeCredor}
                            onChange={e => this.updatefield(e)}
                            placeholder="NAVEGADOR INTERNET LTDA ME"
                            />
                    </div>
                </div>
                </div>

                <div className="row">
                 <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="numeroCPF">CPF</label>
                        <input type="text" className="form-control"
                            name="numeroCPF"
                            value={this.state.empenho.numeroCPF}
                            onChange={e => this.updatefield(e)}
                            placeholder="CPF"
                            />
                    </div>
                </div>
                <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="numeroCNPJ">CNPJ</label>
                        <input type="text" className="form-control"
                            name="numeroCNPJ"
                            value={this.state.empenho.numeroCNPJ}
                            onChange={e => this.updatefield(e)}
                            placeholder="CNPJ"
                            />
                    </div>
                </div>
                </div>
            </Tab>
           

            <Tab eventKey="parte3" title="Fonte Recurso">
        <div className="row">
                 <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="fonteRecurso">Fonte Recurso</label>
                        <input type="text" className="form-control"
                            name="fonteRecurso"
                            value={this.state.empenho.fonteRecurso}
                            onChange={e => this.updatefield(e)}
                            placeholder="1.02.00"
                            />
                    </div>
                </div>
               
                <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="descricacaoRecurso">Descricacao Recurso</label>
                        <input type="text" className="form-control"
                            name="descricacaoRecurso"
                            value={this.state.empenho.descricacaoRecurso}
                            onChange={e => this.updatefield(e)}
                            placeholder="Recursos Próprios - Saúde   mínimo 15%"
                            />
                    </div>
                </div>
                </div>
                <div className="row">
                 <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="fonteRecursoExecucao">Fonte Recurso Execução</label>
                        <input type="text" className="form-control"
                            name="fonteRecursoExecucao"
                            value={this.state.empenho.fonteRecursoExecucao}
                            onChange={e => this.updatefield(e)}
                            placeholder="1.02.00"
                            />
                    </div>
                </div>
               
                <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="descricacaoRecursoExecucao">Descricacao Recurso Execução </label>
                        <input type="text" className="form-control"
                            name="descricacaoRecursoExecucao"
                            value={this.state.empenho.descricacaoRecursoExecucao}
                            onChange={e => this.updatefield(e)}
                            placeholder="Recursos Próprios - Saúde   mínimo 15%"
                            />
                    </div>
                </div>
                </div>
            </Tab>
           
            <Tab eventKey="naturezaDespeza" title="Natureza de Despeza" >
               <div className="row">
                <div className="col-6 col-md-6">
                    <div className="form group">
                            <label htmlFor="naturezaDespesa">Natureza Despesa</label>
                            <input type="text" className="form-control"
                                name="naturezaDespesa"
                                value={this.state.empenho.naturezaDespesa}
                                onChange={e => this.updatefield(e)}
                                placeholder="3.3.90.39.00"
                                />
                        </div>
                    </div>
                    <div className="col-6 col-md-6">
                        <div className="form group">
                            <label htmlFor="descricaoNaturezaDespesa">Desc. Natureza Despeza</label>
                            <input type="text" className="form-control"
                                name="descricaoNaturezaDespesa"
                                value={this.state.empenho.descricaoNaturezaDespesa}
                                onChange={e => this.updatefield(e)}
                                placeholder="Outros Serv. Terceiros - Pessoa Jurídica"
                                />
                        </div>
                    </div>
                </div>
                <div className="row">
                 <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="naturezaDespesaExecucacao">Natureza Despesa Execucacao</label>
                        <input type="text" className="form-control"
                            name="naturezaDespesaExecucacao"
                            value={this.state.empenho.naturezaDespesaExecucacao}
                            onChange={e => this.updatefield(e)}
                            placeholder="3.3.90.39.99"
                            />
                    </div>
                </div>
                <div className="col-6 col-md-6">
                    <div className="form group">
                        <label htmlFor="descricaoNaturezaDespesaExecucao">Descrição da Natureza Despesa Execucacao</label>
                        <input type="text" className="form-control"
                            name="descricaoNaturezaDespesaExecucao"
                            value={this.state.empenho.descricaoNaturezaDespesaExecucao}
                            onChange={e => this.updatefield(e)}
                            placeholder="Outros Serv. Terceiros -Pessoa Jurídica"
                            />
                    </div>
                </div>
                </div>
</Tab>


<Tab eventKey="licitacao" title="Licitação" >

            <div className="row">
                <div className="col-6 col-md-6">
                    <div className="form group">
                            <label htmlFor="codigoGrupoEntidadeCompras">Codigo Grupo Entidade Compras</label>
                            <input type="text" className="form-control"
                                name="codigoGrupoEntidadeCompras"
                                value={this.state.empenho.codigoGrupoEntidadeCompras}
                                onChange={e => this.updatefield(e)}
                                placeholder="1"
                                />
                        </div>
                    </div>
                    <div className="col-6 col-md-6">
                        <div className="form group">
                            <label htmlFor="descricaoMotivolicitacao">Desc. Motivo Licitação</label>
                            <input type="text" className="form-control"
                                name="descricaoMotivolicitacao"
                                value={this.state.empenho.descricaoMotivolicitacao}
                                onChange={e => this.updatefield(e)}
                                placeholder="Descrição do motivo da licitação"
                                />
                        </div>
                    </div>
            </div>

            <div className="row">
                <div className="col-6 col-md-6">
                    <div className="form group">
                            <label htmlFor="codigoModalidadeLicitacao">Codigo Modalidade Licitação.</label>
                            <input type="text" className="form-control"
                                name="codigoModalidadeLicitacao"
                                value={this.state.empenho.codigoModalidadeLicitacao}
                                onChange={e => this.updatefield(e)}
                                placeholder="7"
                                />
                        </div>
                    </div>
                    <div className="col-6 col-md-6">
                        <div className="form group">
                            <label htmlFor="descricaoModalidadeLicitacao">Descricao Modalidade Licitacao.</label>
                            <input type="text" className="form-control"
                                name="descricaoModalidadeLicitacao"
                                value={this.state.empenho.descricaoModalidadeLicitacao}
                                onChange={e => this.updatefield(e)}
                                placeholder="Descrição do motivo da licitação"
                                />
                        </div>
                    </div>
            </div>
 
</Tab>



        </Tabs>
<br></br>
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