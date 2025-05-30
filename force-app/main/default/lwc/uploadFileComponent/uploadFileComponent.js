import { LightningElement, track } from 'lwc';

export default class FileUploadComponent extends LightningElement {
    @track fileData;

    handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            // if(file.size >= 4 * 1024 * 1024){
            //     // Display an error message if the file size exceeds 4MB
            //     this.fileData = {
            //         error: 'File size exceeds 4MB. Please upload a smaller file.'
            //     };
            //     return;
            // }
            this.fileData = {
                fileName: file.name,
                fileSize: this.formatFileSize(file.size)
            };
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
