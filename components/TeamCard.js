import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';

// Komponen TeamCard
const TeamCard = ({ teamMember }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleImagePress(teamMember.image)}>
        <Image source={{ uri: teamMember.image }} style={styles.teamImage} />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{teamMember.name}</Text>
        <Text style={styles.cardRole}>{teamMember.role}</Text>
      </View>

      {/* Modal untuk gambar besar */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Menutup modal
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
    padding: 10,
  },
  teamImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  cardContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardRole: {
    fontSize: 14,
    color: '#777',
  },

  // Gaya untuk modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TeamCard;
