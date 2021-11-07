import { defineConfig,loadEnv} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import reactJsx from 'vite-react-jsx';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      }
    },
    {},
  )

  return {
    define: envWithProcessPrefix,
    plugins: [reactRefresh(), reactJsx()],
  }
})