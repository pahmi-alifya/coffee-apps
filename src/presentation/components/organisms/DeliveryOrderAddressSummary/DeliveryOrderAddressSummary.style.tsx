import {Spacing, Theme} from '@atoms';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  deliveryIconContainer: {
    backgroundColor: Theme.Red201,
    borderRadius: 16,
    width: 32,
    height: 32,
  },
  outletButton: {
    marginTop: Spacing.Tiny,
    marginBottom: Spacing.High,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.Neutral04,
    paddingHorizontal: Spacing.Standard,
    paddingVertical: Spacing.Tiny,
  },
  outletLogo: {
    marginRight: Spacing.Tiny,
  },
  noteLogo: {
    marginRight: Spacing.Small,
  },
  editNoteLogo: {
    marginRight: Spacing.Small,
  },
  courierButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courierName: {
    flexGrow: 1,
  },
  courierChoiceLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  courierLogo: {
    marginRight: Spacing.Small,
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default styles;
