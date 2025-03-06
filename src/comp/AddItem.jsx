import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput, Modal, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const AddItem = ({ image }) => {
    const navigation = useNavigation();
    const [name, setName] = useState(null);
    const [color, setColor] = useState(null);
    const [type, setType] = useState(null);
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [typeModalVisible, setTypeModalVisible] = useState(false);

    const colorModalToggle = () => {
        if(colorModalVisible) {
            setColorModalVisible(false)
        } else {
            setColorModalVisible(true)
        }
    };

    const typeModalToggle = () => {
        if(typeModalVisible) {
            setTypeModalVisible(false)
        } else {
            setTypeModalVisible(true)
        }
    };

    const types = ['OUTWEAR', 'TOPS', 'BOTTOMS'];
    const colors = ['WHITE', 'BLACK', 'GREY', 'BROWN', 'CREAM', 'TAUPE', 'RED', 'BEIGE', 'BLUE', 'YELLOW', 'GREEN', 'ORANGE', 'PURPLE'];

    const modalContent = colorModalVisible ? colors : types;

    const addItem = async () => {
        if (!name || !color || !type) return;
    
        const newItem = {
            id: Date.now().toString(),
            name,
            color,
            type,
            image,
        };
    
        try {
            const existingItems = await AsyncStorage.getItem('wardrobe');
            const wardrobe = existingItems ? JSON.parse(existingItems) : [];
    
            const updatedWardrobe = [...wardrobe, newItem];
    
            await AsyncStorage.setItem('wardrobe', JSON.stringify(updatedWardrobe));
    
            navigation.goBack('');
        } catch (error) {
            console.error("Failed to save item:", error);
        }
    };

    return (
            <View style={styles.container}>

                <View style={styles.row}>
                    <Text style={styles.title}>ADD AN ITEM</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={() => navigation.goBack('')}>
                        <Icons type={'close'} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width: '100%'}}>
                    <Image source={{uri: image}} style={styles.image} />

                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text.toUpperCase())}
                        autoFocus
                        placeholder="NAME"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    />

                    <TouchableOpacity style={styles.btn} onPress={colorModalToggle}>
                        <Text style={styles.btnText}>{color ? color : 'COLOR'}</Text>
                        <View style={{width: 20, height: 20, marginLeft: 10}}>
                            <Icons type={'arrows'} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={typeModalToggle}>
                        <Text style={styles.btnText}>{type ? type : 'TYPE'}</Text>
                        <View style={{width: 20, height: 20, marginLeft: 10}}>
                            <Icons type={'arrows'} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity 
                    style={[styles.btn, {backgroundColor: '#fff', marginTop: 20}, (!name || !color || !type) && {opacity: 0.5}]} 
                    onPress={addItem}
                    disables={!name || !color || !type}
                    >
                    <Text style={[styles.btnText, {color: '#a59e89'}]}>SAVE</Text>
                </TouchableOpacity>

                <Modal
                    visible={colorModalVisible || typeModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={colorModalVisible ? colorModalToggle : typeModalToggle}
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalContent, colorModalVisible && {top: height * 0.03}, typeModalVisible && {bottom: height * 0.25}]}>
                            {
                                modalContent.map((item, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={[styles.modalBtn, 
                                            index === 0 && {borderTopRightRadius: 13, borderTopLeftRadius: 13},
                                            index === modalContent.length -1 && {borderTopWidth: 0.2, borderTopColor: '#fff'},
                                            index === modalContent.length -1 && {borderBottomLeftRadius: 13, borderBottomRightRadius: 13},
                                            index !== modalContent.length -1 &&  {borderBottomWidth: 0.2, borderBottomColor: '#fff'}
                                            ]}
                                        onPress={() => {
                                            if (colorModalVisible) {
                                                setColor(item);
                                                setColorModalVisible(false);
                                            } else {
                                                setType(item);
                                                setTypeModalVisible(false);
                                            }
                                        }}
                                        >
                                        <Text style={styles.modalBtnText}>{item}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                </Modal>

            </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#000'
    },

    row: {
        width: '100%',
         alignItems: 'center',
         justifyContent: 'space-between',
         flexDirection: 'row',
         marginBottom: 27
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 29,
        color: '#fff',
    },

    addBtn: {
        width: 72,
        height: 72,
        padding: 24,
        borderRadius: 100,
        backgroundColor: '#1c1c1c',
    },

    image: {
        width: 310,
        height: 310,
        borderRadius: 60,
        resizeMode: 'cover',
        marginBottom: 32,
        alignSelf: 'center'
    },

    input: {
        width: '100%',
        backgroundColor: '#1c1c1c',
        borderRadius: 60,
        padding: 24,
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.2,
        textAlign: 'center',
        marginBottom: 12
    },

    btn: {
        width: '100%',
        backgroundColor: '#1c1c1c',
        borderRadius: 60,
        padding: 24,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.2,
    },

    modalContainer: {
        flex: 1,
    },

    modalContent: {
        width: 211,
        position: 'absolute',
        right: 24
    },

    modalBtn: {
        width: '100%',
        backgroundColor: '#181818',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },

    modalBtnText: {
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22,
        color: '#efe9dd',
    }

})

export default AddItem;