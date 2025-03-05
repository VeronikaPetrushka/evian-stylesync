import { View } from "react-native"
import Wardrobe from "../components/Wardrobe"
import Nav from "../components/Nav";

const WardrobeScreen = () => {
    return (
        <View style={styles.container}>
            <Wardrobe />
            <View style={styles.nav}>
                <Nav />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    nav: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
    }
}

export default WardrobeScreen;