import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer as NavContainer } from '@react-navigation/native'

const { Navigator, Screen } = createStackNavigator()

import Incidents from './pages/Incidents'
import Detail from './pages/Detail'

export default function Routes() {
    return (
        <NavContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name='Incidents' component={Incidents}/>
                <Screen name='Detail' component={Detail}/>
            </Navigator>
        </NavContainer>
    )
}