import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <>
      <Helmet>
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Realtime Code Editor' />
        <meta
          property='og:description'
          content='This is Realtime code editor, for coders who want to tals with each other in IDE at the same time'
        />
        <meta property='og:url' content={window.location.href} />
        <meta property='og:image' content='/favicon.ico' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />

        <title>Realtime Code Editor</title>
        <link rel='icon' type='image/jpg' href='/favicon.ico' />
      </Helmet>

      <div>
        <Toaster
          position='top-right'
          toastOptions={{
            success: {
              iconTheme: {
                primary: '#4aed88',
              },
            },
          }}
        ></Toaster>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/editor/:roomId' element={<EditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
