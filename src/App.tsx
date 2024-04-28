import {useStateContext} from './context/ContextProvider';
import {useEffect, useState} from 'react';
import Header from './components/Header';
import SharedVideos from "./views/SharedVideos.tsx";
import * as authApis from './apis/auth.api';
import * as videoApis from "./apis/video.api.ts";
import { socket } from './socket';

export default function App() {
  const [videos, setVideos] = useState<videoApis.Video[]>([])
  const {token, setUser, notification} = useStateContext();

  const onConnect = () => {
    console.log('socket connected');
  }

  const onDisconnect = () => {
    console.log('socket connected');
  }

  const onVideoEvent = (data: any) => {
    setVideos((videos) => {
      return [data.video, ...videos];
    });
  }

  useEffect(() => {
    if (token) {
      authApis.me()
        .then((data: any) => {
          setUser(data)
        });
    }

    videoApis.listing({page: 1, limit: 10})
      .then((videos) => {
        setVideos(videos.data);
      });

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('video', onVideoEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('video', onVideoEvent);
    };
  }, [])

  return (
    <div id='defaultLayout'>
      <div className='content'>
        <Header />
        <SharedVideos videos={videos}></SharedVideos>
        {notification &&
          <div className='notification'>
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
