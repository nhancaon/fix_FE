import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: '#ff9c01',
  },
  headingContainer: {
    flex: 1,
    marginLeft: 40, 
  },
  first_heading: {
    fontSize: 21,
    color: '#ff9c01',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  passwordResetIcon:{
    position: 'absolute',
    top: 50,
    right: 10,
  }
});

export default styles;
