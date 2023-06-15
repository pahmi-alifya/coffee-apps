import {Color, Spacing} from '@atoms';
import {StyleSheet} from 'react-native';

const ModalStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  column: {
    width: '100%',
    flexDirection: 'column',
    paddingTop: Spacing.Tiny,
    borderTopLeftRadius: Spacing.Small,
    borderTopRightRadius: Spacing.Small,
    backgroundColor: Color('neutral', '01'),
  },
  header: {
    width: '100%',
    flexWrap: 'wrap',
    paddingVertical: Spacing.Small,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.Standard,
    borderBottomWidth: 4,
    borderBottomColor: Color('neutral', '02'),
  },
  close: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color('neutral', '02'),
  },
  title: {
    flex: 1,
  },
  strip: {
    width: 40,
    height: 4,
    alignSelf: 'center',
    borderRadius: 2,
    backgroundColor: Color('neutral', '04'),
  },
  marginLeft: {
    marginLeft: Spacing.Standard,
  },
});

export default ModalStyle;
