import {IconPlusPoint, IconRewards} from '@assets';
import {
  Column,
  Icon,
  Image,
  RectButton,
  Row,
  Shadow,
  Spacing,
  Text,
  TextButton,
  Theme,
} from '@atoms';
import {useGeocodeMap, useGeolocation} from '@hooks/useGeolocation';
import {useMembershipDetail} from '@hooks/useMembership';
import {useSessionStorage} from '@hooks/useStorage';
import ProgressBar from '@molecules/ProgressBar';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import UserInformationStyle from './UserInformation.style';

const DEFAULT_XP = '0/1000 XP';

interface UserInformationProps {
  onLocationPress: () => void;
}

const UserInformation: React.FC<UserInformationProps> = ({onLocationPress}) => {
  const {t} = useTranslation();
  const [authToken] = useSessionStorage();
  const {data: membership} = useMembershipDetail();
  const {latlng} = useGeolocation();
  const {data: geocodeMap} = useGeocodeMap(latlng);
  const location = geocodeMap?.plus_code?.compound_code;

  const person = useMemo(() => {
    if (authToken) {
      return (
        <Row contentStyle="fillContainer">
          <Image
            style={UserInformationStyle.icon}
            source={{
              uri: membership?.data?.membership_icon,
            }}
          />
          <Column>
            <Text
              style={UserInformationStyle.marginRightSuperTiny}
              text={membership?.data?.membership_title}
              weight="bold"
              type="l2"
            />
            <Row>
              <Text
                color={Theme.Neutral05}
                weight="regular"
                type="l2"
                text={
                  membership
                    ? `${membership.data.user_exp}/${membership.data.max_exp} XP`
                    : DEFAULT_XP
                }
              />
              <ProgressBar
                height={4}
                margin={{l: Spacing.Tiny}}
                isRounded
                value={10}
                maxValue={100}
              />
            </Row>
          </Column>
        </Row>
      );
    }

    return (
      <Row contentStyle="fillContainer">
        <Image style={UserInformationStyle.icon} source={IconRewards} />
        <Column>
          <Text
            style={UserInformationStyle.marginRightSuperTiny}
            text="Loyalty Membership"
            weight={'bold'}
            numberOfLines={1}
            type={'l2'}
          />
          <TextButton
            arrangement="leading"
            height={16}
            textProps={{
              weight: 'regular',
              type: 'l2',
              style: UserInformationStyle.underline,
              text: t('userInformation.activate'),
            }}
          />
        </Column>
      </Row>
    );
  }, [authToken, membership, t]);

  return (
    <Column
      contentStyle="fitContent"
      backgroundColor={Theme.Neutral01}
      margin={{t: -52, h: Spacing.High}}
      borderRadius={Spacing.Standard}
      padding={{b: Spacing.Standard}}
      overflow="hidden"
      style={Shadow}>
      <RectButton
        height={40}
        onPress={onLocationPress}
        padding={{h: Spacing.Standard}}>
        <Text
          style={UserInformationStyle.marginRightSuperTiny}
          text={t('userInformation.yourLocation')}
          weight="bold"
          type="l2"
        />
        <Text
          style={UserInformationStyle.expand}
          numberOfLines={1}
          text={location || t('loading')}
          weight="regular"
          type="l2"
        />
        <Icon color={Theme.Red206} name="Chevron-Down" size={18} />
      </RectButton>

      <Row padding={{h: Spacing.Standard}}>
        {person}

        <View style={UserInformationStyle.divider} />

        <Row contentStyle="fillContainer">
          <Image style={UserInformationStyle.icon} source={IconPlusPoint} />
          <Column>
            <Text
              style={UserInformationStyle.marginRightSuperTiny}
              text="Plus Point"
              weight="bold"
              type="l2"
            />
            <Text
              color={Theme.Neutral05}
              weight="regular"
              type="l2"
              text={`${membership?.data?.total_points || 0} ${t(
                'userInformation.points',
              )}`}
            />
          </Column>
        </Row>
      </Row>
    </Column>
  );
};

export default UserInformation;
