'use strict'

function uploadToCloudinary(img) {
    function onSuccess(res) {
        console.log('uploadedImg', res)
        return res.url
    }
    return doUploadToCloudinary(img, onSuccess)
}

function doUploadToCloudinary(img, onSuccess) {
    const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/barpel/image/upload'
    const UPLOAD_PRESET = 'gigitUploads'
    var formData = new FormData()
    formData.append('file', img)
    formData.append('upload_preset', UPLOAD_PRESET)
    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => {
            return res.json()
        })
        .then(onSuccess)
        .catch(err => console.error(err))
}

export default {
    uploadToCloudinary,
}