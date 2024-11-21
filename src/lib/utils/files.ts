import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { File, Paths, Directory } from "expo-file-system/next";

import { ToastAndroid } from "react-native";

export async function downloadFile(
  id: string,
  url: string,
  sharing = false,
  dimensions?: {
    width: number;
    height: number;
  },
) {
  if (!sharing && !(await requestPermission())) {
    ToastAndroid.show("Permission Denied", ToastAndroid.SHORT);
    return;
  }
  const destination = new Directory(Paths.cache, "giphygifs");
  try {
    !destination.exists && destination.create();
    const file = new File(destination, id + ".gif");
    const output = file.exists ? file : await File.downloadFileAsync(url, file);
    if (!sharing) {
      const asset = await MediaLibrary.createAssetAsync(output.uri);
      await MediaLibrary.createAlbumAsync("gifs", asset, false);
      ToastAndroid.show("Saved Gif to Gallery", ToastAndroid.SHORT);
      return;
    }
    await shareFile(file.uri);
  } catch (e) {
    console.log(e);
  }
}

export async function shareFile(uri: string) {
  await Sharing.shareAsync(uri, {
    mimeType: "image/gif",
  });
}

export async function requestPermission() {
  const permission = await MediaLibrary.getPermissionsAsync();
  if (permission.granted === false) {
    const status = await MediaLibrary.requestPermissionsAsync(true, ["video"]);
    return status.granted;
  }
  return permission.granted;
}
