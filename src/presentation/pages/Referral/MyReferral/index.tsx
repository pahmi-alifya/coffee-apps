import {BgReferral} from '@assets/images/backgrounds';
import {
  BorderlessButton,
  Box,
  Column,
  Icon,
  Row,
  Separator,
  Spacer,
  Spacing,
  Text,
  TextButton,
  Theme,
} from '@atoms';
import {ReferralListItemType, ReferralType} from '@models';
import {Navbar} from '@molecules';
import {StackParamList} from '@navigation/StackNavigation';
import {ContainerWrapper} from '@organisms';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {laggy, useQuery} from '@swr';
import {memberships} from '@url';
import {ResponseDto} from '@utils/response';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ListRenderItem, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

interface Props extends NativeStackScreenProps<StackParamList, 'MyReferral'> {}

const BG_HEIGHT_RATIO = 1.1;

const MyReferral: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {width: screenWidth} = useWindowDimensions();
  const bgHeight = screenWidth * BG_HEIGHT_RATIO;

  const {data: referral} = useQuery<ReferralType>(memberships('referral'), {
    use: [laggy],
    immutable: true,
  });
  const {data: referralList, isLoading: referralListLoading} = useQuery<
    ResponseDto<ReferralListItemType[]>
  >(memberships('referral/list'), {use: [laggy]});

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const renderItem: ListRenderItem<ReferralListItemType> = useCallback(
    ({item}) => (
      <Row height={46}>
        <Column>
          <Text type="b2" text={item.name} color={Theme.Neutral10} />
        </Column>
        <Spacer length={8} horizontal />
        <TextButton
          textProps={{
            type: 'l2',
            text: item.purchased
              ? t('referralList.active')
              : t('referralList.inactive'),
            color: item.purchased ? Theme.Green07 : Theme.Neutral05,
          }}
          padding={{h: Spacing.Standard}}
          borderRadius={Spacing.Extra}
          backgroundColor={item.purchased ? Theme.Green02 : Theme.Neutral04}
          height={22}
        />
      </Row>
    ),
    [t],
  );

  return (
    <ContainerWrapper statusBarProps={{barStyle: 'light-content'}}>
      <Column>
        <FastImage
          source={BgReferral}
          style={{width: screenWidth, height: bgHeight}}
          resizeMode="cover"
        />

        <Box withSafeArea="topOnly">
          <Navbar
            items={[
              <BorderlessButton
                size={24}
                backgroundColor={Theme.Neutral01}
                onPress={handleBack}>
                <Icon name="Arrow-Left" color={Theme.Red206} />
              </BorderlessButton>,
              <Text type="b1" weight="medium" color={Theme.Neutral01}>
                {t('referral.referral')}
              </Text>,
            ]}
          />
        </Box>
      </Column>

      <Column
        borderRadius={{tl: Spacing.High, tr: Spacing.High}}
        backgroundColor={Theme.Red206}
        margin={{t: -Spacing.High}}>
        <Column
          contentStyle="fitContent"
          padding={{
            t: Spacing.High,
            h: Spacing.High,
            b: Spacing.Extra,
          }}>
          <Text type="l1" color={Theme.Neutral01}>
            {t('referralList.invitedFriend')}
          </Text>
          <Text type="b1" color={Theme.Neutral01}>
            {referral?.total_referred_user} {t('referralList.friend')}
          </Text>
        </Column>
        <Column
          borderRadius={{tl: Spacing.High, tr: Spacing.High}}
          backgroundColor={Theme.Neutral01}>
          <SkeletonContent
            isLoading={referralListLoading}
            containerStyle={{flex: 1}}
            layout={[
              {
                paddingTop: Spacing.Large,
                paddingHorizontal: Spacing.High,
                children: [
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    children: [
                      {width: 150, height: 20},
                      {width: 70, height: 20},
                    ],
                  },
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    children: [
                      {width: 200, height: 20},
                      {width: 70, height: 20},
                    ],
                  },
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    children: [
                      {width: 120, height: 20},
                      {width: 70, height: 20},
                    ],
                  },
                ],
              },
            ]}>
            <FlatList
              data={referralList?.data || []}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{padding: Spacing.High}}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <Separator />}
            />
          </SkeletonContent>
        </Column>
      </Column>
    </ContainerWrapper>
  );
};

export default MyReferral;
