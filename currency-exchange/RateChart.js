import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View } from 'react-native';

let {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(20, 128, 204, ${opacity})`,
    strokeWidth: 3,
    useShadowColorFromDataset: false,
    decimalPlaces: 4,
    barPercentage: 0.9,
    propsForHorizontalLabels: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000'
    }
}

export function RateChart(props) {
    return (
        <View>
            {console.log(props)}
            <LineChart
                data={{
                labels: props.labels,
                datasets: [{
                    data: props.data,
                    color: (opacity = 1) => `rgba(20, 128, 204, ${opacity})`,
                    strokeWidth: 2}]
                }}
                chartConfig={chartConfig}
                style={{...props.style}}
                width={SCREEN_WIDTH}
                height={SCREEN_HEIGHT* 0.5}
                segments={5}
                bezier={true}
            />
        </View>
    );
}