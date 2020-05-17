import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value,i) => (
    <View key={i} style={styles.listItem}>
        <BodyText>#{i}</BodyText>
        <BodyText> {value} </BodyText>
    </View>
);

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice ) || 
            (direction === 'greater' && currentGuess > props.userChoice )){
                Alert.alert(
                    'Don\'t lie!',
                    'You know that you gave wrong Hint...', 
                    [{text: 'Sorry!', style: 'cancel'}]
                );
                return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currRounds => currRounds + 1);
        setPastGuesses(curPastGuesses => [ nextNumber, ...curPastGuesses ])
    }


    return (
        <View style={styles.screen} >
            <TitleText>Opponent's Guess</TitleText>
            <BodyText style={styles.headingText} >Give Hint by telling number should be greater or smaller.</BodyText>
            <NumberContainer number={currentGuess} />
            <Card style={styles.buttonContainer}>
                {/* bind takes 2nd arg as to what to pass when the function is called */}
                
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list} >
                    {pastGuesses.map((guess, i) => (
                        renderListItem(guess,pastGuesses.length - i)
                    ))}
                </ScrollView>    
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    headingText: {
        padding: 10,
        textAlign: 'center'
    },  
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: '80%'
    }, 
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },  
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    }
});

export default GameScreen;
