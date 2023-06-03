import {useState} from 'react';
import './App.css';
import Chat from './chat/Chat';
import Login from './login/Login';
import Register from './register/Register';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import botUsers from "./FriendsList/BotsUsers";
import UserDataRequest from './API/UserDataRequest';
import FriendListRequest from "./API/FriendListRequest"; // Import the function

/* This section contains the main functionality of the app, responsible for controlling the navigation between
* different pages such as login, register, and chats. The login page is set as the initial page, allowing users to
* switch between it and the register page. Only registered users who provide the correct login credentials are allowed
* to access their personal chats page. */
function App() {
    // Store all the information on the user retrieve from the server.
    // Fetch the user data when userValidInfo or userToken changes
    const [userData, setUserData] = useState(null);
    const [userToken, setUserToken] = useState(null);
    // 'userValidInfo' is the unique 'id' .
    const [userValidInfo, setUserValidInfo] = useState(null);


    // To simplify the work, we have added NPC (non-playable character) users to the registered user list.
    // const [userFriendList, setUserFriendList] = useState(
    //     botUsers.reduce(
    //         (initialValue, botUser) => {
    //             initialValue[botUser.registerUsername] = botUser;
    //             return initialValue;
    //         }, {}
    //     )
    // );

    // Render the personal chat page only if the user is authenticated.
    const renderChat = () => {
        if (userValidInfo) {
            return <Chat userData={userData}/>;
        } else {
            return <Navigate to="/"/>;
        }
    };
    const [ usersRegisterList, setUsersRegisterList] = useState([])
    // The routing logic between pages.
    return (
        <BrowserRouter>
            <UserDataRequest userValidInfo={userValidInfo} userToken={userToken} setUserData={setUserData} />
            <Routes>
                <Route path="/chat" element={renderChat()}/>
                <Route path="/register" element={<Register setUsersRegisterList={setUsersRegisterList}
                                                           usersRegisterList={usersRegisterList}/>}/>
                <Route path="/"
                       element={<Login setUserValidInfo={setUserValidInfo} setUserToken={setUserToken}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;