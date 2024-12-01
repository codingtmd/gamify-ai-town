# Gamify AI Town - Under The Snow, special edition

A forked revision of Gamify AI Town, but with a special popular game [Under A Winters Snow (A COC Game)](https://rpggo.ai/game/7411057c-43a0-4fbb-b4b8-f0b02ba3cb02) inside.

![Screenshot 2024-11-28 130725](https://github.com/user-attachments/assets/cc8902e8-7637-448c-a350-c6a41f393cc6)



## 📖 Brief
If you're dreaming of making your own AI-powered town-building game, well, you'll need more than just game dev skills. You'll also have to tackle some seriously brainy AI challenges, like auto-generating storylines, managing memory stacks, handling NPC interactions, and dealing with memory systems—basically, all the techy stuff that turns solo game development into a next-level boss fight!

But now, there's a smarter solution! With the RPGGO API, you can free yourself from the tangled web of AI logic and focus on crafting the game itself. RPGGO will infuse your game with an AI-powered soul, taking care of all the complex AI magic for you!

This demo project tries to show you how the system will work.

if you have any thoughst, feel free to tell me here: [Discuss, feedback and bug report](https://github.com/codingtmd/gamify-ai-town/issues/7)

<br>

## 🎮 Online demo




https://github.com/user-attachments/assets/ac82ffef-031f-4c79-804b-fffa23177d4d

[Click to play the original game](https://rpggo.ai/game/7411057c-43a0-4fbb-b4b8-f0b02ba3cb02) 
[Click to play 2D version](https://gamify-ai-town.vercel.app/)

<br>

## 📂 File structure

undersnow-ai-town/ <br>
├── public/                # Static files of game assets, like map, npc sprites <br>
├── src/                   
│   ├── app                # Integration code of RPGGO API V2. You can reuse it if you like <br>
│   ├── components         # UI and UE implementation in nextjs and phaser3 <br>
│   └── config.js          # The configuration to bind the game assets to RPGGO game. This is important! <br>
└── package.json           # Dependencies and scripts <br>

**note** If you,
1. want to change to **another AI game** only - go to RPGGO game lobby to pickup the game you like, and change the **config.js** file to bind.
2. want to change the **game asset** only - use your game asset to overwrite the **'public'** folder, and reconfig the **config.js** file
3. want to change the game asset and also another AI game - you need to do both #1 and #2
4. want to change the UI and UE - you will need to write the code in src folder.

## ❓ How it works

![373264287-d2e29010-3b02-4bde-878e-fb697645c55e](https://github.com/user-attachments/assets/04d620f5-8117-48ef-a015-0882c28bda63)


This graph tells the exact magic about how the system works. Basically, RPGGO covers the end2end pipeline from building a game to rendering a game in real time. As a game developer, all you need to do is very simple:
1. find a game you want to make it live in 2D graphic. Either, go to https://creator.rpggo.ai to build your own game if you are a good game designer, or go to https://rpggo.ai game lobby to find a game you like. Remember the game id.
2. fill an [API Key Application form](https://forms.gle/SgYbkZE2aDj38mhT9) with the Game ID you chose, or contact them via email at [dev@rpggo.ai](mailto:dev@rpggo.ai)
3. After you get your key, you can use rpggo.js to access the game data and integrate it with your phaser code. This project is also a good example to tell how the integration code will be.

<br>

## ⚡️ Quick Start in local
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

1. **install** latest node.js

2. **Clone the GitHub Repository:** Begin by cloning the repository using the command:

   ```
   git clone https://github.com/nex4d/undersnow-ai-town.git
   ```

3. **Install Dependencies:** Move into the `undersnow-ai-town` directory and install the necessary dependencies by running:

   ```
   cd undersnow-ai-town
   npm i
   ```

4. **Add your api key:** add it in your .env.local file
   
   ```.env.local
   NEXT_PUBLIC_AUTH_TOKEN='{$your_api_key}'
   ```


5. **Run** the app
   ```
   export NODE_OPTIONS=--openssl-legacy-provider
   ```

   ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



<br>

## 🐳 Production Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<br>

## ⚖️ License

This project is under MIT license, which means you can do anything you want.

Freedom!

<br>

## 👨‍💻‍ Contributors


<a href="https://github.com/codingtmd/gamify-ai-town/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=codingtmd/gamify-ai-town" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

<br>

## 🤝 Acknowledgments
Special thanks to:
 - https://github.com/blopa/top-down-react-phaser-game-template
 - https://github.com/git-cloner/ai-town

I don't have background on phaser3. Without those of references, I cannot make this repo. Thanks!

<br>

## 📬 Contact

If you want to make this repo even better, feel free to submit your pr.

If you have any questions, feedback, or would like to get in touch, send me email or message. 


## 👁️Learn More

There are quite a lot free resources of 2d game asset. You can find the best to match your game. Here is a good recommendation:

- OpenGameArt.org: This website is a highly popular resource library that offers a large collection of free game graphics, audio, and other assets. All resources are free to use, but please review the licensing terms before using each resource. Website: [OpenGameArt.org]. For example, the pirate in the game is coming from here(https://opengameart.org/content/pirate-1) 
