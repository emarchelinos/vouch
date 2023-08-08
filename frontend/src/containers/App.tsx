import { useRecoilValue } from 'recoil';
import { SCREENS, currentScreenState } from '../states/recoil';
import { LobbyScreen } from '../components/lobby/lobby';
import { InRoomScreen } from '../components/room/room';

function App() {
  const currentScreen = useRecoilValue(currentScreenState)

  return (
    <div className=' bg-slate-200 min-h-screen'>
        <div className='bg-white container mx-auto w-96' style={{minHeight: '612px'}}>
          {currentScreen === SCREENS.LOBBY ? <LobbyScreen /> : <InRoomScreen />}
        </div>
    </div>
  );
}
export default App;