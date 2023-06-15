import {Column, Spacing, Theme} from '@atoms';
import {SplashScreenType} from '@models';
import Button from '@molecules/Button';
import ProgressBar from '@molecules/ProgressBar';
import ContainerWrapper from '../ContainerWrapper';
import {laggy, useQuery} from '@swr';
import {story} from '@url';
import {deleteFile, downloadFile, getAllFile, ResponseDto} from '@utils';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import Config from 'react-native-config';
import {ReadDirItem} from 'react-native-fs';
import {useMMKVString} from 'react-native-mmkv';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';

const PopUpPromo: React.FC = () => {
  const [duration, setDuration] = useState(1); // defalut max value
  const [progress, setProgress] = useState(0);
  const [queue, setQueue] = useState(0);
  const [data, setData] = useState<SplashScreenType[]>([]);

  useQuery<ResponseDto<SplashScreenType[]>>(story('splash_screen'), {
    use: [laggy],
    onSuccess(res) {
      setData(res?.data);
    },
  });

  const videoStorageEnv = Config.VIDEO_STORAGE;
  const [videosStorage, setVideosStorage] = useMMKVString(videoStorageEnv);

  const videos = useMemo(() => {
    try {
      if (!videosStorage) {
        return [];
      }

      return JSON.parse(videosStorage);
    } catch (e) {
      return [];
    }
  }, [videosStorage]);

  const handleSkip = useCallback(() => {
    setQueue(queue + 1);
    handleResetState();
  }, [queue]);

  const handleProgress = useCallback(
    (val: OnProgressData) => {
      const currentTime = Math.ceil(val.currentTime);
      if (currentTime > duration) {
        handleSkip();
      } else {
        if (currentTime > progress) {
          setProgress(currentTime);
        }
      }
    },
    [duration, handleSkip, progress],
  );

  const handleLoad = useCallback((meta: OnLoadData) => {
    const durationTemp = Math.floor(meta.duration);
    setDuration(durationTemp);
  }, []);

  const handleResetState = () => {
    setDuration(1);
    setProgress(0);
  };

  const storeToStorage = useCallback(
    (dataVideo: ReadDirItem[]) => {
      const arrString = JSON.stringify(
        dataVideo.map((video) => `file://${video.path}`),
      );
      setVideosStorage(arrString);
    },
    [setVideosStorage],
  );

  const removeFile = useCallback(async (files: ReadDirItem[] = []) => {
    await files.forEach(async (file) => {
      await deleteFile(file?.name);
    });
  }, []);

  const saveFile = useCallback(async () => {
    await data.forEach(async (file) => {
      const toFile = `${file.id_jiwa_splash_screen.toString()}.mp4`;
      const param = {
        fromUrl: file.media_url,
        toFile,
      };
      await downloadFile(param);
    });
  }, [data]);

  const getVideos = useCallback(async () => {
    const files: ReadDirItem[] = await getAllFile();
    const regex = new RegExp(
      '.(mp4|wmv|m4v|mov|avi|flv|webm|flac|mka|m4a|aac|ogg|png)$',
    );
    const filterVideos: ReadDirItem[] = files.filter((file) =>
      regex.test(file.name),
    );
    storeToStorage(filterVideos);
    return filterVideos;
  }, [storeToStorage]);

  const checkIsSync = useCallback(async () => {
    const getVideosData = await getVideos();
    let isSync = true;
    if (data.length) {
      let extractVidoesFromLocal: string[] | string = getVideosData
        .map((video) => video.name)
        .sort();
      let extractVideosFromAPI: string[] | string = data
        .map((video) => `${video.id_jiwa_splash_screen.toString()}.mp4`)
        .sort();
      extractVidoesFromLocal = JSON.stringify(extractVidoesFromLocal);
      extractVideosFromAPI = JSON.stringify(extractVideosFromAPI);
      isSync = extractVidoesFromLocal === extractVideosFromAPI;
    }
    return isSync;
  }, [data, getVideos]);

  const syncFiles = useCallback(async () => {
    const isSync = await checkIsSync();
    if (!isSync) {
      const getVideosData = await getVideos();
      await removeFile(getVideosData);
      await saveFile();
    }
  }, [checkIsSync, getVideos, removeFile, saveFile]);

  useEffect(() => {
    syncFiles();
  }, [syncFiles]);

  if (queue >= videos.length - 1 || !videos.length) {
    return null;
  }

  return (
    <ContainerWrapper
      statusBarProps={{
        backgroundColor: Theme.Transparent,
        barStyle: 'light-content',
        translucent: true,
      }}
      style={styles.container}>
      <Video
        source={{uri: videos[queue]}}
        rate={1.0}
        resizeMode="cover"
        onProgress={handleProgress}
        onLoad={handleLoad}
        style={styles.video}
      />
      <Column height={7} withSafeArea>
        <ProgressBar
          height={7}
          color={Theme.Neutral01}
          value={progress}
          maxValue={duration}
        />
      </Column>
      <Button
        variant="tertiary"
        textProps={{
          type: 's2',
          weight: 'bold',
          text: 'Skip',
          color: Theme.Neutral01,
        }}
        onPress={handleSkip}
        style={styles.skip}
      />
    </ContainerWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  video: StyleSheet.absoluteFillObject,
  skip: {
    marginTop: Spacing.Standard,
    marginRight: Spacing.High,
    alignSelf: 'flex-end',
  },
});

export default PopUpPromo;
