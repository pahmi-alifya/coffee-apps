import {
  IllustrationReferral,
  SvgBackCircle,
  SvgCopy,
  SvgReferralBanner,
} from '@assets';
import {
  BorderlessButton,
  Box,
  Column,
  IconButton,
  Image,
  ModalBottomSheet,
  RectButton,
  Row,
  Spacer,
  Spacing,
  Text,
  TextButton,
  Theme,
} from '@atoms';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {ReferralType} from '@models';
import {StackParamList} from '@navigation/StackNavigation';
import {ContainerWrapper} from '@organisms';
import Clipboard from '@react-native-clipboard/clipboard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {laggy, useQuery} from '@swr';
import {memberships} from '@url';
import {shareReferralCode} from '@utils';
import React, {useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, useWindowDimensions} from 'react-native';
import Share from 'react-native-share';

interface Props extends NativeStackScreenProps<StackParamList, 'Referral'> {}

const ILLUSTRATION_GAP = 16;
const ILLUSTRATION_HEIGHT_RATIO = 0.96;
const BANNER_GAP = Spacing.High * 2;
const BANNER_HEIGHT_RATIO = 0.13;

const Referral: React.FC<Props> = ({navigation}) => {
  const {width: screenWidth} = useWindowDimensions();
  const {t} = useTranslation();
  const illustrationWidth = screenWidth - ILLUSTRATION_GAP;
  const illustrationHeight = illustrationWidth * ILLUSTRATION_HEIGHT_RATIO;
  const bannerHeight = (screenWidth - BANNER_GAP) * BANNER_HEIGHT_RATIO;
  const howToModalRef = useRef<BottomSheetModal>(null);

  const {data, isLoading} = useQuery<ReferralType>(memberships('referral'), {
    use: [laggy],
    immutable: true,
  });

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleCopyToClipboard = useCallback(() => {
    if (data) {
      Clipboard.setString(data.referral_code);
    }
  }, [data]);

  const handleShare = useCallback(() => {
    if (data) {
      Share.open({
        message: shareReferralCode(data.referral_code),
      });
    }
  }, [data]);

  const handleOpenMyReferral = useCallback(
    () => navigation.navigate('MyReferral'),
    [navigation],
  );

  return (
    <ContainerWrapper
      backgroundColor={Theme.Red206}
      withSafeArea="topOnly"
      statusBarProps={{
        barStyle: 'light-content',
        backgroundColor: Theme.Red206,
      }}
      navbarProps={{
        items: [
          <BorderlessButton size={24} onPress={handleBack}>
            <SvgBackCircle width={24} height={24} />
          </BorderlessButton>,
          <Text type="b1" weight="medium" color={Theme.Neutral01}>
            {t('referral.referral')}
          </Text>,
          <TextButton
            textProps={{
              type: 'l1',
              text: t('referral.yourReferral'),
              color: Theme.Neutral01,
            }}
            height={24}
            borderWidth={1}
            borderColor={Theme.Neutral01}
            borderRadius={32}
            padding={{h: Spacing.Tiny}}
            onPress={handleOpenMyReferral}
          />,
          <IconButton
            onPress={() => howToModalRef.current?.present()}
            size={28}
            borderRadius={14}
            iconProps={{name: 'Info', size: 28, color: Theme.Neutral01}}
          />,
        ],
      }}>
      <Column alignment="center" arrangement="center" padding={{b: 21}}>
        <Image
          source={IllustrationReferral}
          resizeMode="contain"
          style={{width: illustrationWidth, height: illustrationHeight}}
        />
      </Column>

      <Column
        contentStyle="fitContent"
        backgroundColor={Theme.Neutral01o30}
        borderRadius={{tl: Spacing.High, tr: Spacing.High}}
        padding={{h: Spacing.High, b: Spacing.High}}
        withSafeArea="bottomOnly">
        <Column
          margin={{t: -21}}
          contentStyle="fitContent"
          height={bannerHeight}
          alignment="center"
          arrangement="center">
          <Box>
            <SvgReferralBanner width="100%" />
          </Box>
          <Text
            type="b2"
            weight="bold"
            text={t('referral.freeCoffee')}
            color={Theme.Red206}
          />
        </Column>

        <Spacer length={Spacing.Standard} />

        <Text type="l1" weight="regular" color={Theme.Neutral01} align="center">
          {t('referral.get')}{' '}
          <Text weight="bold" inheritFromParent={{type: true, color: true}}>
            {t('referral.buy1Get1')}
          </Text>{' '}
          {t('referral.eachTimeInviting')}{' '}
          <Text weight="bold" inheritFromParent={{type: true, color: true}}>
            {t('referral.jiwa+')}
          </Text>
        </Text>

        <Spacer length={Spacing.High} />

        <Text
          type="s3"
          weight="bold"
          color={Theme.Neutral01}
          text={t('referral.shareCodeBelow')}
          align="center"
        />

        <Spacer length={Spacing.Small} />

        {isLoading ? (
          <ActivityIndicator color={Theme.Neutral01} />
        ) : (
          <RectButton
            height={64}
            borderRadius={32}
            alignSelf="center"
            backgroundColor={Theme.Neutral01}
            padding={{h: Spacing.High}}
            onPress={handleCopyToClipboard}>
            <Text type="s3" weight="medium" color={Theme.Neutral10}>
              {data?.referral_code}
            </Text>
            <Spacer length={16} horizontal />
            <BorderlessButton>
              <SvgCopy width={40} height={40} />
            </BorderlessButton>
          </RectButton>
        )}

        <Spacer length={Spacing.Large} />

        <TextButton
          height={56}
          borderRadius={32}
          borderWidth={1}
          borderColor={Theme.Neutral01}
          textProps={{
            type: 'b1',
            color: Theme.Neutral01,
            text: t('referral.share'),
          }}
          onPress={handleShare}
        />
      </Column>

      <ModalBottomSheet ref={howToModalRef} snapPoints={[272]}>
        <Column
          padding={{h: Spacing.High}}
          borderRadius={{tl: Spacing.High, tr: Spacing.High}}>
          <Row>
            <Column>
              <Text type="b1">{t('referral.bottomSheet.howToRefer')}</Text>
            </Column>
            <IconButton
              size={24}
              backgroundColor={Theme.Neutral02}
              onPress={() => howToModalRef.current?.dismiss()}
              iconProps={{name: 'Close'}}
            />
          </Row>

          <Spacer length={20} />

          {[
            {
              title: t('referral.bottomSheet.inviteYourFriend'),
              description: t('referral.bottomSheet.shareYourUniqueLink'),
            },
            {
              title: t('referral.bottomSheet.letYourFriendsKnow'),
              description: t('referral.bottomSheet.uponLogin'),
            },
            {
              title: t('referral.bottomSheet.enjoy'),
              description: t('referral.bottomSheet.dontForget'),
            },
          ].map((item, index) => (
            <Column key={item.title} contentStyle="fitContent">
              {index > 0 && <Spacer length={14} />}

              <HoToRefer
                no={`${index + 1}`}
                title={item.title}
                description={item.description}
              />
            </Column>
          ))}
        </Column>
      </ModalBottomSheet>
    </ContainerWrapper>
  );
};

interface HowToReferProps {
  no: string;
  title: string;
  description: string;
}

const HoToRefer: React.FC<HowToReferProps> = ({no, title, description}) => {
  return (
    <Row alignment="start">
      <Column
        alignment="center"
        arrangement="center"
        width={22}
        height={22}
        borderRadius={21}
        backgroundColor={Theme.Red206}>
        <Text type="l1" color={Theme.Neutral01} text={no} />
      </Column>
      <Spacer length={8} horizontal />
      <Column>
        <Text type="l1" color={Theme.Neutral10} text={title} />
        <Spacer length={4} />
        <Text type="l2" color={Theme.Neutral10} text={description} />
      </Column>
    </Row>
  );
};

export default Referral;
