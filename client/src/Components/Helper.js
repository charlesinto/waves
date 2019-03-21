

class Helper {

    static update(element, formdata, formName){
        const newFormData = {
            ...formdata
        }
        const newElementDetails ={
            ...newFormData[element.id]
        }
        newElementDetails.value = element.event.target.value;
        if(element.blur){
            let validData = this.validate(newElementDetails, formdata);
            newElementDetails.valid = validData[0];
            newElementDetails.validationMessage = validData[1];
        }

        newElementDetails.touched = element.blur;

        newFormData[element.id] = newElementDetails;
        return newFormData;
        
    }
    static validate(elementData, formdata=[]){
        let error = [true, ''];
        if(elementData.validation.email){
            const valid = elementData.value.trim() === '';
             error = valid ? [false, 'This field is required'] : 
            ( (/\S+@\S+\.\S+/.test(elementData.value.trim())) ? error : [false, 'Must be a valid email']);
           
        }else{
           return elementData.value ? error : [false, 'This is Required']
        }
        return error; 
    }

    static validateForm(form, type){
        let objectToSubmit = {};
        let formIsValid = null;;
        for(let key in form){
            objectToSubmit[key] = form[key].value;
            if(formIsValid === null){
                formIsValid = form[key].valid;
            }
            else if( formIsValid){
                formIsValid = form[key].valid
            }
            
        }
        return { isValid: formIsValid, record: objectToSubmit }
    }
     
}


export default Helper;