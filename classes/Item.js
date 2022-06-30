export class Items{
    
    constructor(pu, del, load, origin, destiny, commodity, brokerCompany, brokerName, brokerPhone, phoneExtension, rate, truckNumber, paid, id){
        this.pu = pu;
        this.del = del;
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

