import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { 
  IoCloudUploadOutline,
  IoDocumentOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoEyeOutline
} from 'react-icons/io5';
import { Card, Button, LoadingSpinner } from '../common';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  maxFiles = 5,
  acceptedTypes = ['image/*', 'application/pdf'],
  maxSize = 10 * 1024 * 1024 // 10MB
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    
    // Simulate upload progress
    const newProgress: { [key: string]: number } = {};
    acceptedFiles.forEach(file => {
      newProgress[file.name] = 0;
    });
    setUploadProgress(newProgress);

    // Simulate upload with progress
    for (const file of acceptedFiles) {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: progress
        }));
      }
    }

    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    onFileUpload(acceptedFiles);
    setUploading(false);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles,
    maxSize,
    multiple: maxFiles > 1
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tải lên bằng cấp</h3>
        
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <IoCloudUploadOutline className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          
          {isDragActive ? (
            <p className="text-primary-600 font-medium">Thả file vào đây...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Kéo thả file vào đây hoặc <span className="text-primary-600 font-medium">click để chọn</span>
              </p>
              <p className="text-sm text-gray-500">
                Hỗ trợ: PDF, JPG, PNG (tối đa {formatFileSize(maxSize)})
              </p>
            </div>
          )}
        </div>

        {/* File Rejections */}
        {fileRejections.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-sm font-medium text-red-800 mb-2">Một số file không được chấp nhận:</h4>
            {fileRejections.map(({ file, errors }) => (
              <div key={file.name} className="text-sm text-red-700">
                <span className="font-medium">{file.name}</span>
                <ul className="list-disc list-inside ml-4">
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium text-gray-900">File đã tải lên:</h4>
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <IoDocumentOutline className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {uploading && uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[file.name]}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{uploadProgress[file.name]}%</span>
                    </div>
                  ) : (
                    <>
                      <IoCheckmarkCircleOutline className="w-5 h-5 text-secondary-600" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <IoCloseCircleOutline className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={() => setUploadedFiles([])}>
              Xóa tất cả
            </Button>
            <Button variant="primary" disabled={uploading}>
              {uploading && <LoadingSpinner size="sm" color="white" />}
              Xác thực bằng cấp
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
