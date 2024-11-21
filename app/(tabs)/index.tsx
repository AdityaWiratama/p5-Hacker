import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, ImageBackground, TextInput, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Data untuk kategori dan menu
const FILTER_OPTIONS = [
  { id: "0", label: "All" },
  { id: "1", label: "Desserts" },
  { id: "2", label: "Drink" },
  { id: "3", label: "Vegetarian" },
  { id: "4", label: "Snack" },
];

const DATA = [
  { id: '1',
    category_id: '1', 
    type: 'Food', 
    title: 'Bruschetta', 
    image: 'https://www.spar.co.uk/media/rjzpdyrp/italian-bruschetta.jpg', 
    overview: 'Makanan pembuka khas Italia yang terbuat dari roti panggang renyah, dioleskan dengan bawang putih segar, dan disiram dengan minyak zaitun berkualitas tinggi. Dihiasi dengan campuran tomat cincang, daun basil, dan sedikit garam laut, hidangan ini menjadi pilihan sempurna untuk memulai setiap makan.' },

  { id: '2', 
    category_id: '2', 
    type: 'drink', 
    title: 'Margarita', 
    image: 'https://aflavorjournal.com/wp-content/uploads/2019/03/skinny-margarita-recipe-scaled.jpg', 
    overview: 'Koktail klasik yang menawarkan keseimbangan sempurna antara rasa asam dari jeruk nipis, lembutnya tequila, dan sedikit manis, biasanya disajikan dengan pinggiran gelas yang diberi garam. Minuman ini sangat menyegarkan dan cocok untuk berbagai kesempatan, terutama saat cuaca panas.' },

  { id: '3', 
    category_id: '3', 
    type: 'Vegetarian', 
    title: 'Salad', 
    image: 'https://cdn1-production-images-kly.akamaized.net/UdGxQFOr-QQtc5wFZcl9mvZcfwM=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3390091/original/047746000_1614610130-Croatian_Salad.jpg', 
    overview: 'Hidangan segar ini menggabungkan berbagai jenis sayuran, buah-buahan, dan kacang-kacangan, yang semua disatukan untuk menciptakan campuran tekstur dan rasa yang sempurna. Saus dressing yang digunakan memberikan keseimbangan, baik rasa creamy maupun asam, menjadikannya pendamping atau hidangan ringan yang ideal.' },

  { id: '4', 
    category_id: '4', 
    type: 'food', 
    title: 'Yogurt', 
    image: 'https://d1bpj0tv6vfxyp.cloudfront.net/mitos-atau-fakta-konsumsi-yogurt-bikin-pencernaan-sehathalodoc.jpg', 
    overview: 'Makanan yang lembut dan creamy ini kaya akan probiotik, dibuat dengan proses fermentasi susu menggunakan bakteri baik. Nikmati yogurt polos atau dengan tambahan buah-buahan, madu, atau kacang, yang menjadikannya pilihan yang sehat dan serbaguna untuk setiap hidangan.' },

  { id: '5', 
    category_id: '4', 
    type: 'food', 
    title: 'Oatmeal', 
    image: 'https://silamparitv.disway.id/upload/6588ed85a97b1d3013deea06e314f593.jpg', 
    overview: 'Sarapan hangat yang terbuat dari gandum utuh, oatmeal kaya akan serat dan nutrisi. Baik disajikan dengan rasa manis menggunakan buah-buahan dan madu, atau rasa gurih dengan telur dan rempah, hidangan ini adalah pilihan yang sempurna untuk memulai hari dengan sehat.' },

  { id: '6', 
    category_id: '1', 
    type: 'food', 
    title: 'Mandazi', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR43fhAclIwGc4VmbmKI_uXL4UPhFbv8Xlrwg&s', 
    overview: 'Makanan penutup yang sangat disukai di Afrika, Mandazi adalah pastry adonan yang digoreng hingga kecokelatan, ringan, berbusa, dan sedikit manis. Biasanya dinikmati sebagai camilan atau hidangan penutup, Mandazi sangat cocok disajikan dengan teh atau kopi.' },

  { id: '7', 
    category_id: '1', 
    type: 'food', 
    title: 'Cheesecake', 
    image: 'https://hips.hearstapps.com/hmg-prod/images/raspberry-cheesecake-1674225141.jpeg', 
    overview: 'Kue yang kaya, creamy, dan sangat halus ini terbuat dari dasar kue biskuit yang dihancurkan, kemudian ditambahkan dengan isian krim keju yang lembut. Biasanya diberi topping buah segar, cokelat, atau karamel, cheesecake adalah hidangan penutup yang tidak pernah gagal memukau.' },

  { id: '8', 
    category_id: '2', 
    type: 'drink', 
    title: 'Eggnog', 
    image: 'https://feelgoodfoodie.net/wp-content/uploads/2023/10/How-to-Make-Eggnog-TIMG.jpg', 
    overview: 'Minuman khas musim liburan ini dibuat dengan mengocok kuning telur, gula, susu, dan krim, menciptakan tekstur yang kaya dan lembut. Rempah-rempah seperti kayu manis dan pala memberikan rasa hangat yang nyaman, sementara sedikit rum menambah sentuhan dewasa, sempurna untuk perayaan.' },

  { id: '9', 
    category_id: '2', 
    type: 'drink', 
    title: 'Sangria', 
    image: 'https://www.allrecipes.com/thmb/MDmejvMxqPCS5EXNzxx6atFgwnA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/222520sangria-cocktaillutzflcat4x3-a49b63c5dde34c1281dacfc0a2b8c934.jpg', 
    overview: 'An alcoholic drink originating from Spain and Portugal that is made with a mixture of grapes, fruit, and other ingredients.' },

  { id: '10', 
    category_id: '3', 
    type: 'food', 
    title: 'Pad Phuk Tong', 
    image: 'https://www.shutterstock.com/image-photo/pad-faktong-thai-stirfried-pumpkin-600nw-1725645955.jpg', 
    overview: 'Food that comes from pumpkin stir-fried with other vegetables and produces a fresh taste' },

  { id: '11', 
    category_id: '3', 
    type: 'food', 
    title: 'Guacamole', 
    image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7DD941F0-7E17-4DBB-A778-90328C0AC000/Derivates/254D6349-1A37-47B1-A490-BC4B5013AECA.jpg', 
    overview: 'Saus kremi yang terbuat dari alpukat yang dihancurkan, dicampur dengan jeruk nipis dan sedikit garam. Guacamole adalah bintang utama dari setiap pesta Meksiko. Dengan tekstur lembut dan rasa segar yang tajam, guacamole sangat cocok dipadukan dengan keripik tortilla atau sebagai topping taco dan burrito.' },

  { id: '12', 
    category_id: '4', 
    type: 'food', 
    title: 'Cinnamon Apple Pie', 
    image: 'https://www.southernliving.com/thmb/Ix8BjOTjKEUf2WYU9qCVc7vsGkQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Cinnamon-Roll-Apple-Pie_SEO66_Step013_029-ad76ac226f2245fd9b1f6378772ebe74.jpg', 
    overview: 'Pai apel yang hangat dengan rasa manis dan rempah-rempah, dibalut dengan kulit pastry yang renyah dan buttery. Dihiasi dengan potongan apel segar, kayu manis, dan gula, hidangan ini memberikan keseimbangan rasa yang sempurna. Cocok disajikan dengan es krim vanila atau krim kocok.' },

  { id: '13', 
    category_id: '4', 
    type: 'food', 
    title: 'Croissant', 
    image: 'https://smartpluspro.com/app/repository/upload/2024_Boleci%20Copyright/Artikel%20SEO/4_April/Gagal%20Bikin%20Croissant%20No%20Worries%2C%20Ada%20Tips%20Jitu%20Buat%20Kamu!.png', 
    overview: 'Pastry Prancis yang renyah dan buttery ini memiliki lapisan-lapisan halus yang meleleh di mulut. Croissant yang keemasan dan garing di luar ini memiliki interior yang lembut dan ringan. Sering dinikmati saat sarapan atau sebagai camilan, croissant juga bisa diisi dengan cokelat, pasta almond, atau hanya dinikmati begitu saja.' },

  { id: '14', 
    category_id: '4', 
    type: 'food', 
    title: 'Pizza', 
    image: 'https://cdn1-production-images-kly.akamaized.net/m5Es7e9OWVFsHJE7idtl4E2EIL8=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3184486/original/057993000_1595219338-pizza-slices-marble-chopping-board_23-2147926088.jpg', 
    overview: 'Hidangan gurih yang dipanggang dari adonan tepung terigu yang difermentasi, diberi topping saus tomat, keju mozzarella, dan berbagai bahan lainnya seperti pepperoni, jamur, atau sayuran. Pizza ini merupakan hidangan yang sangat disukai oleh banyak orang, dengan berbagai pilihan topping yang bisa disesuaikan dengan selera.' },

  { id: '16', 
    category_id: '2', 
    type: 'drink', 
    title: 'Mojito', 
    image: 'https://asset.kompas.com/crops/Vebq-yRG4ZP_IvtUy9v4PFLA68A=/39x0:1000x641/1200x800/data/photo/2023/08/23/64e60c4718a40.jpg', 
    overview: 'Koktail segar yang dibuat dengan rum, daun mint segar, jeruk nipis, gula, dan air soda. Mojito adalah minuman khas Kuba yang dikenal dengan rasa manis, asam, dan kesegaran mint-nya, membuatnya menjadi pilihan minuman yang sempurna untuk menenangkan diri di hari yang panas.' },

  { id: '17', 
    category_id: '2', 
    type: 'drink', 
    title: 'Cappuccino', 
    image: 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/indizone/2019/10/07/ers0M9/t_5d9ae209ae934.jpg', 
    overview: 'Minuman kopi Italia yang terbuat dari espresso, susu panas, dan busa susu. Cappuccino memiliki rasa kaya dan lembut, cocok dinikmati di pagi hari sebagai pemicu semangat atau sebagai camilan sore hari, terutama jika dipadukan dengan pastry manis.' },

    { 
      id: '18', 
      category_id: '1', 
      type: 'food', 
      title: 'Spaghetti Carbonara', 
      image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0346a29a89ef229b1a0ff9697184f944/Derivates/cb5051204f4a4525c8b013c16418ae2904e737b7.jpg', 
      overview: 'Hidangan pasta klasik Italia yang terbuat dari pasta spaghetti, telur, keju parmesan, pancetta, dan lada hitam. Rasa creamy dan gurihnya membuatnya menjadi pilihan favorit banyak orang.' 
    },
    { 
      id: '19', 
      category_id: '2', 
      type: 'drink', 
      title: 'Pina Colada', 
      image: 'https://www.evolvingtable.com/wp-content/uploads/2024/02/Pina-Colada-Recipe-12.jpg', 
      overview: 'Minuman tropis yang dibuat dengan campuran rum, jus nanas, dan santan kelapa. Pina Colada memberikan rasa manis dan segar, menjadikannya pilihan sempurna untuk hari yang panas.' 
    },

    { 
      id: '20', 
      category_id: '2', 
      type: 'drink', 
      title: 'Iced Latte', 
      image: 'https://teainjanuary.com/wp-content/uploads/2024/09/Iced-Vanilla-Oatmilk-Latte.jpg', 
      overview: 'Minuman kopi yang terdiri dari espresso yang disajikan dengan susu dingin dan es. Iced Latte sangat menyegarkan dan cocok untuk pecinta kopi yang ingin menikmati minuman kopi dingin di hari panas.' 
    },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("0");
  const [modalVisible, setModalVisible] = useState(false); // State untuk modal
  const [selectedImage, setSelectedImage] = useState(""); // State untuk menyimpan gambar yang dipilih
  const [selectedDescription, setSelectedDescription] = useState(""); // State untuk menyimpan deskripsi yang dipilih
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => setShowIntro(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Filter recipes based on category_id and search query
  const filteredRecipes = DATA.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "0" || item.category_id === selectedFilter; // Filter by category_id
    return matchesSearch && matchesFilter;
  });

  if (showIntro) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <ImageBackground
          source={{ uri: "https://www.mahdinur.com/wp-content/uploads/2024/02/6.-logo.jpg" }}
          style={styles.backgroundImage}
        >
          <View style={styles.introContainer}>
            <Text style={styles.introText}>Welcome to the culinary app</Text>
            <Text style={styles.introSubText}>Explore delicious recipes here.</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Recipe App</Text>
      </View>

      <View style={styles.filterContainer}>
        {FILTER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.filterButton, selectedFilter === option.id && styles.selectedFilter]}
            onPress={() => setSelectedFilter(option.id)}
          >
            <Text style={styles.filterText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedImage(item.image); // Set gambar yang dipilih
              setSelectedDescription(item.overview); // Set deskripsi yang dipilih
              setModalVisible(true); // Tampilkan modal
            }}
          >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardOverview}>{item.overview}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Menutup modal
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
            <Text style={styles.modalDescription}>{selectedDescription}</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  navbar: { backgroundColor: "#3e4a59", padding: 15 },
  navbarText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  backgroundImage: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
  introContainer: { justifyContent: "center", alignItems: "center" },
  introText: { fontSize: 30, color: "#fff", fontWeight: "bold" },
  introSubText: { fontSize: 18, color: "#fff" },
  filterContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
  filterButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: "#e1e1e1" },
  selectedFilter: { backgroundColor: "#3e4a59" },
  filterText: { color: "#000" },
  searchInput: { borderColor: "#ccc", borderWidth: 1, borderRadius: 10, padding: 10, margin: 10 },
  card: { flexDirection: "row", margin: 10, backgroundColor: "#f9f9f9", borderRadius: 10, overflow: "hidden" },
  recipeImage: { width: 100, height: 100, borderRadius: 10 },
  cardContent: { padding: 10, flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardOverview: { fontSize: 14, color: "#555" },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.7)" },
  modalContent: { backgroundColor: "#fff", borderRadius: 10, padding: 20, alignItems: "center", width: "80%" },
  modalImage: { width: "100%", height: 200, borderRadius: 10 },
  modalDescription: { marginTop: 20, fontSize: 16, color: "#333" },
  closeButton: { position: "absolute", top: 10, right: 10 },
  closeButtonText: { fontSize: 18, color: "#000" },
});
