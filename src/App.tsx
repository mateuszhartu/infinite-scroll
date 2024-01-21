import { InifiniteScroll } from "./components"
import UsersService, { UserMethods } from './services/api/UsersService';

export const App: React.FC = () => {
  return <InifiniteScroll getItems={UsersService[UserMethods.GET]} />
}
