// Prescription.tsx

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "@/components/user-flow/appointment-details-styling";

interface Appointment {
  id: string;
  clinic: string;
  therapist: string;
}

interface PrescriptionProps {
  appointments: Appointment[];
  router: any;
}

const Prescription: React.FC<PrescriptionProps> = ({
  appointments,
  router,
}) => {
  return (
    <View style={styles.patientInfoContainer}>
      {appointments.map((item) => (
        <View key={item.id} style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <View style={styles.leftBadges}>
                <View style={styles.idBadge}>
                  <Text style={styles.idText}>ID: 5646543</Text>
                </View>
              </View>
              <View style={styles.paidBadge}>
                <Text style={styles.paidText}>Jan 12, 2025</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle1}>Prescription title:</Text>
            <TouchableOpacity>
              <Text style={styles.sectionTitle}>Prescription title here</Text>
            </TouchableOpacity>
            <View style={styles.infoContainer1}>
              <View style={styles.row}>
                <Text style={styles.label}>
                  Therapist name
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.therapistContainer}>
                  <Image
                    source={require("@/assets/images/codyfisher.png")}
                    style={styles.profileIcon}
                  />
                  <Text style={styles.boldText1}>{item.therapist}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={{ gap: 8 }}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Service: </Text>Skin Care
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Appointment for: </Text>
                  My Self
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Med. Prescribed: </Text>2
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Prescription;