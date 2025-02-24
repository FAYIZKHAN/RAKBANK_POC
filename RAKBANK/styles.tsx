import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    backgroundColor: 'black',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  input: {
    height: 40,
    width: '70%',
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  selectedDate: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  noteContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  noteItem: {
    color: 'white',
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  expandedNote: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: '80%',
    marginTop: 20,
  },
  expandedText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  // New style for note item container
  noteItemContainer: {
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
