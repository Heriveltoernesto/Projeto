// src/pages/Videos.jsx
export default function Videos() {
  const videos = [
    {
      titulo: "Melhores Momentos - Final Libertadores 2023",
      canal: "Conmebol TV",
      url: "https://www.youtube.com/embed/some-video-id-1",
    },
    {
      titulo: "Top 10 Gols Brasileirão 2024",
      canal: "CBF TV",
      url: "https://www.youtube.com/embed/some-video-id-2",
    },
    {
      titulo: "Análise Tática - Palmeiras x Flamengo",
      canal: "Futebol Tático",
      url: "https://www.youtube.com/embed/some-video-id-3",
    }
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">🎥 Vídeos e Podcasts</h1>
      <p className="text-center text-gray-500 mb-8">Assista aos melhores lances, análises e conteúdos exclusivos</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="bg-gray-50 border p-4 rounded-xl shadow">
            <iframe
              width="100%"
              height="200"
              src={video.url}
              title={video.titulo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded mb-2"
            ></iframe>
            <h2 className="text-lg font-bold text-gray-800">{video.titulo}</h2>
            <p className="text-sm text-gray-500">{video.canal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
