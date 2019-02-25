class Despesa
{
    constructor(ano, mes, dia,tipo, descricao,valor)
    {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados()
    {
        for (let  i in this)
         {
             console.log(this[i])
            if (this[i] == undefined || this[i] == "" || this[i] == null) 
            {
               return false
            }                           
        }
        return true
    }
}

class BD 
{

    constructor()
    {
        let id = localStorage.getItem('id')

        if(id === null){
        
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return  parseInt(proximoId)+1
    }

    gravar(d){

        let id = this.getProximoId();
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id',id)
    }

    carregarDados(){

        //pegou a quantidade de itens no localstorage
        let getDados = localStorage.getItem('id')

        //criando um array
        let despesas = Array()

        for (let i = 1; i <= getDados; i++) {
            //setando o valores do localStorage numa variável 
            let dados = JSON.parse(localStorage.getItem(i))

            if(dados == null){
                continue
            }          
            //adicionando ao array despesas objetos Despensas
             despesas.push(dados)   
        }

        return despesas
      
    }
    
}

let bd = new BD();


function cadastrarDespesa(){
 
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');


    let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
        )
console.log(despesa)


if(despesa.validarDados()){
    bd.gravar(despesa)
    
    document.getElementById('modal_titulo').innerHTML ="SUCESSO!"
    document.getElementById('modal_titulo').className = "modal-title text-success" 
    document.getElementById('modal_body').innerHTML = "Despesa gravada com sucesso"
    document.getElementById('modal_button').innerHTML = "Voltar"
    document.getElementById('modal_button').className = "btn btn-success"


    $("#modalRegitrarDespesa").modal('show')
}else{

    document.getElementById('modal_titulo').innerHTML = "ERROR!"
    document.getElementById('modal_titulo').className = "modal-title text-danger" 
    document.getElementById('modal_body').innerHTML = "Todos os campos devem ser preenchidos!!"
    document.getElementById('modal_button').innerHTML = "Voltar e Corrigir"
    document.getElementById('modal_button').className = "btn btn-danger"

    $("#modalRegitrarDespesa").modal('show')
}
    
}

 function carregarDespesa(){

    let getDespesas = Array()

    getDespesas = bd.carregarDados()
     return getDespesas
   
 }

