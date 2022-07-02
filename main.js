import {Items} from './classes/Item.js';

class App {

    array = [];
    iCurrent = 0;

    // CAZADOR DE ELEMENTOS

    //Elementos Header.
    formSearch = document.querySelector('#form-search-header');
    formAdd = document.querySelector('#form-control-add');
    searchInput = document.querySelector('#searchInput');
    searchButton = document.querySelector('#searchButton');
    addButton = document.querySelector('#addButton');
    viewAllButton = document.querySelector('#viewAllButton');

    //Inputs Nuevo Elemento
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

    formNewInfo = document.querySelector('#formNewInfo');
    saveButton = document.querySelector('#saveItem');
    updateButton = document.querySelector('#updateButton');
    alertSuccess = document.querySelector('#alertSuccess');


    //Boxes
    boxHide = document.querySelector('.boxHide');
    boxHeaderItems = document.querySelector('#boxHeaderItems');
    boxContent = document.querySelector('#boxContent');
    modalBody = document.querySelector('.modal-body');
    modalDelete = document.querySelector('.modal-delete');
    buttonConfirm = document.querySelector('#buttonConfirm');

    constructor(){

        this.addButton.addEventListener('click', ()=> this.addForm());

        this.saveButton.addEventListener('click', (puInput, delInput, loadIInput, originInput, destinyInput, commodityInput, brokerCompanyInput, brokerNameInput, brokerPhoneInput, extensionInput, rateInput, truckNumberInput, paidUnpaidInput) => this.createItem(puInput, delInput, loadIInput, originInput, destinyInput, commodityInput, brokerCompanyInput, brokerNameInput, brokerPhoneInput, extensionInput, rateInput, truckNumberInput, paidUnpaidInput));

        this.viewAllButton.addEventListener('submit', ()=> this.viewAll());

        this.searchInput.addEventListener('keyup', ()=> this.filter());

        this.viewAllButton.addEventListener('click', ()=>this.viewAll());

        this.updateButton.addEventListener('click', ()=> this.updateItem());

    }

//------------------> FUNCIONES <-------------------//

        //Habilita el formulario para agregar registros

        addForm(){
            this.boxHide.className = 'd-flex';
            this.viewAllButton.className = "form-control w-25 bg-dark text-light";
            this.addButton.className = 'd-none';
        }
 
        
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
        

        readItems(myArray = this.array){
            this.boxContent.innerHTML = "";
            myArray.forEach( (item)=>{
                const article = document.createElement('article');
                
                article.classList.add('d-flex', 'justify-content-left', 'align-items-center', 'px-3', 'border-top');
                
                article.dataset.id = item.id;
                
                //Creamos los Elementos
                const iconEye = document.createElement('i');
                const iconEdit = document.createElement('i');
                const iconDelet = document.createElement('i');
                
                //Listeners de Íconos
                iconEye.addEventListener('click', ( e => this.showItem(e)));
                
                iconEdit.addEventListener('click', ( () => this.editItem(item.id)));
                
                iconDelet.addEventListener('click', ( e => this.deleteItem(e)));

                //Asignación de Clases y Atributos            
                iconEye.className = "bi bi-eye fs-3 p-1 text-primary";
                iconEdit.className = "bi bi-pencil-square p-1 fs-4 text-warning";
                iconDelet.className = "bi bi-trash3-fill p-1 fs-4 text-danger";
                iconDelet.setAttribute('data-bs-toggle', 'modal');
                iconDelet.setAttribute('data-bs-target', '#deleteModal');
                iconEye.setAttribute('data-bs-toggle', 'modal');
                iconEye.setAttribute('data-bs-target', '#itemModal');
                iconEye.className = 'bi bi-eye fs-3 p-1 text-primary';
                
                //Insertamos Template
                article.innerHTML = `
                <div class="title-items">${item.pu}</div>
                <div class="title-items">${item.load}</div>
                <div class="title-items">${item.origin}</div>
                <div class="title-items me-auto">${item.destiny}</div>
                `   
                //Mostramos la Cajas de Resultados
                this.boxHeaderItems.className = "d-show";
                this.boxContent.className = 'd-show';

                //Insertamos Contenidos
                article.append(iconEye, iconEdit, iconDelet);
                boxContent.appendChild(article);
                
            })
        }

        editItem(id){
            this.updateButton.className = "form-control bg-success text-light d-show"
            this.saveButton.className = 'd-none';

            const itemUpdate = this.array.find( (item)=>{
                //const iCurrent = e.target.parentElement.dataset.id;
                return item.id === id})

                this.puInput.value = itemUpdate.pu;
                this.delInput.value = itemUpdate.del;
                this.loadIInput.value = itemUpdate.load;
                this.originInput.value = itemUpdate.origin;
                this.destinyInput.value = itemUpdate.destiny;
                this.commodityInput.value = itemUpdate.commodity;
                this.brokerCompanyInput.value = itemUpdate.brokerCompany;
                this.brokerNameInput.value = itemUpdate.brokerName;
                this.brokerPhoneInput.value = itemUpdate.brokerPhone;
                this.extensionInput.value = itemUpdate.phoneExtension;
                this.rateInput.value = itemUpdate.rate;
                this.truckNumberInput.value = itemUpdate.truckNumber;
                this.paidUnpaidInput.value = itemUpdate.paid;
                this.iCurrent = itemUpdate.id;
                
        }

        updateItem(){
        
        this.updateButton.className = "form-control bg-success text-light d-none";
        this.saveButton.className = 'form-control bg-dark text-light';

            this.array = this.array.map( (item)=>{
                if(item.id === this.iCurrent){
                    return {...item, pu: this.puInput.value, del: this.delInput.value, load: this.loadIInput.value, origin: this.originInput.value, destiny: this.destinyInput.value, commodity: this.commodityInput.value, brokerCompany: this.brokerCompanyInput.value, brokerName: this.brokerNameInput.value, brokerName: this.brokerNameInput.value, brokerPhone: this.brokerPhoneInput.value, phoneExtension: this.extensionInput.value, rate: this.rateInput.value, truckNumber: this.truckNumberInput.value, paid: this.paidUnpaidInput.value}
                } else{
                    return item;
                }
            })
            
            this.alertSuccessFuncion('Registro Actualizado con Éxito', 'alert-primary');

            this.readItems()
            
            this.clearInputs();

            this.iCurrent = 0;
            this.readItems();
            console.log(this.array)
        }

        deleteItem(e){
            
            this.buttonConfirm.addEventListener('click', ()=>{
                this.array = this.array.filter( (item)=>{
                return item.id !== e.target.parentElement.dataset.id;
                })
                this.alertSuccessFuncion('Registro eliminado correctamente', 'alert-danger', 'text-ligth');                    
                this.readItems();
                })         
        }
        

        filter(){
            if(this.searchInput.value === ''){
                this.readItems();
            } else{

                this.newFilteredArray = this.array.filter( (item)=>{
                    const searchLower = this.searchInput.value.toLowerCase();
                    const loadLower = item.load.toLowerCase();
                    return searchLower == loadLower;
                })
                this.readItems(this.newFilteredArray);
            }         
        }


        showItem(e){
            this.modalBody.innerHTML = '';
            this.array.forEach( (item)=>{
                if(item.id !== e.target.parentElement.dataset.id){return}

            const modalInfo = document.createElement('div');

            modalInfo.innerHTML = 
            `
            <h4 class="d-block px-4">Main Information</h4>
            <hr>
            <div class="d-flex flex-wrap gap-5 p-3">
                <div class="col-2">
                    <h3 class="fs-6">Pick Up</h3>
                    <p>${item.pu}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Delivery</h3>
                    <p>${item.del}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Load</h3>
                    <p>${item.load}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Origin</h3>
                    <p>${item.origin}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Destination</h3>
                    <p>${item.destiny}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Commodity</h3>
                    <p>${item.commodity}</p>
                </div>
            </div>
            <h4 class="d-block px-4">Broker Information</h4>
            <hr>

            <div class="d-flex flex-wrap gap-5 p-3">
                <div class="col-2">
                    <h3 class="fs-6">Company</h3>
                    <p>${item.brokerCompany}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Name</h3>
                    <p>${item.brokerName}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Phone</h3>
                    <p>${item.brokerPhone}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Extension</h3>
                    <p>${item.phoneExtension}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Rate</h3>
                    <p>${item.rate}</p>
                </div>
                <div class="col-2">
                    <h3 class="fs-6">Truck No</h3>
                    <p>${item.truckNumber}</p>
                </div>
            </div>
            <h4 class="d-block px-4">Status</h4>
            <hr>
            <div class="col-2">
                <h3 class="fs-6">Paid/Unpaid</h3>
                <p>${item.paid}</p>
            </div>

            `
            this.modalBody.append(modalInfo);
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