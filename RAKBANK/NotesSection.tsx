import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";

interface NotesSectionProps {
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  notes: { [key: string]: string[] };
  setNotes: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
  viewAllNotes: boolean;
  setViewAllNotes: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  selectedDate,
  setSelectedDate,
  notes,
  setNotes,
  viewAllNotes,
  setViewAllNotes,
}) => {
  const [noteInput, setNoteInput] = useState("");

  const addNote = () => {
    if (selectedDate) {
      if (!notes[selectedDate]) {
        notes[selectedDate] = [];
      }

      if (notes[selectedDate].length >= 100) {
        Alert.alert("Note Limit Reached", "You can only add up to 100 notes per date.");
        return;
      }

      setNotes({
        ...notes,
        [selectedDate]: [...notes[selectedDate], noteInput],
      });
      setNoteInput(""); 
    }
  };

  const deleteNote = (index: number) => {
    if (selectedDate && notes[selectedDate]) {
      const updatedNotes = notes[selectedDate].filter((_, noteIndex) => noteIndex !== index);
      setNotes({
        ...notes,
        [selectedDate]: updatedNotes,
      });
    }
  };

  const toggleViewAllNotes = () => {
    setViewAllNotes(!viewAllNotes);
  };

  const allNotes = () => {
    return Object.keys(notes).map(date => {
      return notes[date].map(note => ({
        date,
        note,
      }));
    }).flat();  
  };

  return (
    <View style={styles.container}>
      {selectedDate && (
        <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Add a note..."
        placeholderTextColor="gray"
        value={noteInput}
        onChangeText={setNoteInput}
      />
      <Button
        title="Save Note"
        onPress={addNote}
        color="orange"
      />

      <Button
        title={viewAllNotes ? "View Selected Date Notes" : "View All Notes"}
        onPress={toggleViewAllNotes}
        color="orange"
      />

      {viewAllNotes ? (
        <FlatList
          data={allNotes()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.noteItemContainer}>
              <Text style={styles.noteItem}>
                {index + 1}. {item.note} ({item.date})
              </Text>
            </View>
          )}
        />
      ) : (
      
        selectedDate && (
          <FlatList
            data={notes[selectedDate] || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.noteItemContainer}>
                <Text style={styles.noteItem}>
                  {index + 1}. {item}
                </Text>
                <TouchableOpacity onPress={() => deleteNote(index)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )
      )}
    </View>
  );
};

export default NotesSection;
