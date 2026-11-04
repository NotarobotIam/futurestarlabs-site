# Future Star Labs website: starter kit

## What's in this folder

- **FSLClaude.md**: the build instructions for Claude Code.
- **design-reference.html**: the working demo. Double-click it to open it in your browser and see what the finished site should look like.
- **CLAUDE.md**: a one-line pointer. Claude Code reads this file automatically, and it tells Claude Code to follow FSLClaude.md.

## Before you start (one time)

1. Install **VS Code**: https://code.visualstudio.com
2. Install **Node.js** (the LTS version): https://nodejs.org
3. In VS Code, install the **Claude Code** extension and sign in.

## Build the site

1. Unzip this folder somewhere easy to find, like your Documents folder.
2. In VS Code, choose **File → Open Folder** and open `futurestarlabs-site`.
3. Open Claude Code and type:

   > Build the website described in FSLClaude.md, using design-reference.html as the reference.

4. Claude Code will check in with you as it goes. When it's done, it will run the site locally. Open the link it gives you (usually http://localhost:3000) to see it.

## Put it online

1. Create a free account at https://vercel.com.
2. Ask Claude Code: "Help me deploy this to Vercel."
3. When you're ready, connect your futurestarlabs.com domain in Vercel's project settings.
