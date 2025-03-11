import React, { useState, useCallback } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, Dimensions, Modal, Image, ScrollView } from "react-native"
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Wardrobe = () => {
    const navigation = useNavigation();
    const [type, setType] = useState('OUTWEAR');
    const [modalVisible, setModalVisible] = useState(false);
    const [wardrobe, setWardrobe] = useState([]);

    useFocusEffect(
        useCallback(() => {
          fetchWardrobe();
        }, [])
      );

    const fetchWardrobe = async () => {
        try {
            const storedItems = await AsyncStorage.getItem('wardrobe');
            if (storedItems) {
                setWardrobe(JSON.parse(storedItems));
            }
        } catch (error) {
            console.error("Failed to load wardrobe:", error);
        }
    };

    const filteredItems = wardrobe.filter(item => item.type === type);

    const chooseImage = async () => {
        try {
            const result = await new Promise((resolve, reject) => {
                launchImageLibrary({ mediaType: "photo", quality: 0.8 }, ({ assets, errorMessage }) => {
                    if (errorMessage) reject(errorMessage);
                    else resolve(assets?.[0]?.uri || null);
                });
            });
    
            setModalVisible(false);
            navigation.navigate('AddItemScreen', {image: result})
        } catch (error) {
            Alert.alert("Error", "Failed to select image.");
        }
    };

    const takePhoto = async () => {
        try {
            const result = await new Promise((resolve, reject) => {
                launchCamera({ mediaType: "photo", quality: 0.8 }, ({ assets, errorMessage }) => {
                    if (errorMessage) reject(errorMessage);
                    else resolve(assets?.[0]?.uri || null);
                });
            });
                
            setModalVisible(false);
            navigation.navigate('AddItemScreen', {image: result})
        } catch (error) {
            Alert.alert("Error", "Failed to take a photo.");
        }
    };
    

    return (
        <ImageBackground source={require('../assts/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.row}>
                    <Text style={styles.title}>WARDROBE</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                        <Text style={styles.addBtnText}>ADD +</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity 
                        style={[styles.typeBtn, type === 'OUTWEAR' && {backgroundColor: '#fff'}]} 
                        onPress={() => setType('OUTWEAR')}
                        >
                        <Text style={styles.typeBtnText}>OUTWEAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.typeBtn, type === 'TOPS' && {backgroundColor: '#fff'}]} 
                        onPress={() => setType('TOPS')}
                        >
                        <Text style={styles.typeBtnText}>TOPS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.typeBtn, type === 'BOTTOMS' && {backgroundColor: '#fff'}]} 
                        onPress={() => setType('BOTTOMS')}
                        >
                        <Text style={styles.typeBtnText}>BOTTOMS</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width: '100%'}} contentContainerStyle={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    {
                        filteredItems.length > 0 && (
                            filteredItems.map((item, index) => (
                                <View key={index} style={styles.card}>
                                    <Image source={{uri: item.image}} style={styles.cardImage} />
                                    <TouchableOpacity style={styles.cardBtn} onPress={() => navigation.navigate('ItemScreen', {item: item})}>
                                        <Text style={styles.cardName} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        )
                    }
                </ScrollView>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity 
                            style={[styles.addBtn, {position: 'absolute', top: height * 0.07, right: 24, backgroundColor: '#fff'}]} 
                            onPress={() => setModalVisible(false)}
                            >
                            <Text style={[styles.addBtnText, {color: '#000'}]}>ADD +</Text>
                        </TouchableOpacity>

                        <View style={{width: '100%', position: 'absolute', bottom: 30, paddingHorizontal: 10}}>
                            <View style={{width: '100%', overflow: 'hidden', marginBottom: 8, alignItems: 'center'}}>
                                <TouchableOpacity 
                                    style={[styles.modalBtn, {borderBottomWidth: 0.2, borderBottomColor: '#fff', borderTopRightRadius: 13, borderTopLeftRadius: 13}]}
                                    onPress={chooseImage}
                                    >
                                    <Text style={styles.modalBtnText}>Choose from gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.modalBtn, {borderBottomLeftRadius: 13, borderBottomRightRadius: 13}]}
                                    onPress={takePhoto}
                                    >
                                    <Text style={styles.modalBtnText}>Take a photo</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[styles.modalBtn, {borderRadius: 13, alignSelf: 'center'}]} onPress={() => setModalVisible(false)}>
                                <Text style={[styles.modalBtnText, {color: '#a59e89', fontWeight: '600'}]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        padding: 24,
        alignItems: 'center'
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 29,
        color: '#fff',
    },

    row: {
        width: '100%',
         alignItems: 'center',
         justifyContent: 'space-between',
         flexDirection: 'row',
         marginBottom: 32
    },

    addBtn: {
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    addBtnText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 17,
        color: '#fff',
    },

    typeBtn: {
        width: '33%',
        backgroundColor: '#1c1c1c',
        borderRadius: 60,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    typeBtnText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        color: '#ababab',
    },

    card: {
        width: '47%',
        height: 206,
        marginBottom: 16,
        borderRadius: 30,
        overflow: 'hidden'
    },

    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    cardBtn: {
        width: '96%',
        borderRadius: 100,
        backgroundColor: '#efe9dd',
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },

    cardName: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14.4,
        color: '#1c1c1c',
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },

    modalBtn: {
        width: '100%',
        backgroundColor: '#181818',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18
    },

    modalBtnText: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 25,
        color: '#efe9dd',
    }

})

export default Wardrobe;