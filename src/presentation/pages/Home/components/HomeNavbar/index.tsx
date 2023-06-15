import {IconVoucher} from '@assets';
import {
  Column,
  IconButton,
  Image,
  RectButton,
  Spacing,
  Text,
  TextButton,
  Theme,
} from '@atoms';
import {useSessionStorage} from '@hooks/useStorage';
import {useMe} from '@hooks/useUserAccount';
import {useVoucher} from '@hooks/useVoucher';
import {Navbar} from '@molecules';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import HomeNavbarStyle from './HomeNavbar.style';

interface Props {
  onOpenDrawerPress(): void;
  onLoginPress(): void;
  onNotificationPress(): void;
}

const HomeNavbar: React.FC<Props> = ({
  onOpenDrawerPress,
  onLoginPress,
  onNotificationPress,
}) => {
  const {t} = useTranslation();
  const [authToken] = useSessionStorage();
  const {data: me} = useMe();
  const {data: vouchers} = useVoucher();

  const DrawerButtonComponent = useMemo(
    () => (
      <IconButton
        onPress={onOpenDrawerPress}
        size={38}
        borderRadius={0}
        iconProps={{
          color: Theme.Neutral01,
          name: 'Bar',
          size: 38,
        }}
      />
    ),
    [onOpenDrawerPress],
  );

  const LoggedInComponents = useMemo(
    () => [
      <Text
        weight="bold"
        color={Theme.Neutral01}
        text={me ? t('home.greetings', {name: me.data?.name}) : t('loading')}
      />,
      <RectButton
        height={36}
        width={94}
        borderRadius={18}
        padding={{h: Spacing.SuperTiny}}
        backgroundColor={Theme.Neutral01}>
        <Image style={HomeNavbarStyle.iconVoucher} source={IconVoucher} />
        <Column>
          <Text type="l2" weight="bold" text={t('home.voucher')} />
          <Text
            type="l2"
            weight="regular"
            text={String(vouchers?.data?.total_voucher || 0)}
          />
        </Column>
      </RectButton>,
      <IconButton
        size={40}
        onPress={onNotificationPress}
        backgroundColor={Theme.Neutral01}
        iconProps={{
          size: 40,
          color: Theme.Red206,
          name: 'Notifikasi',
        }}
      />,
    ],
    [me, onNotificationPress, t, vouchers?.data?.total_voucher],
  );

  const GuestComponents = useMemo(
    () => [
      <Column arrangement="center">
        <Text
          type="l1"
          color={Theme.Neutral01}
          weight="medium"
          text={t('home.headerTitle')}
        />
        <Text
          type="l2"
          color={Theme.Neutral01}
          weight="medium"
          text={t('home.headerSubtitle')}
        />
      </Column>,
      <TextButton
        padding={{h: Spacing.Tiny}}
        onPress={onLoginPress}
        borderRadius={20}
        height={28}
        backgroundColor={Theme.Neutral01}
        textProps={{
          weight: 'regular',
          color: Theme.Red206,
          type: 'l2',
          text: t('home.loginHere'),
        }}
      />,
    ],
    [onLoginPress, t],
  );

  return (
    <Navbar
      backgroundColor={Theme.Red206}
      height={60}
      items={[
        DrawerButtonComponent,
        ...(authToken ? LoggedInComponents : GuestComponents),
      ]}
    />
  );
};

export default HomeNavbar;
