import {Items} from './classes/Item.js';

class App {

    array = [];
    iCurrent = 0;

    // CAZADOR DE ELEMENTOS

    //Elementos Header.
    formSearch = document.querySelector('#form-search-header');
    formAdd = document.querySelector('#form-control-add');
    searchInput = document.querySelector('#searchInput');
    closeSearchButton = document.querySelector('#closeSearch');
    goIconSearch = document.querySelector('#goIcon');
    addButton = document.querySelector('#addButton');
    viewAllButton = document.querySelector('#viewAllButton');

    //Inputs Nuevo Elemento
    puMinput = document.querySelector('#puM');
    puDinput = document.querySelector('#puD');
    puAinput = document.querySelector('#puA');
    delMinput = document.querySelector('#delM');
    delDinput = document.querySelector('#delD');
    delAinput = document.querySelector('#delA');
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
    saveDiv = document.querySelector('#saveDiv');
    updateDiv = document.querySelector('#updateDiv');
    cancelDiv = document.querySelector('#cancelDiv');
    updateButton = document.querySelector('#updateButton');
    cancelButton = document.querySelector('#cancelUpdate')
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

        this.saveButton.addEventListener('click', (puMinput, puDinput, puAinput, delMinput, delDinput, delAinput, loadIInput, originInput, destinyInput, commodityInput, brokerCompanyInput, brokerNameInput, brokerPhoneInput, extensionInput, rateInput, truckNumberInput, paidUnpaidInput) => this.createItem(puMinput, puDinput, puAinput, delMinput, delDinput, delAinput, loadIInput, originInput, destinyInput, commodityInput, brokerCompanyInput, brokerNameInput, brokerPhoneInput, extensionInput, rateInput, truckNumberInput, paidUnpaidInput));

        this.viewAllButton.addEventListener('submit', ()=> this.viewAll());

        this.searchInput.addEventListener('keypress', (e)=> {
            if(e.keyCode === 13){
                e.preventDefault();
                this.filter()}
            }
            );

        this.closeSearchButton.addEventListener('click', () => this.resetSearch());

        this.goIconSearch.addEventListener('click', () => this.filter());

        this.viewAllButton.addEventListener('click', () => this.viewAll());

        this.updateButton.addEventListener('click', () => this.updateItem());

        this.brokerPhoneInput.addEventListener('keydown', () => this.phonenumberFormatter());

        this.rateInput.addEventListener('keyup', () => this.currencyFormatter());

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
                this.alertSuccessFuncion('ERROR: you have not filled in the field O-City', 'alert-danger', 'text-ligth');
                return;
            }

            const addItem = new Items(this.puMinput.value, this.puDinput.value, this.puAinput.value, this.delMinput.value, this.delDinput.value, this.delAinput.value, this.loadIInput.value, this.originInput.value, this.destinyInput.value, this.commodityInput.value, this.brokerCompanyInput.value, this.brokerNameInput.value, this.brokerPhoneInput.value, this.extensionInput.value, this.rateInput.value, this.truckNumberInput.value, this.paidUnpaidInput.value);

            this.array.push(addItem);
            
            this.readItems()
            
            this.clearInputs();

            this.alertSuccessFuncion('Record created successfully', 'alert-success');
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
                <div class="title-items">${item.puM}-${item.puD}-${item.puA}</div>
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
            this.updateDiv.className = 'd-show col-4 button';
            this.updateButton.className = "form-control bg-success text-light"

            this.saveDiv.className = 'd-none';
            this.cancelDiv.className = 'd-show col-4 button';
            this.cancelButton.className = 'form-control bg-dark text-light form-control';

            //Escuchamos el cancelButton
            this.cancelButton.addEventListener('click', ()=>{
                this.clearInputs();
                this.updateDiv.className = 'd-none';
                this.cancelDiv.className = 'd-none';
                this.saveDiv.className = 'd-show col-4 button';
                
                
            });
            

            this.boxHide.className = 'd-show';

            const itemUpdate = this.array.find( (item)=>{
                return item.id === id})

                this.puMinput.value = itemUpdate.puM;
                this.puDinput.value = itemUpdate.puD;
                this.puAinput.value = itemUpdate.puA;
                this.delMinput.value = itemUpdate.delM;
                this.delDinput.value = itemUpdate.delD;
                this.delAinput.value = itemUpdate.delA;
                this.loadIInput.value = itemUpdate.load;
                this.originInput.value = itemUpdate.origin;
                this.destinyInput.value = itemUpdate.destiny;
                this.commodityInput.value = itemUpdate.commodity;
                this.brokerCompanyInput.value = itemUpdate.brokerCompany;
                this.brokerNameInput.value = itemUpdate.brokerName;
                this.brokerPhoneInput.value = itemUpdate.brokerPhone;
                this.extensionInput.value = itemUpdate.phoneExtension;
                this.rateInput.value = 0;
                this.truckNumberInput.value = itemUpdate.truckNumber;
                this.paidUnpaidInput.value = itemUpdate.paid;
                this.iCurrent = itemUpdate.id;
                
        }

        updateItem(){
        
        this.updateButton.className = "form-control bg-success text-light d-none";
        this.saveButton.className = 'form-control bg-dark text-light';

            this.array = this.array.map( (item)=>{
                if(item.id === this.iCurrent){
                    return {...item, puM: this.puMinput.value, puD: this.puDinput.value, puA: this.puAinput.value,  delM: this.delMinput.value, delD: this.delDinput.value, delA: this.delAinput.value, load: this.loadIInput.value, origin: this.originInput.value, destiny: this.destinyInput.value, commodity: this.commodityInput.value, brokerCompany: this.brokerCompanyInput.value, brokerName: this.brokerNameInput.value, brokerName: this.brokerNameInput.value, brokerPhone: this.brokerPhoneInput.value, phoneExtension: this.extensionInput.value, rate: this.rateInput.value, truckNumber: this.truckNumberInput.value, paid: this.paidUnpaidInput.value}
                } else{
                    return item;
                }
            })
            
            this.alertSuccessFuncion('The record has been updated', 'alert-primary');

            this.readItems()
            
            this.clearInputs();

            this.iCurrent = 0;
            this.readItems();
            this.boxHide.className = 'd-none';
            this.addButton.className = 'd-show form-control w-25 main-color text-light';
            this.viewAllButton.className = 'd-none';

        }

        deleteItem(e){
            
            this.buttonConfirm.addEventListener('click', ()=>{
                this.array = this.array.filter( (item)=>{
                return item.id !== e.target.parentElement.dataset.id;
                })
                this.alertSuccessFuncion('The record has been deleted', 'alert-danger', 'text-ligth');                    
                this.readItems();
                })         
        }
        

        filter(){
            this.closeSearchButton.className = 'd-show';
            if(this.searchInput.value === ''){
                this.readItems();
            } else{

                this.newFilteredArray = this.array.filter( (item)=>{
                    const searchLower = this.searchInput.value.toLowerCase();
                    const loadLower = item.load.toLowerCase();
                    return searchLower == loadLower;
                })
                this.searchInput.value = '';
                this.readItems(this.newFilteredArray);
            }         
        }
        
        resetSearch(){
            this.closeSearchButton.className = 'd-none';
            this.readItems();
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
            <div class="d-flex flex-wrap gap-4 p-5">
                <div class="col-3">
                    <h3 class="fs-6">PICKUP</h3>
                    <p class = "fs-5">${item.puM}-${item.puD}-${item.puA}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">DELIVERY</h3>
                    <p class = "fs-5">${item.delM}-${item.delD}-${item.delA}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">LOAD</h3>
                    <p class = "fs-5">${item.load}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">O-City</h3>
                    <p class = "fs-5">${item.origin}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">D-City</h3>
                    <p class = "fs-5">${item.destiny}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">Commodity</h3>
                    <p class = "fs-5">${item.commodity}</p>
                </div>
            </div>
            <h4 class="d-block px-4">Broker Information</h4>
            <hr>

            <div class="d-flex flex-wrap gap-4 p-5">
                <div class="col-3">
                    <h3 class="fs-6">Company</h3>
                    <p class = "fs-5">${item.brokerCompany}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">Name</h3>
                    <p class = "fs-5">${item.brokerName}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">Phone</h3>
                    <p class = "fs-5">${item.brokerPhone}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">Extension</h3>
                    <p class = "fs-5">${item.phoneExtension}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">Rate</h3>
                    <p class = "fs-5">${item.rate}</p>
                </div>
                <div class="col-3">
                    <h3 class="fs-6">Truck No</h3>
                    <p class = "fs-5">${item.truckNumber}</p>
                </div>
            </div>
            <div class = "gap-4 p-5">
                <h4 class="d-block px-4">Status</h4>
                <hr>
                <div class="col-3">
                    <h3 class="fs-6">Paid/Unpaid</h3>
                    <p class = "fs-5">${item.paid}</p>
                </div>
            </div>

            `
            this.modalBody.append(modalInfo);
            })
        }
       

        //Mostramos los registros actuaales y ocultamos el formulario

        viewAll(){
        
            this.addButton.className = 'form-control w-25 main-color text-light d-block';
            this.boxContent.className = 'd-show';
            this.viewAllButton.className = 'd-none';
    
            if(this.formNewInfo.className === 'd-flex justify-content-end p-2 otro'){
                this.boxHide.className = 'd-none';
            } 
        }

        phonenumberFormatter(){
            const inputField = document.getElementById('brokerPhone');
            const formattedInputValue = this.formatPhoneNumber(inputField.value);
            inputField.value = formattedInputValue;
        };


        formatPhoneNumber(value) {
            if (!value) return value;
            const phoneNumber = value.replace(/[^\d]/g, '');
            const phoneNumberLength = phoneNumber.length;
            if (phoneNumberLength < 4) return phoneNumber;
            if (phoneNumberLength < 7) {
              return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
            }
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
              3,
              6
            )}-${phoneNumber.slice(6, 10)}`;
          }


          currencyFormatter(){
            const rateUnconverter = this.rateInput.value;
            const rateConvertted = rateUnconverter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            if(rateConvertted < 3){
                return `$${rateUnconverter}`;
            }

            if(rateUnconverter < 4){
                return `$${rateUnconverter.slice(0,1)}, ${rateUnconverter.slice(1,4)} `
            }

            if(rateUnconverter < 5){
                return `$${rateUnconverter.slice(0,2)}, ${rateUnconverter.slice(2,5)} `
            }

            console.log(rateConvertted);
            this.rateInput.value = rateConvertted;
            return rateConvertted;
        };

          
          
        

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
            this.puMinput.value = '';
            this.puDinput.value = '';
            this.puAinput.value = '';
            this.delMinput.value = '';
            this.delDinput.value = '';
            this.delAinput.value = '';
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
            this.puMinput.focus()
        }
}

const app = new App();