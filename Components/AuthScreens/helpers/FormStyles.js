import { StyleSheet } from 'react-native';

const green = '#28a745';
const red = '#c0392b';

const styles = StyleSheet.create({
  appTitle: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 36,
  },
  loginForm: {
    marginTop: 20,
    fontSize: 18,
    padding: 20,
    paddingBottom: 10,
  },
  text: {
    fontSize: 18,
    color: 'grey',
  },
  inputField: {
    fontSize: 16,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 12,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  helperText: {
    marginLeft: 30,
    marginRight: 30,
    color: red,
    marginBottom: 10,
  },
  ctaBtn: {
    backgroundColor: green,
    marginLeft: 30,
    marginRight: 30,
  },
  otherOption: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center', 
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherBtn: {
    margin: 0,
    marginLeft: 10,
  }
});

export default styles;