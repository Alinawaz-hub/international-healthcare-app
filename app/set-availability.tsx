import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import Button from "@/components/button";
import { Dropdown } from "react-native-element-dropdown";
import Input from "@/components/input";
import moment from "moment";
import HomeHeaderDoc from "../components/doctor-flow/home-header-doctor";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const DURATION_OPTIONS = [
  { label: "30 min", value: "30" },
  { label: "45 min", value: "45" },
  { label: "60 min", value: "60" },
];

const HOURS = Array.from({ length: 24 }, (_, i) => i); // 12AM to 11PM

type Slot = {
  id: string;
  from: string;
  to: string;
  date: string;
};

const mergeDateAndTime = (date: string, time: string) => {
  const dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
  return dateTime.format();
};

export default function SetAvailability() {
  // Static mock data for slots
  const mockSlots = [
    {
      id: "1",
      date: moment().format("YYYY-MM-DD"),
      startTime: "09:00 AM",
      endTime: "09:30 AM",
      status: "active",
    },
    {
      id: "2",
      date: moment().format("YYYY-MM-DD"),
      startTime: "10:00 AM",
      endTime: "10:30 AM",
      status: "active",
    },
    {
      id: "3",
      date: moment().format("YYYY-MM-DD"),
      startTime: "02:00 PM",
      endTime: "02:30 PM",
      status: "active",
    },
  ];

  const slots = mockSlots;

  const [selectedDate, setSelectedDate] = useState(moment());
  const [modalVisible, setModalVisible] = useState(false);
  const [duration, setDuration] = useState<string | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [slotMenu, setSlotMenu] = useState<{
    visible: boolean;
    slotId: string | null;
  }>({
    visible: false,
    slotId: null,
  });
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const ellipsisRefs = useRef<{ [key: string]: any }>({});
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState<"from" | "to" | null>(null);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [isDurationFocus, setIsDurationFocus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputError, setInputError] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const selectedDateStr = selectedDate.format("YYYY-MM-DD");

  const slotsForSelectedDate = slots.filter(
    (slot: (typeof slots)[0]) => slot.date === selectedDate.format("YYYY-MM-DD")
  );

  const handleAddAvailability = () => {
    if (!duration || !from || !to) {
      setInputError(true);
      if (from && to && !duration) {
        setErrorMsg("Please select a duration.");
      } else {
        setErrorMsg("Duration, From, and To are required.");
      }
      return;
    }
    setInputError(false);
    setErrorMsg("");
    
    // Simulate API call
    setIsPending(true);
    setTimeout(() => {
      setModalVisible(false);
      setDuration(null);
      setFrom("");
      setTo("");
      setErrorMsg("");
      setIsPending(false);
      console.log("Slot added successfully!");
    }, 1000);
  };

  const slotDates: string[] = Array.from(
    new Set(slots.map((slot: (typeof slots)[0]) => slot.date))
  );

  const customDatesStyles = useMemo(() => {
    return slotDates.map((date: string) => ({
      startDate: moment(String(date), "YYYY-MM-DD"),
      dateNameStyle: { color: Colors.primary },
      dateNumberStyle: { color: Colors.primary },
      dateContainerStyle: { backgroundColor: Colors.tertiary, borderRadius: 8, },
    }));
  }, [slotDates]);

  // Add a helper to format hour as 'HH:mm'
  const formatHour = (hour: number) =>
    hour < 10 ? `0${hour}:00` : `${hour}:00`;

  return (
    <View style={styles.container}>
      <HomeHeaderDoc showSearch={true} showFilter={false} showAdd={false} />
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Set Availability</Text>
      </View>
      <Text style={styles.subText}>
        Ratings & feedback you've submitted against your sessions.
      </Text>

      <CalendarStrip
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: Colors.primary,
          type: "border",
        }}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: "#000", fontSize: 18 }}
        scrollToOnSetSelectedDate={false} // prevents auto-scroll on each update
        calendarColor={Colors.tertiary}
        dateNumberStyle={{ color: "#000", fontSize: 16 }}
        dateNameStyle={{ color: "#000" }}
        highlightDateNumberStyle={{ color: Colors.primary }}
        highlightDateNameStyle={{ color: Colors.primary }}
        disabledDateNameStyle={{ color: Colors.primary }}
        disabledDateNumberStyle={{ color: Colors.primary }}
        iconContainer={{ flex: 0.1 }}
        scrollable
        highlightDateContainerStyle={{
          backgroundColor: Colors.tertiary,
          borderRadius: 8,
        }}
        customDatesStyles={customDatesStyles}
        onDateSelected={setSelectedDate}
        selectedDate={selectedDate}
        minDate={moment().startOf("day")}
        startingDate={moment().startOf("day")} // 👈 This line prevents the blink/glitch
      />

      {/* Time grid below the calendar */}
      <ScrollView style={{ flex: 1 }}>
        {HOURS.map((hour: number) => {
          const hourSlots = slotsForSelectedDate.filter((slot: any) => {
            if (
              !slot.startTime ||
              typeof slot.startTime !== "string" ||
              slot.startTime.trim() === ""
            )
              return false;
            const m = moment(slot.startTime, ["hh:mm A", "HH:mm"], true);
            return m.isValid() && m.hour() === hour;
          });
          // Find all 30-min blocks in this hour
          const blocks = [0, 30];
          // Mark which blocks are occupied
          const occupied = blocks.map((min: number) => {
            const blockStart = moment({ hour }).add(min, "minutes");
            const blockEnd = blockStart.clone().add(30, "minutes");
            return hourSlots.some((slot: any) => {
              const slotStart = moment(slot.startTime, ["hh:mm A", "HH:mm"]);
              const slotEnd = moment(slot.endTime, ["hh:mm A", "HH:mm"]);
              // Overlap if slotStart < blockEnd && slotEnd > blockStart
              return (
                slotStart.isBefore(blockEnd) && slotEnd.isAfter(blockStart)
              );
            });
          });
          // Find the first available block
          const firstAvailableIdx = occupied.indexOf(false);
          const isFull = occupied.every(Boolean);
          return (
            <View
              key={hour}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                minHeight: 48,
              }}
            >
              {/* Hour label */}
              <Text
                style={{
                  width: 48,
                  color: "#A8A8A8",
                  fontSize: 14,
                  marginTop: 8,
                }}
              >
                {moment({ hour }).format("h A")}
              </Text>
              {/* Slots for this hour */}
              <View style={{ flex: 1 }}>
                {hourSlots.map((slot: any) => {
                  // Calculate duration in minutes
                  const start = moment(slot.startTime, ["hh:mm A", "HH:mm"]);
                  const end = moment(slot.endTime, ["hh:mm A", "HH:mm"]);
                  let duration = end.diff(start, "minutes");
                  if (duration <= 0) duration = 30; // fallback
                  // 30min=40, 45min=60, 60min=80
                  const baseHeight = 40;
                  const slotHeight = Math.round((duration / 30) * baseHeight);
                  return (
                    <View
                      key={slot.id}
                      style={{
                        backgroundColor: Colors.tertiary,
                        borderRadius: 8,
                        padding: 10,
                        marginBottom: 6,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginLeft: 8,
                        height: slotHeight,
                        minHeight: baseHeight,
                      }}
                    >
                      <View>
                        <Text style={{ color: "#000", fontSize: 15 }}>
                          {slot.startTime}
                        </Text>
                        <Text style={{ color: "#000", fontSize: 15 }}>
                          {slot.endTime}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {/* Edit icon */}
                        <TouchableOpacity
                          onPress={() => {
                            setEditingSlotId(slot.id);
                            setFrom(
                              moment(slot.startTime, [
                                "hh:mm A",
                                "HH:mm",
                              ]).format("HH:mm")
                            );
                            setTo(
                              moment(slot.endTime, ["hh:mm A", "HH:mm"]).format(
                                "HH:mm"
                              )
                            );
                            setDuration(duration.toString());
                            setModalVisible(true);
                            setInputError(false);
                            setErrorMsg("");
                          }}
                          style={{ marginRight: 8 }}
                        >
                          <Ionicons
                            name="create-outline"
                            size={22}
                            color="#1F1F1F"
                          />
                        </TouchableOpacity>
                        {/* Delete icon */}
                        <TouchableOpacity
                          onPress={() => {
                            Alert.alert(
                              "Delete Slot",
                              "Are you sure you want to delete this slot?",
                              [
                                { text: "No", style: "cancel" },
                                {
                                  text: "Yes",
                                  style: "destructive",
                                  onPress: () => {
                                    setIsDeleting(true);
                                    setTimeout(() => {
                                      setIsDeleting(false);
                                      console.log("Slot deleted successfully!");
                                    }, 1000);
                                  },
                                },
                              ]
                            );
                          }}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={22}
                            color="#E53935"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
                {/* Always show add-slot button unless hour is full */}
                {!isFull && (
                  <TouchableOpacity
                    style={{
                      minHeight: 40,
                      marginLeft: 8,
                      marginBottom: 6,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "#E0E0E0",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      backgroundColor: "#fff",
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                      if (firstAvailableIdx === -1) {
                        console.log("No available 30-minute slot in this hour.");
                        return;
                      }
                      const fromTime = moment({ hour })
                        .add(firstAvailableIdx * 30, "minutes")
                        .format("HH:mm");
                      setFrom(fromTime);
                      setDuration("30");
                      setTo(
                        moment(fromTime, "HH:mm")
                          .add(30, "minutes")
                          .format("HH:mm")
                      );
                      setModalVisible(true);
                      setInputError(false);
                      setErrorMsg("");
                    }}
                  />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.addBtnContainer}>
        <Button
          title="Add Availability"
          type="default"
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Add Availability Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setDuration(null);
          setFrom("");
          setTo("");
          setErrorMsg("");
          setInputError(false);
          setEditingSlotId(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              setModalVisible(false);
              setDuration(null);
              setFrom("");
              setTo("");
              setErrorMsg("");
              setInputError(false);
              setEditingSlotId(null);
            }}
          />
          <View style={[styles.modalContent, { backgroundColor: "#FFF" }]}>
            {/* Add/Edit icon above modal title */}
            <Ionicons
              name={editingSlotId ? "create-outline" : "add-circle-outline"}
              size={28}
              color={Colors.primary}
              style={{ marginBottom: 8, alignSelf: "center" }}
            />
            <Text style={[styles.modalTitle, { color: "#1F1F1F" }]}>
              Add Availability
            </Text>
            <View style={{ width: 330, marginBottom: 12 }}>
              <Dropdown
                style={[
                  styles.input,
                  {
                    width: "100%",
                    minWidth: 330,
                    marginBottom: 12,
                    borderColor: inputError
                      ? "#E53935"
                      : isDurationFocus
                      ? "#00EF99"
                      : "#E0E0E0",
                    backgroundColor: "#FFF",
                    elevation: isDurationFocus ? 2 : 0,
                    shadowColor: isDurationFocus ? "#00EF99" : "#000",
                    shadowOpacity: isDurationFocus ? 0.15 : 0,
                    shadowRadius: isDurationFocus ? 4 : 0,
                  },
                ]}
                data={DURATION_OPTIONS}
                labelField="label"
                valueField="value"
                placeholder="Duration"
                value={duration}
                onChange={(item) => {
                  setInputError(false);
                  setDuration(item.value);
                  // If 'from' is set, update 'to' to be from + new duration
                  if (from) {
                    const mins = parseInt(item.value, 10);
                    setTo(
                      moment(from, "HH:mm").add(mins, "minutes").format("HH:mm")
                    );
                  }
                }}
                onFocus={() => setIsDurationFocus(true)}
                onBlur={() => setIsDurationFocus(false)}
                placeholderStyle={{
                  color: inputError ? "#E53935" : "#525252",
                  fontSize: 16,
                }}
                selectedTextStyle={{
                  color: "#1F1F1F",
                  fontSize: 16,
                }}
                containerStyle={{ backgroundColor: "#FFF" }}
                itemTextStyle={{ color: "#1F1F1F" }}
                renderRightIcon={() => (
                  <Text
                    style={{
                      fontSize: 18,
                      color: inputError ? "#E53935" : "#525252",
                      marginRight: 8,
                      transform: [
                        { rotate: isDurationFocus ? "180deg" : "0deg" },
                      ],
                    }}
                  >
                    ▼
                  </Text>
                )}
              />
              <TouchableOpacity
                onPress={() => {
                  setPickerMode("from");
                  setPickerVisible(true);
                }}
              >
                <Input
                  placeholder="From"
                  value={from ? moment(from, "hh:mm A").format("hh:mm A") : ""}
                  editable={false}
                  pointerEvents="none"
                  style={[
                    styles.input,
                    {
                      color: "#000",
                      backgroundColor: "#FFF",
                      borderColor: inputError ? "#E53935" : "#E0E0E0",
                      width: "100%",
                    },
                  ]}
                  placeholderTextColor={inputError ? "#E53935" : "#525252"}
                  onChangeText={() => {
                    setInputError(false);
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPickerMode("to");
                  setPickerVisible(true);
                }}
              >
                <Input
                  placeholder="To"
                  value={to ? moment(to, "hh:mm A").format("hh:mm A") : ""}
                  editable={false}
                  pointerEvents="none"
                  style={[
                    styles.input,
                    {
                      color: "#000",
                      backgroundColor: "#FFF",
                      borderColor: inputError ? "#E53935" : "#E0E0E0",
                      width: "100%",
                    },
                  ]}
                  placeholderTextColor={inputError ? "#E53935" : "#525252"}
                  onChangeText={() => {
                    setInputError(false);
                  }}
                />
              </TouchableOpacity>
            </View>
            <Button
              title={
                isPending || isUpdating
                  ? "Saving..."
                  : editingSlotId
                  ? "Update Slot"
                  : "Add Availability"
              }
              type="default"
              onPress={() => {
                if (editingSlotId) {
                  // Update slot
                  setIsUpdating(true);
                  setTimeout(() => {
                    setModalVisible(false);
                    setDuration(null);
                    setFrom("");
                    setTo("");
                    setErrorMsg("");
                    setInputError(false);
                    setEditingSlotId(null);
                    setIsUpdating(false);
                    console.log("Slot updated successfully!");
                  }, 1000);
                } else {
                  handleAddAvailability();
                }
              }}
              style={{ marginTop: 16 }}
              disabled={isPending || isUpdating}
            />
            <Button
              title="Cancel"
              type="default"
              onPress={() => {
                setModalVisible(false);
                setDuration(null);
                setFrom("");
                setTo("");
                setErrorMsg("");
                setInputError(false);
                setEditingSlotId(null);
              }}
              style={styles.cancelBtn}
              textStyle={{ color: "black" }}
            />
            <DateTimePickerModal
              isVisible={pickerVisible}
              mode="time"
              is24Hour={false}
              date={
                pickerMode === "from" && from
                  ? moment(from, ["HH:mm"]).toDate()
                  : pickerMode === "to" && to
                  ? moment(to, ["HH:mm"]).toDate()
                  : new Date()
              }
              onConfirm={(date) => {
                if (pickerMode === "from")
                  setFrom(moment(date).format("HH:mm"));
                if (pickerMode === "to") setTo(moment(date).format("HH:mm"));
                setPickerVisible(false);
                setPickerMode(null);
              }}
              onCancel={() => {
                setPickerVisible(false);
                setPickerMode(null);
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Removed slot menu for static UI */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 15 },
  headerRow: { marginTop: 32, marginLeft: 20, marginBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1F1F1F" },
  subText: { color: "#525252", fontSize: 15, marginLeft: 20, marginBottom: 8 },
  slotsContainer: { flex: 1, marginHorizontal: 20, marginTop: 8 },
  hourRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  hourLabel: { width: 40, color: "#A8A8A8", fontSize: 14, marginTop: 8 },
  slotList: { flex: 1 },
  slotBox: {
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 8,
  },
  slotText: { color: Colors.primary, fontSize: 15 },
  ellipsis: {
    marginLeft: 8,
    padding: 8,
    minWidth: 32,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnContainer: { alignItems: "center", marginBottom: 24 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  dropdown: { width: 330, marginBottom: 12 },
  input: { marginBottom: 12 },
  cancelBtn: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 8,
  },
  dropdownMenu: {
    width: 120,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  menuOption: { width: 120, paddingVertical: 12, alignItems: "center" },
  menuDeleteText: { color: "#E53935", fontWeight: "bold", fontSize: 16 },
});
