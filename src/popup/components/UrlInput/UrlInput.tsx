import { useEffect } from "react";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

class Store {
  text = "";

  constructor() {
    makeAutoObservable(this);
  }

  setText(value: string) {
    this.text = value;
  }

  async saveText() {
    await chrome.storage.local.set({ savedText: this.text });
    chrome.runtime.sendMessage({ action: "SAVE_TEXT", value: this.text });
  }

  async loadText() {
    const result = await chrome.storage.local.get("savedText");
    if (result.savedText) {
      this.text = result.savedText;
    }
  }
}

const store = new Store();

const UrlInput = observer(() => {
  useEffect(() => {
    store.loadText();
  }, []);

  return (
    <div className="p-4 border rounded shadow-lg w-80">
      <input
        type="text"
        value={store.text}
        onChange={(e) => store.setText(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Enter text..."
      />
      <button
        onClick={() => store.saveText()}
        className="mt-2 bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
});

export default UrlInput;


// const CopyPlugin = require('copy-webpack-plugin');
// const path = require('path');

// module.exports = {
//   mode: 'development',
//   target: 'web',
//   cache: {
//     type: 'filesystem'
//   },
//   optimization: {
//     minimize: false,
//     splitChunks: false,
//   },
//   entry: {
//     background: './src/background/index.ts',
//     popup: './src/popup/index.tsx'
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].js',
//     clean: true
//   },
//   plugins: [
//     new CopyPlugin({
//       patterns: [{
//         from: path.resolve('manifest.json'),
//         to: path.resolve('dist')
//       }, {
//         from: path.resolve('src/popup/index.html'),
//         to: path.resolve('dist/popup.html')
//       }]
//     })
//   ],
//   module: {
//     rules: [
//       {
//         test: /.(ts|tsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               ['@babel/preset-react', {'runtime': 'automatic'}],
//               '@babel/preset-typescript'
//             ]
//           }
//         }
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx']
//   }
// };