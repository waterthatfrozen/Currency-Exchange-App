import react from "react";
import { TouchableOpacity, Text } from "react-native";
import ArrowDownUp from "react-native-bootstrap-icons/icons/arrow-down-up";

export function SwapButton(props){
    return (
        <TouchableOpacity style={{backgroundColor: '#F99820', padding: 10, borderRadius: 10}} onPress={props.onPress}>
            <Text style={{fontSize: 16}}><ArrowDownUp color={'black'}/> Swap Currency</Text>
        </TouchableOpacity>
    );
}