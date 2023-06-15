import React, {ReactNode, useCallback, useRef} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';

import {
  Column,
  Icon,
  IconButton,
  Layout,
  Row,
  Text,
  TextButton,
  Theme,
} from '@atoms';
import {primaryColor} from '@atoms/Color';
import {useSessionStorage} from '@hooks/useStorage';
import {ResponseDto} from '@utils';
import {ProfileType} from '@models';
import {user} from '@url';
import {ContainerWrapper} from '@organisms';
import {laggy, useQuery, useRequest} from '@swr';

import ProfileStyle from './Profile.style';
import {SvgDeleteAccount} from '@assets';

interface Props {}

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const {mutate} = useRequest(user(`auth/customer/update-info`), {
    method: 'delete',
  });

  const [authToken, setAuthToken] = useSessionStorage();

  const profile = useQuery<ResponseDto<ProfileType>>(user('auth/profile'), {
    use: [laggy],
  });

  const handleDeleteData = useCallback(
    () => () => {
      try {
        mutate(null, {
          onSuccess() {
            setAuthToken(undefined);
            navigation.navigate('Home');
          },
        });
      } catch (error) {
        Toast.showWithGravity(t('auth.somethingWrong'), Toast.LONG, Toast.TOP);
      }
    },
    [mutate, navigation, setAuthToken, t],
  );

  const handleCloseDrawer = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleShowDrawer = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const userData = [
    {
      label: t('profile.detailProfile.yourName'),
      value: profile.data?.data.name,
    },
    {
      label: t('profile.detailProfile.gender'),
      value: `auth.${profile.data?.data.gender}`,
    },
    {
      label: t('profile.detailProfile.dob'),
      value: profile.data?.data.birth_date,
    },
    {
      label: t('profile.detailProfile.emailAddress'),
      value: profile.data?.data.email,
    },
    {
      label: t('profile.detailProfile.phoneNumber'),
      value: profile.data?.data.phone,
    },
    {
      label: t('profile.detailProfile.citizenship'),
      value: profile.data?.data.citizenship,
    },
    {
      label: t('profile.detailProfile.profession'),
      value: profile.data?.data.occupation,
    },
    {label: t('profile.detailProfile.pin'), value: '*****'},
    {
      label: t('profile.detailProfile.signUpRefferalCode'),
      value: profile.data?.data.referral_code,
    },
  ];

  const renderPinField = (length?: number) => {
    if (!length) return;

    const field: ReactNode[] = [];
    for (let i = 0; i < length; i++)
      field.push(<View key={i} style={ProfileStyle.pinElement} />);

    return <Row>{field}</Row>;
  };

  return (
    <ContainerWrapper
      contentType="scrollable"
      withSafeArea="topOnly"
      style={ProfileStyle.container}>
      <Layout style={ProfileStyle.header}>
        <Text text={t('profile.detailProfile.seeProfile')} weight="bold" />
        <IconButton
          onPress={() => navigation.goBack()}
          size={28}
          borderRadius={14}
          backgroundColor={Theme.Neutral03}
          iconProps={{name: 'Close', size: 28, color: Theme.Neutral09}}
        />
      </Layout>
      <Column style={ProfileStyle.avatar} alignment="center">
        <Icon name="User-1" size={40} />
      </Column>
      {userData.map((item, index) => (
        <Layout key={index} style={ProfileStyle.field}>
          <Text text={item.label} type="l1" />
          {item.label === t('profile.detailProfile.pin') ? (
            renderPinField(
              item?.value ? item.value.toString().length : undefined,
            )
          ) : (
            <Text text={item.value?.toString() || undefined} type="b1" />
          )}
        </Layout>
      ))}
      <Layout style={ProfileStyle.buttonContainer}>
        <TextButton
          height={50}
          width={160}
          borderRadius={32}
          borderWidth={2}
          borderColor={Theme.Neutral08}
          onPress={handleShowDrawer}
          disabled={profile.isLoading}
          textProps={{
            type: 'b1',
            color: Theme.Neutral10,
            text: t('profile.detailProfile.deleteAccount'),
          }}
        />
        <TextButton
          height={50}
          width={160}
          borderRadius={32}
          disabled={profile.isLoading}
          backgroundColor={primaryColor}
          textProps={{
            type: 'b1',
            color: Theme.Neutral01,
            text: t('profile.detailProfile.change'),
          }}
        />
      </Layout>
      <BottomSheetModal ref={bottomSheetRef} snapPoints={[430]}>
        <BottomSheetScrollView>
          <SvgDeleteAccount width="100%" />
          <Layout style={ProfileStyle.text}>
            <Column alignment="center">
              <Text
                text={t('profile.detailProfile.deleteTitle')}
                type="b1"
                weight="bold"
              />
              <Text
                text={t('profile.detailProfile.deleteDescription')}
                align="center"
                padding={20}
                type="b2"
              />
            </Column>
          </Layout>
          <Layout style={ProfileStyle.buttonBottomSheetContainer}>
            <TextButton
              height={50}
              width={160}
              borderRadius={32}
              borderWidth={2}
              borderColor={Theme.Neutral08}
              onPress={handleCloseDrawer}
              textProps={{
                type: 'b1',
                color: Theme.Neutral10,
                text: t('profile.detailProfile.cancel'),
              }}
            />
            <TextButton
              height={50}
              width={160}
              borderRadius={32}
              backgroundColor={Theme.Red206}
              onPress={handleDeleteData}
              textProps={{
                type: 'b1',
                color: Theme.Neutral01,
                text: t('profile.detailProfile.delete'),
              }}
            />
          </Layout>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </ContainerWrapper>
  );
};

export default ProfileScreen;
