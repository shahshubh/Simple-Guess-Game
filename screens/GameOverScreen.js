import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>GAME OVER !!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/success.png')} 
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed 
                    <Text style={styles.highlight}> {props.roundsNumber} </Text> 
                    rounds to guess the number 
                    <Text style={styles.highlight}> {props.userNumber} </Text> 
                </BodyText>
            </View>
            <MainButton onPress={props.onNewGame}>
                NEW GAME
            </MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderColor: 'black',
        borderWidth: 3,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 200
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold',
    }
});

export default GameOverScreen;
