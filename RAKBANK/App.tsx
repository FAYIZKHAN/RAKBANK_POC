import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment"; // Import moment.js
import { styles } from "./styles";

const App = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: string[] }>({});
  const [noteInput, setNoteInput] = useState("");

  const handleDateChange = (date: any) => {
    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      setSelectedDate(formattedDate);
    }
  };

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

  const isDateDisabled = (date: any) => {
    return moment(date).isBefore(moment(), "day");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Calendar</Text>
      </View>

      <CalendarPicker
        onDateChange={handleDateChange}
        textStyle={{ color: "white" }}
        todayBackgroundColor="transparent"
        selectedDayColor="orange"
        selectedDayTextColor="white"
        customDatesStyles={(date: any) => {  // Corrected the property name here
          if (moment().isSame(date, "day")) {
            return {
              style: {
                backgroundColor: "green",
                borderWidth: 2,
                borderColor: "green",
                borderRadius: 50,
              },
              textStyle: {
                color: "orange",
              },
            };
          }

          if (selectedDate && moment(date).isSame(selectedDate, "day")) {
            return {
              style: {
                backgroundColor: "orange",
                borderRadius: 50,
              },
              textStyle: {
                color: "white",
              },
            };
          }

          if (isDateDisabled(date)) {
            return {
              style: {
                backgroundColor: "gray",
                borderRadius: 50,
              },
              textStyle: {
                color: "darkgray",
              },
            };
          }

          return {};
        }}
      />

      {selectedDate && (
        <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
      )}

      {!isDateDisabled(selectedDate) && (
        <>
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
        </>
      )}

      {selectedDate && (
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
      )}
    </View>
  );
};

export default App;
