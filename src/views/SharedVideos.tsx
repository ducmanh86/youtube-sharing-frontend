import {Video} from "../apis/video.api";

type Props = {
  videos: Video[]
}

function SharedVideos({videos}: Props) {
  return (
    <div>
      <h1>Shared Videos</h1>
      <ul>
        {videos.map((v: Video) => {
          return (
            <li key={v.id + ''}>
              <div>
                <a href={v.url} target='_blank'><img
                  width='256'
                  src={v.thumbnail}
                  alt={v.title}
                /></a>
              </div>
              <div>
                <a href={v.url} target='_blank'><b>{v.title} {v.createdAt}</b></a>
                <br/>Shared By: {v.shareBy.email}
                <br/>{v.description}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default SharedVideos
