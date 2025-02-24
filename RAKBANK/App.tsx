// App.tsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment"; // Import moment.js
import { styles } from "./styles";
import NotesSection from "./NotesSection"; // Import the new NotesSection component

const App = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: string[] }>({});
  const [viewAllNotes, setViewAllNotes] = useState(false); // State to toggle all notes view

  const handleDateChange = (date: any) => {
    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      setSelectedDate(formattedDate);
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
        customDatesStyles={(date: any) => {
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

      {/* Render the NotesSection component */}
      {selectedDate && (
        <NotesSection
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          notes={notes}
          setNotes={setNotes}
          viewAllNotes={viewAllNotes}
          setViewAllNotes={setViewAllNotes}
        />
      )}
    </View>
  );
};

export default App;
