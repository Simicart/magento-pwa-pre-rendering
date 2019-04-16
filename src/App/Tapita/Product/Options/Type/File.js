import React from 'react';
import Abstract from './Abstract';
import Identify from '../../../../../Helper/Identify';
const $ = window.$;

class File extends Abstract {

    constructor(props){
        super(props);
        //get base url
        this.config = window.SMCONFIGS;
        this.merchantConfig = Identify.getMerchantConfig();
        this.baseUrl = this.SMCONFIGS.merchant_url;
        if (this.merchantConfig !== null) {
            if (parseInt(this.merchantConfig.storeview.base.use_store, 10) === 1) {
                this.baseUrl = this.merchantConfig.storeview.base.base_url || this.config.merchant_url;
            }
        }
        this.baseUrl += this.config.api_path;
    }

    render(){
        const notes = []
        const ObjOptions = this.props.data
        if (!ObjOptions.input_name)
            return ''

        if (ObjOptions.file_extension)
            notes.push(
                <p className="note" key="file_extension">
                    {Identify.__('Compatible file extensions to upload:')} {ObjOptions.file_extension}
                </p>
            )
        
        if (ObjOptions.image_size_x)
            notes.push(
                <p className="note" key="image_size_x">
                    {Identify.__(`Maximum image width: %@px`).replace('%@', ObjOptions.image_size_x)}
                </p>
            )
        
        if (ObjOptions.image_size_y)
            notes.push(
                <p className="note" key="image_size_y">
                    {Identify.__(`Maximum image height: %@px`).replace('%@', ObjOptions.image_size_y)}
                </p>
            )
            
        return (
            <div>
                <input name={ObjOptions.input_name} 
                        id={this.props.id} 
                        parent={this} 
                        type="file"
                        onChange={() => this.selectedFile(this.props.id)}
                        style={{marginBottom: 10}}
                        />
                {notes}
            </div>
        )
    }


    selectedFile = (id) => {
        const obj = this

        if (document.getElementById(id)) {
            const input = document.getElementById(id)
            const formData = new FormData();
            formData.append('file', input.files[0]);
            showFogLoading();
            $.ajax({
                url: `${this.baseUrl}uploadfiles`,
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
            }).done(function(result) {
                hideFogLoading()
                if (result && result.uploadfile) {
                    obj.updateSelected(id, result.uploadfile)
                } else {
                    obj.deleteSelected(id)
                    Identify.showToastMessage(Identify.__('Request Failed'))
                }
            }).fail(function() {
                hideFogLoading()
                obj.deleteSelected(id)
                Identify.showToastMessage(Identify.__('Request Failed'))
            });
        }
    }
}
export default File;