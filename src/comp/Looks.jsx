import React, { useState, useCallback } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, Dimensions, Modal, Image, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BlurView } from '@react-native-community/blur';

const { height } = Dimensions.get('window');

const Looks = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedLookIndex, setSelectedLookIndex] = useState(null);
    const [wardrobe, setWardrobe] = useState([]);
    const [looks, setLooks] = useState([]);

    useFocusEffect(
        useCallback(() => {
          fetchWardrobe();
          fetchLooks();
        }, [])
      );

      const fetchWardrobe = async () => {
        try {
            const storedItems = await AsyncStorage.getItem('wardrobe');
            if (storedItems) {
                const items = JSON.parse(storedItems);
                setWardrobe(items);
                checkIncompleteOutfit(items);
            }
        } catch (error) {
            console.error("Failed to load wardrobe:", error);
        }
    };

    const fetchLooks= async () => {
        try {
            const storedItems = await AsyncStorage.getItem('looks');
            if (storedItems) {
                const items = JSON.parse(storedItems);
                setLooks(items);
            }
        } catch (error) {
            console.error("Failed to load your looks:", error);
        }
    };

    const checkIncompleteOutfit = (items) => {
        const types = ['OUTWEAR', 'TOPS', 'BOTTOMS'];
        const missingType = types.find(type => !items.some(item => item.type === type));
        
        if (missingType) {
            setIsModalVisible(true);
        }
    };

    const closeModalAndGoBack = () => {
        setIsModalVisible(false);
        navigation.navigate('WardrobeScreen');
    };

    const confirmDelete = async () => {
        if (selectedLookIndex !== null) {
            try {
                const updatedLooks = looks.filter((_, index) => index !== selectedLookIndex);
                await AsyncStorage.setItem('looks', JSON.stringify(updatedLooks));
                setLooks(updatedLooks);
                setIsDeleteModalVisible(false);
                setSelectedLookIndex(null);
            } catch (error) {
                console.error("Failed to delete look:", error);
            }
        }
    };

    return (
        <ImageBackground source={require('../assts/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.row}>
                    <Text style={styles.title}>CREATE YOUR LOOK</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('CreateLookScreen')}>
                        <Text style={styles.addBtnText}>ADD +</Text>
                    </TouchableOpacity>
                </View>

                {
                    looks.length > 0 && (
                        <ScrollView style={{width: '100%'}}>
                            {
                                looks.map((look, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={styles.card} 
                                        onLongPress={() => {
                                            setSelectedLookIndex(index);
                                            setIsDeleteModalVisible(true);
                                        }}
                                    >
                                        {look.visibleItems.OUTWEAR && (
                                            <Image
                                                source={{ uri: look.visibleItems.OUTWEAR.image }}
                                                style={{width: 100, height: 100, resizeMode: 'cover', borderRadius: 13}}
                                            />
                                        )}

                                        {look.visibleItems.TOPS && (
                                            <Image
                                                source={{ uri: look.visibleItems.TOPS.image }}
                                                style={{width: 100, height: 100, resizeMode: 'cover', borderRadius: 13}}
                                            />
                                        )}

                                        {look.visibleItems.BOTTOMS && (
                                            <Image
                                                source={{ uri: look.visibleItems.BOTTOMS.image }}
                                                style={{width: 100, height: 100, resizeMode: 'cover', borderRadius: 13}}
                                            />
                                        )}
                                    </TouchableOpacity>
                                ))
                            }
                            <View style={{height: 100}} />
                        </ScrollView>
                    )
                }

                <Modal
                    visible={isModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={closeModalAndGoBack}
                >
                    <BlurView
                        style={styles.modalBackground}
                        intensity={10}
                        tint="light"
                    />
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Incomplete Outfit!</Text>
                            <Text style={styles.modalText}>You haven’t added enough items to create a full look. Add more pieces to complete your outfit.</Text>
                            <TouchableOpacity style={[styles.modalBtn, {width: '100%', borderTopColor: '#fff', borderTopWidth: 0.2}]} onPress={closeModalAndGoBack}>
                                <Text style={[styles.modalBtnText, {color: '#fff', fontWeight: '600'}]}>Back to Wardrobe</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={isDeleteModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setIsDeleteModalVisible(false)}
                >
                    <BlurView
                        style={styles.modalBackground}
                        intensity={10}
                        tint="light"
                    />
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Delete This Item?</Text>
                            <Text style={styles.modalText}>Are you sure you want to remove this item from your looks? This action cannot be undone.</Text>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopColor: '#fff', borderTopWidth: 0.2 }}>
                                <TouchableOpacity style={[styles.modalBtn, {borderRightColor: '#fff', borderRightWidth: 0.2}]} onPress={() => setIsDeleteModalVisible(false)}>
                                    <Text style={[styles.modalBtnText, {fontWeight: '600', color: '#a59e89'}]}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalBtn} onPress={confirmDelete}>
                                    <Text style={[styles.modalBtnText, {fontWeight: '400', color: '#fff'}]}>Delete</Text>
                                </TouchableOpacity>
                            </View>
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

    card: {
        width: '47%',
        height: 206,
        marginBottom: 16,
        borderRadius: 30,
        overflow: 'hidden'
    },

    card: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 20, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 12, 
        borderRadius: 13
    },

    modalBackground: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },

    modalContent: {
        width: 273,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 14,
        paddingTop: 16,
        alignItems: 'center'
    },

    modalTitle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 5,
        width: '90%',
        textAlign: 'center'
    },

    modalText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        marginBottom: 16,
        textAlign: 'center',
        width: '90%'
    },

    modalBtn: {
        width: '50%',
        padding: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalBtnText: {
        fontSize: 17,
        lineHeight: 22
    }

})

export default Looks;