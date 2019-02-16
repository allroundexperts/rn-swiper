import React,{ Component } from 'react';
import { PanResponder, Animated } from 'react-native';
import PropTypes from 'prop-types';

export default class Swiper extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            height: 0,
            fadeAnimation: new Animated.Value(1),
            moveAnimation: new Animated.ValueXY({x: 0, y: 0}),
        };

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onPanStart,
            onPanResponderMove: (e, gestureState) => this.positionChange(gestureState),
            onPanResponderEnd: (e, gestureState) => this.endGesture(gestureState),
            onShouldBlockNativeResponder: (e) => true,
            onPanResponderTerminationRequest: () => false
        });

    }

    onPanStart = () => {
        const { enableParentScroll = false } = this.props;
        enableParentScroll !== false && enableParentScroll(false);
        return true;
    }

    positionChange = ({dx, dy}) => {
        const { moveAnimation, fadeAnimation } = this.state;
        Animated.spring(moveAnimation, {
            toValue: {x: dx, y: dy},
        }).start();
        Animated.spring(fadeAnimation, { 
            toValue: 0.4
        }).start();
    }

    endGesture = ({dx, dy}) => {
        const { onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = this.props;
        const { width, height } = this.state;
        const { swipeRatioX, swipeRatioY }  = {swipeRatioX: Math.abs(dx/width), swipeRatioY: Math.abs(dy/height)};
        const angle = Math.abs(360*(Math.atan(-dy/dx)/6.284));
        this.resetAnimations();
        if(angle > 45){ 
            //swipe up or down
            //dy > 0, swipe down else swipe up
            if ( swipeRatioY > 0.1){
                if(dy < 0)
                    onSwipeUp();
                else
                    onSwipeDown();
            }

        }else{
            //swipe right or left
            //dx > 0, swipe right else swipe left.
            if(swipeRatioX > 0.1){
                if(dx > 0)
                    onSwipeRight();
                else
                    onSwipeLeft();
            }
        }
    }

    resetAnimations = () => {
        this.state.moveAnimation.stopAnimation(() => {
            this.state.moveAnimation.setValue({x: 0, y: 0});
        });
        this.state.fadeAnimation.stopAnimation(() => {
            this.state.fadeAnimation.setValue(1);
        });
    }

    setDimensions = ({nativeEvent: { layout: { width, height } }}) => {
        this.setState({width, height});
    }

    getContainerStyle = () => {
        const { fadeAnimation, moveAnimation: { x, y} } = this.state;
        const style = {
            flex:1,
            opacity: fadeAnimation, 
            transform: [
                { translateX: x }, 
                { translateY: y }
            ] 
        };

        return style;
    }

    render(){
        const { children } = this.props;
        return (
            <Animated.View { ...this._panResponder.panHandlers } 
                style={this.getContainerStyle()}
                onLayout={this.setDimensions}
            >
                {children}
            </Animated.View>
        );
    }
}

Swiper.PropTypes = {
    enableParentScroll: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    onSwipeUp: PropTypes.func,
    onSwipeDown: PropTypes.func,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
}

Swiper.defaultProps = {
    enableParentScroll: false,
    onSwipeUp: () => false,
    onSwipeDown: () => false,
    onSwipeLeft: () => false,
    onSwipeRight: () => false,
}