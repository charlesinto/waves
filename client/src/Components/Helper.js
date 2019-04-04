

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
    static populateDropdown(formdata, values, field){
        const newFormData = {...formdata}
        const newDropdownArray = newFormData[field].config.options;
        values.forEach(item => {
            newDropdownArray.push({key:item._id, value: item.name})
        });
        newFormData[field].config.options = newDropdownArray;
        return newFormData;
    }
    static validate(elementData, formdata=[]){
        let error = [true, ''];
        if(elementData.validation.email){
            const valid = elementData.value.trim() === '';
             error = valid ? [false, 'This field is required'] : 
            ( (/\S+@\S+\.\S+/.test(elementData.value.trim())) ? error : [false, 'Must be a valid email']);
           
        }
        else if(elementData.validation.confirm === 'password'){
            const valid = elementData.value.trim() === '';
             error = valid ? [false, 'This field is required'] : 
            ( elementData.value === formdata['password'].value ? error : [false, 'passwords do not match']);
        }
        else{
           return elementData.value ? error : [false, 'This is Required']
        }
        return error; 
    }

    static validateForm(form, type){
        let objectToSubmit = {};
        let formIsValid = null;;
        for(let key in form){
            if(key !== 'confirmPassword'){
                objectToSubmit[key] = form[key].value;
                if(formIsValid === null){
                    formIsValid = form[key].valid;
                }
                else if( formIsValid){
                    formIsValid = form[key].valid
                }
            }
        }
        return { isValid: formIsValid, record: objectToSubmit }
    }
     static resetForm(formdata){
         for(let key in formdata){
             if(key === 'images'){
                 formdata[key].value = [];
                 formdata[key].valid = false;
                 formdata[key].validationMessage = '';
             }else{
                formdata[key].value = '';
                formdata[key].valid = false;
                formdata[key].touched = false;
                formdata[key].validationMessage = '';
             }
            
         }
         return {...formdata};
     }
}


export default Helper;