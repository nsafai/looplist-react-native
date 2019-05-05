import { StyleSheet } from 'react-native';
import { red, green, grey } from '../../helpers/Colors';

const styles = StyleSheet.create({
  appTitle: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 36,
  },
  loginForm: {
    marginTop: 20,
    fontSize: 18,
    padding: 24,
    paddingBottom: 12,
  },
  inputField: {
    fontSize: 16,
    backgroundColor: 'white',
    padding: 18,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 12,
    marginRight: 12,
  },
  helperText: {
    marginLeft: 36,
    marginRight: 36,
    color: red,
    marginBottom: 12,
  },
  ctaBtn: {
    backgroundColor: green,
    marginTop: 0,
    padding: 12,
    marginLeft: 36,
    marginRight: 36,
  },
  otherOption: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center', 
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherOptionText: {
    fontSize: 16,
    color: grey,
  },
  otherBtn: {
    fontSize: 16,
    padding: 0,
    marginLeft: 12,
    color: green,
  }
});

export default styles;