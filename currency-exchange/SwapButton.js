import { TouchableOpacity, Text } from "react-native";
import ArrowDownUp from "react-native-bootstrap-icons/icons/arrow-down-up";
import { styles } from "./Stylesheet";

export function SwapButton(props){
    return (
        <TouchableOpacity style={styles.swapButton} onPress={props.onPress}>
            <Text style={styles.fs16}><ArrowDownUp color={'black'}/> Swap Currency</Text>
        </TouchableOpacity>
    );
}