import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

type DoctorInfoProps = {
  activeInnerTab: string;
  setActiveInnerTab: (tab: string) => void;
  selectedTime: string | null;
  handleTimeSelect: (time: string) => void;
  styles: any;
};

const DoctorInfo: React.FC<DoctorInfoProps> = ({
  activeInnerTab,
  setActiveInnerTab,
  selectedTime,
  handleTimeSelect,
  styles,
}) => {
  return (
    <>
      <View style={styles.doctorCard}>
        <Image
          source={require("@/assets/images/Drayesha.png")}
          style={styles.doctorImage}
        />
        <View>
          <Text style={styles.specialistText}>Allergist</Text>
          <Text style={styles.doctorName}>Dr. Ayesha Noor</Text>
        </View>
      </View>

      {/* About Section */}
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
        Aliquam in hendrerit urna.
      </Text>

      {/* Inner Tabs */}
      <View style={styles.innerTabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.innerTabsContainer}
        >
          {["Other Details", "Available Hours", "Reviews"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.innerTab,
                activeInnerTab === tab && styles.activeInnerTab,
              ]}
              onPress={() => setActiveInnerTab(tab)}
            >
              <Text style={styles.innerTabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Inner Tab Content */}
      {activeInnerTab === "Other Details" && (
        <View style={{ gap: 8 }}>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Profession: </Text>Allergist
            Specialist
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Age group: </Text>8-16 years
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Language: </Text>English, Spanish
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Funding options: </Text>Cash & Card
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Service delivery: </Text>Immediate
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Linked clinic: </Text>Fatima Memorial
            Hospital
          </Text>
          <Text style={styles.specialInterestTitle}>
            Special interest area:
          </Text>
          <Text style={styles.specialInterestText}>
            Developmental Language Disorder (DLD), Literacy, Articulation,
            Supporting autistic individuals, Parent and caregiver coaching,
            Early language supports, Social Skills
          </Text>
        </View>
      )}

      {activeInnerTab === "Available Hours" && (
        <View style={{ gap: 5 }}>
          <Text style={styles.sectionTitle}>Available Time Slot</Text>

          <View style={{ flexDirection: "row", gap: 5 }}>
            {["08:00 AM", "09:00 AM", "10:00 AM"].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlotContainer,
                  selectedTime === time && styles.selectedTimeSlot,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: "row", gap: 5 }}>
            {["11:00 AM", "12:00 PM"].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlotContainer,
                  selectedTime === time && styles.selectedTimeSlot,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {activeInnerTab === "Reviews" && (
        <View>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <Text style={styles.detailText}>
            "Great therapist, very professional!" - John Doe
          </Text>
          <Text style={styles.detailText}>
            "Helped me a lot with my condition." - Sarah Smith
          </Text>
        </View>
      )}
    </>
  );
};

export default DoctorInfo;
