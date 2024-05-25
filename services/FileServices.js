import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const downloadFile = async (token,filename,) => {
    const fileUri = FileSystem.documentDirectory + filename;
    console.log('Downloading to: ', fileUri);
  
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };
  
    // Download file to local
    const downloadRes = await FileSystem.downloadAsync(`http://192.168.1.5:8082/api/file/download`, fileUri, options);
  
    if (downloadRes.status !== 200) {
      console.error('Failed to download file: ', downloadRes.status);
      return;
    }
  
    console.log('Download finished: ', downloadRes.uri);
    // Check if the file exists
    const fileInfo = await FileSystem.getInfoAsync(downloadRes.uri);
    const fileContent = await FileSystem.readAsStringAsync(downloadRes.uri);
    console.log('File content: ', fileContent);
    if (fileInfo.exists) {
    console.log('File has been downloaded successfully');
    } else {
    console.log('File does not exist');
    }
  
    // Check if sharing is available
    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (!isSharingAvailable) {
      console.log('Sharing is not available on this device');
      return;
    }
  
    // Share the file
    await Sharing.shareAsync(downloadRes.uri);
  };