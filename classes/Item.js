export class Items{
    
    constructor(puM, puD, puA, delM, delD, delA, load, origin, destiny, commodity, brokerCompany, brokerName, brokerPhone, phoneExtension, rate, truckNumber, paid, id){
        this.puM = puM;
        this.puD = puD;
        this.puA = puA;
        this.delM = delM;
        this.delD = delD;
        this.delA = delA;
        this.load = load;
        this.origin = origin;
        this.destiny = destiny;
        this.commodity = commodity;
        this.brokerCompany = brokerCompany;
        this.brokerName = brokerName;
        this.brokerPhone = brokerPhone;
        this.phoneExtension = phoneExtension;
        this.rate = rate;
        this.truckNumber = truckNumber;
        this.paid = paid;
        this.id = `${this.origin.slice(0,2)}_${Date.now()}`;
    }
}

