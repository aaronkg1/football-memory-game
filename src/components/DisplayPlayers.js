import React from "react";
import "../styles/playerDisplay.css";

export const DisplayPlayers = (props) => {
  const { players } = props;
  const playerDisplay = players.map((player) => {
    return (
      <div
        key={player.players[0].idPlayer}
        onClick={(e) => {
          props.selectPlayer(e);
        }}
      >
        <img
          id={player.players[0].idPlayer}
          src={player.players[0].strThumb}
          alt={player.players[0].strPlayer}
        ></img>
      </div>
    );
  });
  return playerDisplay;
};
