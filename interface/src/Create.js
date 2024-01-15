import './styles/Create.css'
import dots from './images/BgDots.png';
import { useEffect, useState } from 'react';
import GameMultiplayer from './GameMultiplayer';

const Create = ({ name }) => {

    const [roomNumber, setRoomNumber] = useState(0);

    const [start, setStart] = useState(false);

    const [player1, setPlayer1] = useState("Player 1");
    const [player2, setPlayer2] = useState("Player 2");
    const [player3, setPlayer3] = useState("Player 3");
    const [player4, setPlayer4] = useState("Player 4");

    const data = {
        name: name,
        room: roomNumber
    };

    const dataStart = {
        status: "connected",
        room: roomNumber
    };

    function sendReady(socket) {

        dataStart.status = "play";
        socket.send(JSON.stringify(dataStart));
        setStart(true);
    }

    const socketStart = new WebSocket("ws://LOCALHOST:8080/ws/startgame");

    async function createRoom(data){

        let info = await fetch("http://LOCALHOST:8080/multiplayer/create", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(data => data.json())
        .then(data => {
            setRoomNumber(data.room);
            dataStart.room = data.room;
            socketStart.send(JSON.stringify(dataStart));
            return data;
        });

        info.name = name;

        const socket = new WebSocket("ws://LOCALHOST:8080/ws");

        socket.addEventListener("open", event => {
            socket.send(JSON.stringify(info));
            });

        socket.addEventListener("message", event => {
    
            let players = JSON.parse(event.data);
            
            if(players.player0 != undefined){
                setPlayer1(players.player0);
            }
            if(players.player1 != undefined){
                setPlayer2(players.player1);
            }
            if(players.player2 != undefined){
                setPlayer3(players.player2);
            }
            if(players.player3 != undefined){
                setPlayer4(players.player3);
            }

        });

    }

    useEffect(() => {
        createRoom(data);
    }, []);

    return (
        !start ?
        <div>
            <div className='room-number'>Room number: {roomNumber}</div>
            <div className="buttonsWrapper space">
                <img className='upperDots' src={ dots } alt="" />
                <img className='lowerDots' src={ dots } alt="" />
                <div className="room">
                    <div className='player'>{ player1 }</div>
                    <div className='player'>{ player2 }</div>
                    <div className='player'>{ player3 }</div>
                    <div className='player'>{ player4 }</div>
                </div>
                    <button className='start' onClick={() => {sendReady(socketStart)}}>Play</button>
            </div>
        </div>
        :
        <GameMultiplayer playerName={ name } roomNumber={ roomNumber } />
     );
}
 
export default Create;