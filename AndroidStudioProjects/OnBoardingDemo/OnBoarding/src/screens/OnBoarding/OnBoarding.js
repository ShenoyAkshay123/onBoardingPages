import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Animated, Image, TouchableOpacity} from 'react-native';
 import { theme, images } from '../../constants';

const {COLORS, FONTS, SIZES} = theme;
const{onboarding1, onboarding2, onboarding3} = images;

const OnBoardings = [
    {
        title: "First Page",
        description: "Lorem Ipsum is a very fantastic page done by none other than mister Akshay Rohidas Shenoy of Mumbai, He is currently living in Bangalore.",
        img: onboarding1
    },
    {
        title: "Second Page",
        description: "Lorem Ipsum is a very fantastic page done by none other than mister Akshay Rohidas Shenoy of Mumbai, He is currently living in Bangalore.",
        img: onboarding2
    },
    {
        title: "Third Page",
        description: "Lorem Ipsum is a very fantastic page done by none other than mister Akshay Rohidas Shenoy of Mumbai, He is currently living in Bangalore.",
        img: onboarding3
    },
] 

const OnBoarding = (props) => {

    const [completed, setCompleted] = React.useState(false);

    React.useEffect(()=> {
        scrollX.addListener(({value}) => {
            if(Math.floor(value/SIZES.width) === OnBoardings.length - 2){
                setCompleted(true);
            }
        })
        return ()=> scrollX.removeListener();
    }, [])

    function renderDots() {
        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return (
            <View style = {styles.dotContainer}>
                {OnBoardings.map((item,index)=> {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'identity'
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: 'extend'
                    })

                    return (
                        <Animated.View
                        opacity = {opacity}
                        key = {`dot-${index}`} 
                        style = {[styles.dot, {width: dotSize, height: dotSize}]}>

                        </Animated.View>
                    );
                })}
            </View>
        );
    }

    const scrollX = new Animated.Value(0);

    function renderContent() {
        return (
        <Animated.ScrollView 
        horizontal 
        pagingEnabled 
        scrollEnabled 
        snapToAlignment = 'center' 
        decelerationRate = {0}
        scrollEventThrottle = {16}
        onScroll = {Animated.event([
            {nativeEvent: {contentOffset: {x: scrollX}
        }}
        ], {useNativeDriver: false})}
        showsHorizontalScrollIndicator = {false}>
            {OnBoardings.map((item,index)=> {
                return (
                <View key = {index} style = {{width: SIZES.width}}>
                    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image 
                        source = {item.img} 
                        resizeMode = "cover" 
                        style = {{width: "100%", height: "100%"}}>

                        </Image>
                    </View>
                    <View style= {{
                        position: 'absolute',
                        bottom: '10%',
                        left: 40,
                        right: 40
                    }}>
                        <Text style={{...FONTS.h1, color: COLORS.gray, textAlign: 'center'}}>{item.title}</Text>
                        <Text style = {{...FONTS.body3, textAlign: 'center', marginTop: SIZES.base, color: COLORS.gray}}>{item.description}</Text>
                    </View>
                    <TouchableOpacity onPress = {() => {}} style = {{
                        backgroundColor: COLORS.blue,
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        right: 0,
                        marginBottom: 10,
                        bottom: 0,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        width: 120,

                    }}>
                        <Text style = {{color: COLORS.white}}>{completed ? "Let's Go": "Skip"}</Text>

                    </TouchableOpacity>
                </View>
                );
            })}

        </Animated.ScrollView>
        );
    }

    return (
        <SafeAreaView style= {styles.container}>
            <View>
            {renderContent()}
            </View>
            <View style = {styles.rootDotContainer}>
                {renderDots()}
            </View>

        </SafeAreaView>
    );
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white

    }, 
    dot: {
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.radius / 2,
        backgroundColor: COLORS.blue

    },
    dotContainer: {
        flexDirection: 'row',
        height: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center'

    },
    rootDotContainer: {
        position: 'absolute',
        bottom: SIZES.height > 700? '30%': '20%'
    }

}); 

export default OnBoarding;