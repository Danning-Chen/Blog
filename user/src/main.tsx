import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import store from './store'
import router from './router'

createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
