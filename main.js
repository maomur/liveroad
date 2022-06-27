import {Items} from './classes/Item.js';

class App {

    array = [];

    // CAZADOR DE ELEMENTOS

    //Elementos Header.
    formSearch = document.querySelector('#form-search-header');
    formAdd = document.querySelector('#form-control-add');
    searchInput = document.querySelector('#searchInput');
    searchButton = document.querySelector('#searchButton');
    addButton = document.querySelector('#addButton');
    viewAllButton = document.querySelector('#viewAllButton');

    //Inputs Nuevo Elemento
    formNewInfo = document.querySelector('#formNewInfo');
    saveButton = document.querySelector('#saveItem');
    alertSuccess = document.querySelector('#alertSuccess');
    puInput = document.querySelector('#pu');
    delInput = document.querySelector('#del');
    loadIInput = document.querySelector('#loadI');
    originInput = document.querySelector('#origin');
    destinyInput = document.querySelector('#destiny');
    commodityInput = document.querySelector('#commodity');
    brokerCompanyInput = document.querySelector('#brokerCompany');
    brokerNameInput = document.querySelector('#brokerName');
    brokerPhoneInput = document.querySelector('#brokerPhone');
    extensionInput = document.querySelector('#extension');
    rateInput = document.querySelector('#rate');
    truckNumberInput = document.querySelector('#truckNumber');
    paidUnpaidInput = document.querySelector('#paidUnpaid');


    //Boxes
    boxHide = document.querySelector('.boxHide');
    boxContent = document.querySelector('#boxContent');

    constructor(){

        this.addButton.addEventListener('click', ()=> this.addForm());

        this.saveButton.addEventListener('click', (puInput, delInput, loadIInput, originInput, destinyInput, commodityInput, brokerCompanyInput, brokerNameInput, brokerPhoneInput, extensionInput, rateInput, truckNumberInput, paidUnpaidInput) => this.createItem(puInput, delInput, loadIInput, originInput, destinyInput, commodityInput, brokerCompanyInput, brokerNameInput, brokerPhoneInput, extensionInput, rateInput, truckNumberInput, paidUnpaidInput));

        this.viewAllButton.addEventListener('submit', ()=> this.viewAll());

        this.searchButton.addEventListener('click', ()=> this.searchFuncion());

        this.viewAllButton.addEventListener('click', ()=>this.viewAll());

    }

        //-----------> FUNCIONES <-------------//

        //Habilita el formulario para agregar registros
        addForm(){
            this.boxHide.className = 'd-flex';
            this.viewAllButton.className = "form-control w-25 bg-primary text-light";
            this.addButton.className = 'd-none';
        }
 

/* ------------------------------------- INICIO FUNCIÓN DELETE --------------------------------------------  */

        //NO HE PODIDO CON ESTA FUNCIÓN; PESE A QUE EN EL ARRAY SE VE QUE SÍ ELIMINA EFECTIVAMENTE LOS ELEMENTOS, CUANDO LLAMO A LA FUNCIÓN "createItem()", o a la función "readItem()"; ninguna de éstas me permite ver en pantalla los elementos nuevos.

        deleteItem(e){
            this.array = this.array.filter( (item)=>{
                return item.id !== e.target.parentElement.dataset.id;
            })
            console.log(this.array);

            //this.createItem();
            //this.readItems();
            this.alertSuccessFuncion('Registro eliminado correctamente', 'alert-danger', 'text-ligth');

        }

        /* ------------------------------------- FIN FUNCIÓN DELETE --------------------------------------------  */


        createItem(){

            if(!this.loadIInput.value || !this.originInput){
                this.alertSuccessFuncion('ERROR: No has llenado los campos obligatorios: LOAD, ORIGIN', 'alert-danger', 'text-ligth');

                return;
            }

            const addItem = new Items(this.puInput.value, this.delInput.value, this.loadIInput.value, this.originInput.value, this.destinyInput.value, this.commodityInput.value, this.brokerCompanyInput.value, this.brokerNameInput.value, this.brokerPhoneInput.value, this.extensionInput.value, this.rateInput.value, this.truckNumberInput.value, this.paidUnpaidInput.value);
            this.array.push(addItem);
            
            this.readItems()
            
            this.clearInputs();

            this.alertSuccessFuncion('Registro creado con éxito', 'alert-success');
        }
        

        readItems(){
            const article = document.createElement('article');
            
            article.classList.add('d-flex', 'justify-content-left', 'align-items-center', 'px-3', 'border-top');

            this.array.forEach( (item)=>{
                
                article.dataset.id = item.id;
                
                //Creamos los Elementos
                const iconEye = document.createElement('i');
                const iconEdit = document.createElement('i');
                const iconDelet = document.createElement('i');
                
                //Listeners de Íconos
                iconEye.addEventListener('click', ( ()=>{
                    console.log('hola EyeIcon')
                }));
                
                iconEdit.addEventListener('click', ( ()=>{
                    console.log('Hola iconEdit');
                }));
                
                iconDelet.addEventListener('click', ( (e)=>{
                    this.deleteItem(e);
                }))

                //Asignación de Clases                
                iconEye.className = "bi bi-eye fs-3 p-1 text-primary";
                iconEdit.className = "bi bi-pencil-square p-1 fs-4 text-warning";
                iconDelet.className = "bi bi-trash3-fill p-1 fs-4 text-danger";
                
                //Insertamos Template
                article.innerHTML = `
                <div class="title-items">${this.puInput.value}</div>
                <div class="title-items">${this.delInput.value}</div>
                <div class="title-items">${this.loadIInput.value}</div>
                <div class="title-items me-auto">${this.originInput.value}</div>
                `   
                //Insertamos Contenidos
                article.append(iconEye, iconEdit, iconDelet);
                boxContent.append(article);
                
                //Mostramos la Caja inferior de Resultados
                this.boxContent.className = 'd-show';
            })
        }

        //Mostramos los registros actuaales y ocultamos el formulario
        viewAll(){
        
            this.addButton.className = 'form-control w-25 bg-warning d-block';
            this.boxContent.className = 'd-show';
            this.viewAllButton.className = 'd-none';
    
            if(this.formNewInfo.className === 'd-flex justify-content-end p-2 otro'){
                this.boxHide.className = 'd-none';
            } 
        }

        //Toasts
        alertSuccessFuncion(mensaje = 'Ha ocurrido un error', color = 'alert-success'){
            const alertS = document.createElement('div');
            alertS.className = `alert ${color} fade show alert-style`;
            alertS.setAttribute('role', 'alert');
            alertS.innerHTML = `
            ${mensaje}
            `;
            document.body.prepend(alertS);
            setTimeout( ()=> { 
                alertS.remove();
              }, 4000)
        }  

        //Limpiamos Inputs y Focalizamos en el campo inicial
        clearInputs(){
            this.puInput.value = '';
            this.delInput.value = '';
            this.loadIInput.value = '';
            this.originInput.value = '';
            this.destinyInput.value = '';
            this.commodityInput.value = '';
            this.brokerCompanyInput.value = '';
            this.brokerNameInput.value = '';
            this.brokerPhoneInput.value = '';
            this.extensionInput.value = '';
            this.rateInput.value = '';
            this.truckNumberInput.value = '';
            this.paidUnpaidInput.value = 'unselect';
            this.puInput.focus()
        }

}

const app = new App();