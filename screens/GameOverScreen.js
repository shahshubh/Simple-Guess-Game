import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>GAME OVER !!</Text>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber} </Text>
            <Button title="NEW GAME" onPress={props.onNewGame} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;
