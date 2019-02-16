# rn-swiper

rn-swiper is a react native component which makes swipe gestures extremely easy to use.

It supports multi-directional swiping.

This component tries to solve the problem of vertical swiping inside scroll views for both iOS and Android. It prevents the scrolling of the parent scroll view while swiping vertically.

## Installation

Using npm:

```bash
npm install --save @allroundexperts/rn-swiper
```
## Props

| Prop | Description |
| ---- | --------------------- |
| enableParentScroll | Optional. Required when using vertical swiping inside scrollview. This accepts a function that is called when swipe action is finished so that scroll can be released. |
| onSwipeLeft | Optional. Function to invoke when component is swiped to left. |
| onSwipeRight | Optional. Function to invoke when component is swiped to right. |
| onSwipeUp | Optional. Function to invoke when component is swiped to top. |
| onSwipeBottom | Optional. Function to invoke when component is swiped to bottom. |

## Usage

```node
import react, { component } from 'react';
import { View, ScrollView } from 'react-native';
import Swiper from 'rn-swiper';

class Example extends Component{
    constructor(props){
        super(props);
        this.state = { scroll: false };
    }

    onSwipeRight = () => {
        console.log('Component was swiped right');
    }

    onSwipeLeft = () => {
        console.log('Component was swiped left');
    }

    onSwipeUp = () => {
        console.log('Component was swiped up');
    }

    onSwipeDown = () => {
        console.log('Component was swiped down');
    }

    setScroll = (state) => {
        this.setState({scroll: state});
    }

    render(){
        const { scroll } = this.state;
        <ScrollView scrollEnabled={scroll}>
            <Swiper 
                onSwipeRight={this.onSwipeRight}
                onSwipeLeft={this.onSwipeLeft}
                onSwipeUp={this.onSwipeUp}
                onSwipeDown={this.onSwipeDown}
                enableParentScroll={this.setScroll}
            >
                <View>
                    {
                        //Some code here
                    }
                </View>
            </Swiper>
        </ScrollView>
    }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
