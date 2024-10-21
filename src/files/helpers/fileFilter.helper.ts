export const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    callBack: Function,
  ) => {
    if (!file) return callBack(new Error('File is empty'), false);
  
    const fileExtension = file.mimetype.split('/').pop();
    const validExtensions = ['jpeg', 'jpg', 'png', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
      return callBack(new Error('File type is not supported'), false);
    }
  
    callBack(null, true);
  };
  