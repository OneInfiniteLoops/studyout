import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ListView from "../Components/ListView";

const screens = {
    'Home': {
        screen: ListView,
    }
}

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);