import React, { Component } from 'react';

class FormField extends Component {
    showError(){
        const { formdata } = this.props;
        let errorMessage = null;
        if(formdata.validation.required && !formdata.valid){
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }
    renderTemplate(){
        const { formdata, change, id} = this.props;
        let formTemplate = null;
        switch(formdata.element){
            case 'input':
             return   formTemplate =(
                 <div className="formBlock">
                    <input
                        value={formdata.value}
                        onBlur={(event) => change({event, id, blur:true})}
                        onChange={(event) => change({event, id})} 
                        {...formdata.config}
                    />
                    {this.showError()}
                 </div>
             )
            default:
                return formTemplate
        }
    }
    render() {
        
        return (
            <div>
                {this.renderTemplate()}
            </div>
        );
    }
}

export  {FormField};