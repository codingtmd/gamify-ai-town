import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

// Base URL and Authorization token
const baseURL = 'https://api.rpggo.ai/v2/open/game';

function getAuthToken() {
  return process.env.NEXT_PUBLIC_AUTH_TOKEN;
}

const gameMetaData = async (game_id) => {
  try {
    const result = await axios.post(`${baseURL}/gamemetadata`, {
      game_id
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    if (!result?.data?.data) {
      return NextResponse.json(
        { code, msg: 'no valid data responsed', data: {} },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { data: result.data.data, code: 0, msg: "success" },
      { status: 200 },
    );
  } catch(error) {
    console.error('Error getting game details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const startGame = async (game_id, session_id) => {
  try {
    const result = await axios.post(`${baseURL}/startgame`, {
      game_id,
      session_id
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    if (!result?.data) {
      return NextResponse.json(
        { code, msg: 'failed to start the game', data: {} },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { data: result.data.data, code: 0, msg: "success" },
      { status: 200 },
    );
  } catch(error) {
    console.error('Error getting game details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const resumeSession = async (game_id, session_id) => {
  try {
    const result = await axios.post(`${baseURL}/resumesession`, {
      game_id,
      session_id
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    if (!result?.data) {
      return NextResponse.json(
        { code, msg: 'failed to resume the game', data: {} },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { data: result.data.data, code: 0, msg: "success" },
      { status: 200 },
    );
  } catch(error) {
    console.error('Error getting game details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

async function handler(req, res) {
  const { params } = res;
  const path = params.path.join("/");
  console.log('path ====>', path, params.path);
  try {
    if (path === 'gamemetadata') {
      const {
        game_id,
      } = await req.json();
      return await gameMetaData(game_id);
    }

    if (path === 'startgame') {
      const {
        game_id,
        session_id,
      } = await req.json();
      return await startGame(game_id, session_id);
    }

    if (path === 'resumesession') {
      const {
        game_id,
        session_id,
      } = await req.json();
      return await resumeSession(game_id, session_id);
    }

  } catch(error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
