import './styles/Join.css'
import dots from './images/BgDots.png';
import { useEffect, useState } from 'react';
import GameMultiplayer from './GameMultiplayer';

const Join = ({ name, room }) => {

    const [roomNumber, setRoomNumber] = useState(room);

    const [start, setStart] = useState(false);

    const [player1, setPlayer1] = useState("Player 1");
    const [player2, setPlayer2] = useState("Player 2");
    const [player3, setPlayer3] = useState("Player 3");
    const [player4, setPlayer4] = useState("Player 4");

    const data = {
        name: name,
        room: room
    };

    const dataStart = {
        status: "connected",
        room: roomNumber
    };

    const socket = new WebSocket("ws://localhost:8080/ws");
    const socketStart = new WebSocket("ws://localhost:8080/ws/startgame");    

    socketStart.addEventListener("open", event => {
        socketStart.send(JSON.stringify(dataStart));
        });

    function joinRoom(data){

        socket.addEventListener("open", event => {
            socket.send(JSON.stringify(data));
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

        socketStart.addEventListener("message", event => {
            let startInfo = JSON.parse(event.data);

            if(startInfo.status === "play"){
                setStart(true);
            }
        });

    }

    useEffect(() => {
        joinRoom(data);
    }, [])

    return ( 
        !start ?
        <div>
            <div className='room-number'>Room number: {roomNumber}</div>
            <div className="buttonsWrapper space">
                <img className='upperDots' src={ dots } alt="" />
                <img className='lowerDots' src={ dots } alt="" />
                <div className="room join">
                    <div className='player'>{ player1 }</div>
                    <div className='player'>{ player2 }</div>
                    <div className='player'>{ player3 }</div>
                    <div className='player'>{ player4 }</div>
                </div>
                <div className='wait'>Waiting for leader to start...</div>
            </div>
        </div>
        :
        <GameMultiplayer playerName={ name } roomNumber={ roomNumber } />
     );
}
 
export default Join;