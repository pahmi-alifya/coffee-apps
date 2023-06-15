/**
 *  Page Register
 *  This code will do Create register pages
 */

// ! Import react module and library first on top of tsx file.
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Platform, Pressable, TextInput} from 'react-native';
import {differenceInCalendarYears, format} from 'date-fns';
import Toast from 'react-native-simple-toast';
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker';
import {useSessionStorage} from '@hooks/useStorage';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Import custom module of components
import {Theme, Icon, Layout, Radio, Text, Spacer, Spacing} from '@atoms';
import {Button} from '@molecules';
import {request} from '@request';
import {user} from '@url';

// Import styling and types of module you created
import RegisterProps from './Register.types';
import RegisterStyle from './Register.style';
import ListPicker from '../../../components/organisms/drawer/ListPicker';
import DrawerPin from '../../../components/organisms/drawer/Pin';
import {ScrollView} from 'react-native-gesture-handler';

/**
 * Init Register pages
 * @param {RegisterProps} props
 * @returns {JSX.Element}
 */
const Register: React.FC = (props: RegisterProps) => {
  const {navigation} = props;
  const {t} = useTranslation();
  const [authToken, setAuthToken] = useSessionStorage();
  const [showModal, setShowModal] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [pinValue, setPinValue] = useState(['']);
  const [userData, setUserData] = useState(['']);
  const [loading, setLoading] = useState(false);
  const bottomSheetCitizenshipRef = useRef<BottomSheet>(null);
  const bottomSheetOccupationRef = useRef<BottomSheet>(null);
  const bottomSheetDraweRef = useRef<BottomSheet>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      birthdate: '',
      gender: '',
      email: '',
      citizenship: '',
      occupation: '',
      codeReferral: '',
    },
  });

  const occupations = [
    {title: t('auth.profesional'), value: 1},
    {title: t('auth.student'), value: 2},
    {title: t('auth.employee'), value: 3},
    {title: t('auth.civil'), value: 4},
    {title: t('auth.housewife'), value: 5},
    {title: t('auth.unemployment'), value: 6},
  ];

  const onSubmit = (data: any) => {
    setUserData(data);
    bottomSheetDraweRef.current?.snapToIndex(snapPoints.length - 2);
  };

  const snapPoints = useMemo(() => ['1', '50%', '70%', '90%'], []);

  const handleShowCitizen = () => {
    bottomSheetCitizenshipRef.current?.snapToIndex(snapPoints.length - 2);
  };

  const handleShowOccupation = () => {
    bottomSheetOccupationRef.current?.snapToIndex(snapPoints.length - 2);
  };

  const handleShowDate = (value: boolean) => {
    setShowModal(value);
  };

  const handleChangeDate = useCallback(
    (date: Date) => {
      handleShowDate(false);
      const age = differenceInCalendarYears(new Date(), new Date(date));

      if (age < 12) {
        return Toast.showWithGravity(
          t('auth.ageUnder12'),
          Toast.LONG,
          Toast.TOP,
        );
      }

      if (age > 100) {
        return Toast.showWithGravity(
          t('auth.ageOver100'),
          Toast.LONG,
          Toast.TOP,
        );
      }

      setValue('birthdate', format(date, 'yyyy-MM-dd').toString());
    },
    [setValue, t],
  );

  const handleChangeText = useCallback(
    (index: number, value: string) => {
      if (index === -1) return setPinValue(['', '']);

      const newValue = [...pinValue];
      newValue[index] = value;
      setPinValue(newValue);
    },
    [pinValue],
  );

  const handleSubmitPin = async () => {
    if (pinValue[0] !== pinValue[1])
      return Toast.showWithGravity(
        t('auth.incorrectPin'),
        Toast.LONG,
        Toast.TOP,
      );

    setLoading(true);
    const data = {
      pin: pinValue[0],
      verif_pin: pinValue[1],
      birth_date: userData?.birthdate,
      gender: userData?.gender,
      name: userData?.name,
      occupation: userData?.occupation,
      citizenship: userData?.citizenship,
      referral: userData?.codeReferral,
    };
    const token = authToken;

    try {
      //TODO: need to change to swr
      const result = await request(user(`auth/customer/update-info`), {
        method: 'patch',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      });

      if (result.statusCode === 200 || result.statusCode === 201) {
        setLoading(false);
        navigation.navigate('Home');
      }
    } catch (error) {
      setLoading(false);
      Toast.showWithGravity(t('auth.somethingWrong'), Toast.LONG, Toast.TOP);
    }
  };

  return (
    <Layout type="safeareaview" style={RegisterStyle.container}>
      <KeyboardAwareScrollView
        style={RegisterStyle.keyboardWareScrollViewWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            margin={{t: Platform.OS === 'android' ? 10 : 0}}
            type="s1"
            weight="bold"
            text={t('auth.weWantYouKnowMore')}
          />
          <Text
            type="l1"
            color={Theme.Neutral06}
            weight="light"
            margin={{t: 10}}
            text={t('auth.formInfo')}
          />
          <Controller
            control={control}
            rules={{
              required: t('auth.required'),
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: t('auth.noSpecialCharacter'),
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Layout
                style={[
                  RegisterStyle.textInputWrapperStyle,
                  {
                    borderColor: errors.name ? Theme.Red205 : Theme.Neutral04,
                  },
                ]}>
                <TextInput
                  placeholder={t('auth.yourName')}
                  keyboardType="default"
                  onChangeText={onChange}
                  style={RegisterStyle.textInputStyle}
                  placeholderTextColor={Theme.Neutral08}
                />
              </Layout>
            )}
            name="name"
          />
          {errors.name && (
            <>
              <Spacer length={Spacing.Tiny} />
              <Text
                type="l1"
                color={Theme.Red206}
                weight="light"
                text={errors.name.message || ''}
              />
            </>
          )}

          <Spacer length={Spacing.Small} />

          <Text
            type="l1"
            color={Theme.Neutral10}
            weight="light"
            margin={{l: 5}}
            text={t('auth.gender')}
          />

          <Spacer length={Spacing.Tiny} />

          <Layout style={RegisterStyle.radioButtonStyles}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange}}) => (
                <Radio
                  onChange={onChange}
                  isError={!!errors.gender}
                  items={[
                    {label: t('auth.male'), value: 'male'},
                    {label: t('auth.female'), value: 'female'},
                  ]}
                />
              )}
              name="gender"
            />
          </Layout>
          {errors.gender && (
            <>
              <Spacer length={Spacing.Tiny} />
              <Text
                type="l1"
                color={Theme.Red206}
                weight="light"
                text={t('auth.required')}
              />
            </>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {value}}) => (
              <Layout
                style={[
                  RegisterStyle.textInputWrapperStyle,
                  {
                    borderColor: errors.birthdate
                      ? Theme.Red205
                      : Theme.Neutral04,
                  },
                ]}>
                <Pressable
                  style={RegisterStyle.textInputSelectStyle}
                  onPress={() => handleShowDate(true)}>
                  <Text
                    type="l1"
                    color={Theme.Neutral10}
                    weight="light"
                    text={value || t('auth.birthDate')}
                  />
                </Pressable>
                <Icon
                  style={{marginHorizontal: 3}}
                  name="Calendar-1"
                  size={18}
                />
              </Layout>
            )}
            name="birthdate"
          />
          {errors.birthdate && (
            <>
              <Spacer length={Spacing.Tiny} />
              <Text
                type="l1"
                color={Theme.Red206}
                weight="light"
                text={t('auth.required')}
              />
            </>
          )}
          <Controller
            control={control}
            rules={{
              required: t('auth.required'),
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: t('auth.invalidEmail'),
              },
            }}
            render={({field: {onChange}}) => (
              <Layout
                style={[
                  RegisterStyle.textInputWrapperStyle,
                  {
                    borderColor: errors.email ? Theme.Red205 : Theme.Neutral04,
                  },
                ]}>
                <TextInput
                  placeholder="Email Address"
                  keyboardType="email-address"
                  style={RegisterStyle.textInputStyle}
                  onChangeText={onChange}
                  placeholderTextColor={Theme.Neutral08}
                />
              </Layout>
            )}
            name="email"
          />
          {errors.email && (
            <>
              <Spacer length={Spacing.Tiny} />
              <Text
                type="l1"
                color={Theme.Red206}
                weight="light"
                text={errors.email.message || ''}
              />
            </>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {value}}) => (
              <Layout
                style={[
                  RegisterStyle.textInputWrapperStyle,
                  {
                    borderColor: errors.citizenship
                      ? Theme.Red205
                      : Theme.Neutral04,
                  },
                ]}>
                <Pressable
                  style={RegisterStyle.textInputSelectStyle}
                  onPress={handleShowCitizen}>
                  <Text
                    type="l1"
                    color={Theme.Neutral10}
                    weight="light"
                    text={value || t('auth.citizen')}
                  />
                </Pressable>
                <Icon
                  style={{marginHorizontal: 3}}
                  name="Chevron-Down"
                  size={18}
                />
              </Layout>
            )}
            name="citizenship"
          />
          {errors.citizenship && (
            <>
              <Spacer length={Spacing.Tiny} />
              <Text
                type="l1"
                color={Theme.Red206}
                weight="light"
                text={t('auth.required')}
              />
            </>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Layout
                style={[
                  RegisterStyle.textInputWrapperStyle,
                  {
                    borderColor: errors.occupation
                      ? Theme.Red205
                      : Theme.Neutral04,
                  },
                ]}>
                <Pressable
                  style={RegisterStyle.textInputSelectStyle}
                  onPress={handleShowOccupation}>
                  <Text
                    type="l1"
                    color={Theme.Neutral10}
                    weight="light"
                    text={
                      occupations.find((item) => item.value)?.title ||
                      t('auth.occupation')
                    }
                  />
                </Pressable>
                <Icon
                  style={{marginHorizontal: 3}}
                  name="Chevron-Down"
                  size={18}
                />
              </Layout>
            )}
            name="occupation"
          />
          {errors.occupation && (
            <>
              <Spacer length={Spacing.Tiny} />
              <Text
                type="l1"
                color={Theme.Red206}
                weight="light"
                text={t('auth.required')}
              />
            </>
          )}

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Layout style={RegisterStyle.textInputWrapperStyle}>
                <TextInput
                  placeholder={t('auth.referralCode')}
                  keyboardType="default"
                  style={RegisterStyle.textInputStyle}
                  placeholderTextColor={Theme.Neutral08}
                />
              </Layout>
            )}
            name="codeReferral"
          />
        </ScrollView>
      </KeyboardAwareScrollView>
      <Button
        onPress={handleSubmit(onSubmit)}
        text={t('auth.continue')}
        style={RegisterStyle.button}
        isBlock
        disabled={loading}
        isRounded
        textProps={{
          color: Theme.Neutral01,
          weight: 'regular',
          type: 'b1',
        }}
      />

      <DrawerPin
        ref={bottomSheetDraweRef}
        snapPoints={snapPoints}
        value={pinValue}
        handleChangeText={handleChangeText}
        setIsOpen={(val) => setPinModal(val)}
        handleSubmit={() => handleSubmitPin()}
        isOpen={pinModal}
      />

      <DatePicker
        modal
        mode="date"
        open={showModal}
        date={new Date()}
        maximumDate={new Date()}
        onConfirm={handleChangeDate}
        onCancel={() => {
          handleShowDate(false);
        }}
      />

      <ListPicker
        onSelect={(value) => setValue('citizenship', value)}
        title={t('auth.chooseNationality')}
        items={[
          {title: 'Indonesia', value: 'Indonesia'},
          {title: 'Singapore', value: 'Singapore'},
          {title: 'Malaysia', value: 'Malaysia'},
          {title: 'Vietnam', value: 'Vietnam'},
          {title: 'Thailand', value: 'Thailand'},
          {title: 'Other', value: 'Other'},
        ]}
        ref={bottomSheetCitizenshipRef}
        snapPoints={snapPoints}
      />

      <ListPicker
        onSelect={(value) => setValue('occupation', value)}
        title={t('auth.chooseJob')}
        items={occupations}
        ref={bottomSheetOccupationRef}
        snapPoints={snapPoints}
      />
    </Layout>
  );
};

// Export Register pages as default
export default Register;
