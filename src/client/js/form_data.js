const form_data = {
    from: {
        _id:"from-city",
        get id(){
            return this._id;
        },
        _value: "",
        set value(newValue){
            this._value = newValue;
        },
        get value(){
            return this._value;
        },
    },

    to: {
        _id:"to-city",
        get id(){
            return this._id;
        },
        _value: "",
        set value(newValue){
            this._value = newValue;
        },
        get value(){
            return this._value;
        },
    },
    
    departing: {
        _id:"departing",
        get id(){
            return this._id;
        },
        _value: "",
        set value(newValue){
            this._value = newValue;
        },
        get value(){
            return this._value;
        },
    },
    return: {
        _id:"return",
        get id(){
            return this._id;
        },
        _value: "",
        set value(newValue){
            this._value = newValue;
        },
        get value(){
            return this._value;
        },
    }

};  

function return_form_data () {
    return form_data;
}



export { return_form_data };