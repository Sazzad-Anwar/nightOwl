import { NavigationContainer } from '@react-navigation/native';
import GlobalContextProvider from './context/GlobalContextProvider';
import NavigationComponent from './components/NavigationComponent';
import { TransitionSpecs } from '@react-navigation/stack';

export default function App() {

  const config = {
    animation: 'spring',
    config: {
      stiffness: 500,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <NavigationContainer
      options={{
        // transitionSpec: {
        //   open: config,
        //   close: config,
        // },
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}
    >
      <GlobalContextProvider>
        <NavigationComponent />
      </GlobalContextProvider>
    </NavigationContainer>
  );
}
