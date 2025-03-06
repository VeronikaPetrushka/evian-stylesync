import { View } from "react-native"
import Intro from "../comp/Intro"

const IntroScreen = () => {
    return (
        <View style={styles.container}>
            <Intro />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default IntroScreen;