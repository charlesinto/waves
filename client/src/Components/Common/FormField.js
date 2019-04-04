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
             case 'select':
             return   formTemplate =(
                <div><select onChange={(event) => change({event, id})} id={id}
                         {...formdata.config} value={formdata.value}
                        onBlur={(event) => change({event, id, blur:true})}
                    >
                        <option value="">Select one</option>
                        {
                            formdata.config.options.map((item, i) => (
                                <option key={i} value={item.key}>{item.value}</option>
                            ))
                        }
            </select> {this.showError()}</div>
            )
            default:
                return formTemplate
        }
    }
    render() {
        const { formdata } = this.props;
        return (
            <div>
            {
                formdata.showLabel ? <div className="label_inputs" style={{marginTop: '10px'
                }}>{formdata.config.label}</div> : null
            }
            {this.renderTemplate()}
            
        </div>
        );
    }
}

export  {FormField};