import {
  downloadFile as downloadFileFS,
  readDir,
  unlink,
  DocumentDirectoryPath,
  DownloadFileOptions,
} from 'react-native-fs';

export const downloadFile = async (param: DownloadFileOptions) => {
  const {fromUrl, toFile} = param;
  try {
    // create a path you want to save
    const pathFile = `${DocumentDirectoryPath}/${toFile}`;
    const res = await downloadFileFS({
      fromUrl,
      toFile: pathFile,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllFile = async () => {
  try {
    // get a list of files and directories in the main bundle
    const res = await readDir(DocumentDirectoryPath);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (file: string) => {
  // create a path you want to delete
  const path = `${DocumentDirectoryPath}/${file}`;
  try {
    return unlink(path);
  } catch (error) {
    throw error;
  }
};
