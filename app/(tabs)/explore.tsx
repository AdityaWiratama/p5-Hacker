import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Gambar */}
      <Image
        source={require("../../assets/images/Culinaryy-logo.jpg")} // Ganti dengan logo kuliner yang anda sukai
        style={styles.profileImage}
      />

      {/* Nama Aplikasi */}
      <Text style={styles.appName}>Kulinerku</Text>

      {/* Tagline */}
      <Text style={styles.tagline}>
        <Ionicons name="fast-food" size={20} color="#A0522D" />{" "}
        "Nikmati Cita Rasa Dunia, Langsung dari Dapur Anda"
      </Text>

      {/* Informasi Aplikasi */}
      <View style={styles.infoContainer}>
        <Text style={styles.description}>
          Kulinerku adalah aplikasi kuliner yang menawarkan berbagai resep, tips memasak, dan ide
          hidangan. Mulai dari masakan tradisional hingga hidangan internasional, Kulinerku siap
          menjadi teman setia Anda di dapur.
        </Text>
      </View>

      {/* Fitur Utama */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Fitur Utama:</Text>
        <View style={styles.feature}>
          <Ionicons name="restaurant" size={24} color="#8B4513" />
          <Text style={styles.featureText}>Resep Lengkap dan Variatif</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="timer" size={24} color="#8B4513" />
          <Text style={styles.featureText}>Tips Memasak Cepat</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="nutrition" size={24} color="#8B4513" />
          <Text style={styles.featureText}>Panduan Menu Sehat</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>© 2024 Kulinerku. Semua hak dilindungi.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF5E1',
  },
  profileImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#8B4513',
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#A0522D',
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
  },
  featuresContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FDEBD0',
    borderRadius: 12,
    paddingVertical: 16,
    elevation: 4,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
    textAlign: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  footer: {
    fontSize: 14,
    color: '#A0522D',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen;
