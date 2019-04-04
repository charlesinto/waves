import cloudinary from "cloudinary";

class Helper {
    static login(req, res){

    }
    static async uploadHandler(files){
        const numberOfUploads = [];
        for(let key in files){
            numberOfUploads.push(key)
        }
        const uploadedFiles = [];
        return new Promise((resolve, reject) => {
            for(let key in files){
                 cloudinary.uploader.upload(files[key].path, (result) => {
                    uploadedFiles.push({...result});
                    if(uploadedFiles.length == numberOfUploads.length){
                       return resolve(uploadedFiles)
                    }
                }, {
                    public_id:`${Date.now()}`,
                    resource_type:'auto',
                    folder: "waves/assets/",
                    transformation: [
                        {width: 300, crop: "scale"}]
                })
            }
        })
    }
}

export default Helper;