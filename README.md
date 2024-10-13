# Gamify AI Town
A simple ai town to demo how easy to integrate adventure game with RPGGO API V2

![1280X1280](https://github.com/user-attachments/assets/eec02e09-d24b-4e5b-93ff-e9e3d146358f)



## 📖 Brief
If you're dreaming of making your own AI-powered town-building game, well, you'll need more than just game dev skills. You'll also have to tackle some seriously brainy AI challenges, like auto-generating storylines, managing memory stacks, handling NPC interactions, and dealing with memory systems—basically, all the techy stuff that turns solo game development into a next-level boss fight!

But now, there's a smarter solution! With the RPGGO API, you can free yourself from the tangled web of AI logic and focus on crafting the game itself. RPGGO will infuse your game with an AI-powered soul, taking care of all the complex AI magic for you!

This demo project tries to show you how the system will work.

<br>

## 🎮 Online demo


[See the full hd in youtube](https://youtu.be/caO80FbOuSc)

[Click and Play](https://gamify-ai-town.vercel.app/)

<br>

## 📂 File structure

gamify-ai-town/ <br>
├── public/                # Static files of game assets, like map, npc sprites <br>
├── src/                   
│   ├── app                # Integration code of RPGGO API V2. You can reuse it if you like <br>
│   ├── components         # UI and UE implementation in nextjs and phaser3 <br>
│   └── config.js          # The configuration to bind the game assets to RPGGO game. This is important! <br>
└── package.json           # Dependencies and scripts <br>

If you,
1. want to change the AI game only - go to RPGGO game lobby to pickup the game you like, and change the config.js file to bind.
2. want to change the game asset only - use your game asset to overwrite the public folder, and reconfig the config.js file
3. want to change the game asset and the AI game - you need to do both #1 and #2
4. want to change the UI and UE - you will need to write the code in src folder.

## ❓ How it works

![whiteboard_exported_image (9)](https://github.com/user-attachments/assets/d2e29010-3b02-4bde-878e-fb697645c55e)
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
   git clone https://github.com/RPGGO-AI/demo-ai-town.git
   ```

3. **Install Dependencies:** Move into the `demo-ai-town` directory and install the necessary dependencies by running:

   ```
   cd demo-ai-town
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

<br>

## 👨‍💻‍ Contributors


<a href="https://github.com/codingtmd/gamify-ai-town/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=codingtmd/gamify-ai-town" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

<br>

## 🤝 Acknowledgments


<br>

## 📬 Contact

If you want to make this repo even better, feel free to submit your pr.

If you have any questions, feedback, or would like to get in touch, send me email or message. 


## 👁️Learn More

There are quite a lot free resources of 2d game asset. You can find the best to match your game.

- OpenGameArt.org: This website is a highly popular resource library that offers a large collection of free game graphics, audio, and other assets. All resources are free to use, but please review the licensing terms before using each resource. Website: [OpenGameArt.org]
- Kenney.nl: Kenney provides a wide range of free game assets, including 2D images, 3D models, sounds, and sound effects. Their library is extensive, and all assets are free for personal and commercial projects. Website: [Kenney.nl]
- itch.io: This is a very popular indie game marketplace. In addition to games, many developers also share free and paid game assets on itch.io. You can find many high-quality 2D game resources here. Website: [itch.io]
- CraftPix.net: CraftPix provides many free and paid 2D game assets, including characters, backgrounds, props, tilesets, and more. Website: [CraftPix.net]
- Lospec: Offers a variety of pixel art resources and tools, including palettes, tutorials, and free assets for download. Website: [Lospec.net]