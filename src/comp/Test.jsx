import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, ScrollView } from "react-native"

const { height } = Dimensions.get('window');

const clothes = [
    require('../assts/clothes/1.png'),
    require('../assts/clothes/2.png'),
    require('../assts/clothes/3.png'),
    require('../assts/clothes/4.png'),
    require('../assts/clothes/5.png'),
    require('../assts/clothes/6.png'),
    require('../assts/clothes/7.png'),
    require('../assts/clothes/8.png'),
    require('../assts/clothes/9.png'),
]

const Test = () => {
    const [started, setStarted] = useState(false);
    const [level, setLevel] = useState(1);
    const [sequence, setSequence] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [showing, setShowing] = useState(true);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (showing) {
            generateSequence(level);
        }
    }, [level, showing]);

    const generateSequence = (length) => {
        let newSequence = Array.from({ length }, () => clothes[Math.floor(Math.random() * clothes.length)]);
        setSequence(newSequence);
        setUserInput([]);
        setStatus("");
        setTimeout(() => setShowing(false), length * 1000);
    };

    const handlePress = (item) => {
        if (showing) return;

        const newInput = [...userInput, item];
        setUserInput(newInput);

        if (newInput.length === sequence.length) {
            if (JSON.stringify(newInput) === JSON.stringify(sequence)) {
                setStatus("SUCCESS!");
                setTimeout(() => {
                    setLevel(level + 1);
                    setShowing(true);
                }, 1000);
            } else {
                setStatus("LOSE!");
                setTimeout(() => {
                    setLevel(1);
                    setShowing(true);
                }, 1000);
            }
        }
    };

    return (
        <ImageBackground source={require('../assts/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>🎭 FASHION FLASHBACK</Text>

                {
                    started ? (
                        <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                            <Text style={styles.title}>Level: {level}</Text>

                            <View style={styles.sequenceContainer}>
                                {showing ? (
                                    sequence.map((item, index) => (
                                        <Image key={index} source={item} style={styles.clothImage} />
                                    ))
                                ) : (
                                    userInput.map((item, index) => (
                                        <Image key={index} source={item} style={styles.clothImage} />
                                    ))
                                )}
                            </View>

                            {!showing && (
                                <ScrollView contentContainerStyle={styles.buttonsContainer}>
                                    {clothes.map((item, index) => (
                                        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                                            <Image source={item} style={styles.clothButton} />
                                        </TouchableOpacity>
                                    ))}
                                    <View style={{height: 20}} />
                                </ScrollView>
                            )}

                            {status !== "" && <Text style={styles.status}>{status}</Text>}

                            <TouchableOpacity style={styles.btn} onPress={() => setStarted(false)}>
                                <Text style={styles.btnText}>STOP</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{width: '100%', flexGrow: 1}}>
                            <Text style={styles.text}>Test your fashion memory! Watch the sequence of clothing items carefully, then recreate the exact order. Stay sharp as the levels get more challenging. Can you master the perfect outfit recall?</Text>

                            <TouchableOpacity style={styles.btn} onPress={() => setStarted(true)}>
                                <Text style={styles.btnText}>START</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        padding: 24,
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 29,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 32
    },

    text: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.2,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 60
    },

    btn: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 60,
        padding: 24,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 100
    },

    btnText: {
        color: '#a59e89',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
    },

    sequenceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },

    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    clothImage: {
        width: height * 0.07,
        height: height * 0.07,
        margin: 5,
    },

    clothButton: {
        width: height * 0.1,
        height: height * 0.1,
        margin: 5,
    },

    status: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
    },

})

export default Test;